import { describe, expect, it } from "vitest";
import {
  calculateMalerLineItems,
  computeRoomAreas,
  createDefaultMalerInput,
  resolveSurfaceAreas,
  type MalerCalculationInput,
} from "./maler";

describe("computeRoomAreas", () => {
  it("subtracts standard door and window sizes from gross wall area", () => {
    const result = computeRoomAreas([
      {
        id: "r1",
        name: "Zimmer",
        lengthM: 5,
        widthM: 4,
        heightM: 2.5,
        doorCount: 1,
        windowCount: 1,
      },
    ]);
    // perimeter 18 * height 2.5 = 45; minus 1.77 (door) minus 1.5 (window) = 41.73
    expect(result.wallAreaM2).toBeCloseTo(41.73, 2);
    expect(result.ceilingAreaM2).toBeCloseTo(20, 2);
  });

  it("never returns a negative wall area when openings exceed gross area", () => {
    const result = computeRoomAreas([
      {
        id: "r1",
        name: "Kleiner Raum",
        lengthM: 1,
        widthM: 1,
        heightM: 1,
        doorCount: 5,
        windowCount: 5,
      },
    ]);
    expect(result.wallAreaM2).toBe(0);
  });

  it("sums areas across multiple rooms", () => {
    const result = computeRoomAreas([
      { id: "r1", name: "A", lengthM: 3, widthM: 3, heightM: 2.5, doorCount: 0, windowCount: 0 },
      { id: "r2", name: "B", lengthM: 4, widthM: 3, heightM: 2.5, doorCount: 0, windowCount: 0 },
    ]);
    expect(result.wallAreaM2).toBeCloseTo(30 + 35, 2);
  });
});

describe("resolveSurfaceAreas", () => {
  it("returns direct areas unchanged when mode is direct", () => {
    const result = resolveSurfaceAreas({ mode: "direct", wallAreaM2: 50, ceilingAreaM2: 20 });
    expect(result).toEqual({ wallAreaM2: 50, ceilingAreaM2: 20 });
  });

  it("clamps negative direct areas to zero", () => {
    const result = resolveSurfaceAreas({ mode: "direct", wallAreaM2: -10, ceilingAreaM2: -5 });
    expect(result).toEqual({ wallAreaM2: 0, ceilingAreaM2: 0 });
  });
});

describe("calculateMalerLineItems", () => {
  it("produces no line items when nothing is selected and area is zero", () => {
    const input: MalerCalculationInput = {
      ...createDefaultMalerInput(),
      surface: { mode: "direct", wallAreaM2: 0, ceilingAreaM2: 0 },
      workTypes: {
        ...createDefaultMalerInput().workTypes,
        wandanstrich: { selected: false, coats: 2, pricePerM2: 8.5 },
      },
      materials: {
        includePaintMaterial: false,
        paintCoveragePerLiterM2: 7,
        paintPricePerLiter: 12,
        includeAbdeckmaterial: false,
        abdeckmaterialPricePerM2: 1.2,
      },
    };
    expect(calculateMalerLineItems(input)).toHaveLength(0);
  });

  it("multiplies the wall paint price by the number of coats", () => {
    const input = createDefaultMalerInput();
    input.surface = { mode: "direct", wallAreaM2: 40, ceilingAreaM2: 0 };
    input.workTypes.wandanstrich = { selected: true, coats: 3, pricePerM2: 8 };
    input.materials.includePaintMaterial = false;
    input.materials.includeAbdeckmaterial = false;

    const items = calculateMalerLineItems(input);
    const wandItem = items.find((i) => i.sourceKey === "wandanstrich");
    expect(wandItem?.unitPrice).toBeCloseTo(24, 2);
    expect(wandItem?.quantity).toBeCloseTo(40, 2);
  });

  it("rounds paint liters up to the next whole liter based on coverage", () => {
    const input = createDefaultMalerInput();
    input.surface = { mode: "direct", wallAreaM2: 33, ceilingAreaM2: 0 };
    input.workTypes.wandanstrich = { selected: true, coats: 1, pricePerM2: 8 };
    input.materials.includePaintMaterial = true;
    input.materials.paintCoveragePerLiterM2 = 7;
    input.materials.includeAbdeckmaterial = false;

    const items = calculateMalerLineItems(input);
    const paint = items.find((i) => i.sourceKey === "material-farbe");
    expect(paint?.quantity).toBe(Math.ceil(33 / 7));
  });

  it("adds per-piece line items only for selected lackierarbeiten with count > 0", () => {
    const input = createDefaultMalerInput();
    input.surface = { mode: "direct", wallAreaM2: 0, ceilingAreaM2: 0 };
    input.workTypes.wandanstrich.selected = false;
    input.workTypes.lackierarbeiten = {
      selected: true,
      doors: { count: 2, pricePerPiece: 60 },
      frames: { count: 0, pricePerPiece: 30 },
      radiators: { count: 1, pricePerPiece: 40 },
    };
    input.materials.includePaintMaterial = false;
    input.materials.includeAbdeckmaterial = false;

    const items = calculateMalerLineItems(input);
    expect(items.find((i) => i.sourceKey === "lackierarbeiten-tueren")?.quantity).toBe(2);
    expect(items.find((i) => i.sourceKey === "lackierarbeiten-zargen")).toBeUndefined();
    expect(items.find((i) => i.sourceKey === "lackierarbeiten-heizkoerper")?.quantity).toBe(1);
  });

  it("includes optional Anfahrt and Entsorgung as flat-rate line items", () => {
    const input = createDefaultMalerInput();
    input.surface = { mode: "direct", wallAreaM2: 0, ceilingAreaM2: 0 };
    input.workTypes.wandanstrich.selected = false;
    input.materials.includePaintMaterial = false;
    input.materials.includeAbdeckmaterial = false;
    input.extras.anfahrt = { selected: true, price: 50 };
    input.extras.entsorgung = { selected: true, price: 30 };

    const items = calculateMalerLineItems(input);
    expect(items.find((i) => i.sourceKey === "anfahrt")).toMatchObject({ quantity: 1, unitPrice: 50 });
    expect(items.find((i) => i.sourceKey === "entsorgung")).toMatchObject({ quantity: 1, unitPrice: 30 });
  });
});
