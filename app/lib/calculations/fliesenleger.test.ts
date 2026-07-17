import { describe, expect, it } from "vitest";
import {
  calculateFliesenLineItems,
  createDefaultFliesenInput,
  resolveFliesenArea,
  TILE_FORMAT_LABOR_MULTIPLIER,
} from "./fliesenleger";

describe("resolveFliesenArea", () => {
  it("computes area from length x width in dimensions mode", () => {
    expect(resolveFliesenArea({ mode: "dimensions", areaM2: 0, lengthM: 4, widthM: 3 })).toBe(12);
  });

  it("uses the direct area value when mode is direct", () => {
    expect(resolveFliesenArea({ mode: "direct", areaM2: 25.5, lengthM: 0, widthM: 0 })).toBe(25.5);
  });

  it("clamps negative area to zero", () => {
    expect(resolveFliesenArea({ mode: "direct", areaM2: -5, lengthM: 0, widthM: 0 })).toBe(0);
  });
});

describe("calculateFliesenLineItems", () => {
  it("returns no line items when area is zero and nothing else is enabled", () => {
    const input = createDefaultFliesenInput();
    input.area = { mode: "direct", areaM2: 0, lengthM: 0, widthM: 0 };
    input.workTypes.fliesenVerlegen.selected = false;
    input.workTypes.untergrundvorbereitung.selected = false;
    input.workTypes.verfugen.selected = false;
    expect(calculateFliesenLineItems(input)).toHaveLength(0);
  });

  it("applies the wastage percentage on top of the raw area for tile material", () => {
    const input = createDefaultFliesenInput();
    input.area = { mode: "direct", areaM2: 20, lengthM: 0, widthM: 0 };
    input.materials.wastagePercent = 10;
    input.materials.tilesCustomerProvided = false;

    const items = calculateFliesenLineItems(input);
    const tileMaterial = items.find((i) => i.sourceKey === "material-fliesen");
    expect(tileMaterial?.quantity).toBeCloseTo(22, 2);
  });

  it("excludes tile material line item when customer provides tiles", () => {
    const input = createDefaultFliesenInput();
    input.area = { mode: "direct", areaM2: 20, lengthM: 0, widthM: 0 };
    input.materials.tilesCustomerProvided = true;

    const items = calculateFliesenLineItems(input);
    expect(items.find((i) => i.sourceKey === "material-fliesen")).toBeUndefined();
  });

  it("applies the großformat labor multiplier to the laying price", () => {
    const input = createDefaultFliesenInput();
    input.area = { mode: "direct", areaM2: 10, lengthM: 0, widthM: 0 };
    input.workTypes.fliesenVerlegen = { selected: true, pricePerM2Base: 40 };
    input.tileFormat = "grossformat";

    const items = calculateFliesenLineItems(input);
    const verlegen = items.find((i) => i.sourceKey === "fliesen-verlegen");
    expect(verlegen?.unitPrice).toBeCloseTo(40 * TILE_FORMAT_LABOR_MULTIPLIER.grossformat, 2);
  });

  it("adds silicone joints and skirting only when running meters are greater than zero", () => {
    const input = createDefaultFliesenInput();
    input.area = { mode: "direct", areaM2: 10, lengthM: 0, widthM: 0 };
    input.workTypes.silikonfugen = { selected: true, meters: 0, pricePerMeter: 6 };
    input.workTypes.sockelleisten = { selected: true, meters: 8, pricePerMeter: 9 };

    const items = calculateFliesenLineItems(input);
    expect(items.find((i) => i.sourceKey === "silikonfugen")).toBeUndefined();
    expect(items.find((i) => i.sourceKey === "sockelleisten")?.quantity).toBe(8);
  });

  it("computes adhesive quantity from kg-per-m2 rate when laying is selected", () => {
    const input = createDefaultFliesenInput();
    input.area = { mode: "direct", areaM2: 10, lengthM: 0, widthM: 0 };
    input.workTypes.fliesenVerlegen.selected = true;
    input.materials.klebstoffKgPerM2 = 5;

    const items = calculateFliesenLineItems(input);
    expect(items.find((i) => i.sourceKey === "material-klebstoff")?.quantity).toBe(50);
  });
});
