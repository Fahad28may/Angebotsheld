import { describe, expect, it } from "vitest";
import {
  calculateGeruestLineItems,
  computeExtensionWeeks,
  computeGeruestflaeche,
  createDefaultGeruestInput,
} from "./geruestbau";

describe("computeGeruestflaeche", () => {
  it("multiplies facade length by height", () => {
    expect(computeGeruestflaeche({ facadeLengthM: 12, facadeHeightM: 9 })).toBe(108);
  });

  it("clamps negative dimensions to a zero area", () => {
    expect(computeGeruestflaeche({ facadeLengthM: -5, facadeHeightM: 9 })).toBe(0);
  });
});

describe("computeExtensionWeeks", () => {
  it("returns zero when standing time is within the base weeks", () => {
    const weeks = computeExtensionWeeks({
      aufAbbauPricePerM2: 9.5,
      grundmietePricePerM2: 4.5,
      baseWeeks: 4,
      verlaengerungPricePerM2PerWeek: 0.6,
      standzeitWeeks: 4,
    });
    expect(weeks).toBe(0);
  });

  it("rounds partial extension weeks up to the next full week", () => {
    const weeks = computeExtensionWeeks({
      aufAbbauPricePerM2: 9.5,
      grundmietePricePerM2: 4.5,
      baseWeeks: 4,
      verlaengerungPricePerM2PerWeek: 0.6,
      standzeitWeeks: 5.5,
    });
    expect(weeks).toBe(2);
  });
});

describe("calculateGeruestLineItems", () => {
  it("returns no items when facade area is zero and no extras are selected", () => {
    const input = createDefaultGeruestInput();
    input.dimensions = { facadeLengthM: 0, facadeHeightM: 0 };
    expect(calculateGeruestLineItems(input)).toHaveLength(0);
  });

  it("omits the Verlängerungsmiete line item when standing time equals base weeks", () => {
    const input = createDefaultGeruestInput();
    input.pricing.standzeitWeeks = input.pricing.baseWeeks;
    const items = calculateGeruestLineItems(input);
    expect(items.find((i) => i.sourceKey === "verlaengerungsmiete")).toBeUndefined();
  });

  it("adds a Verlängerungsmiete line item priced for the extension weeks only", () => {
    const input = createDefaultGeruestInput();
    input.pricing = {
      aufAbbauPricePerM2: 9.5,
      grundmietePricePerM2: 4.5,
      baseWeeks: 4,
      verlaengerungPricePerM2PerWeek: 0.5,
      standzeitWeeks: 6,
    };
    const items = calculateGeruestLineItems(input);
    const extension = items.find((i) => i.sourceKey === "verlaengerungsmiete");
    expect(extension?.unitPrice).toBeCloseTo(0.5 * 2, 2);
  });

  it("includes only extras with a positive count", () => {
    const input = createDefaultGeruestInput();
    input.extras.treppe = { selected: true, count: 0, pricePerPiece: 120 };
    input.extras.konsolen = { selected: true, count: 3, pricePerPiece: 25 };
    const items = calculateGeruestLineItems(input);
    expect(items.find((i) => i.sourceKey === "geruesttreppe")).toBeUndefined();
    expect(items.find((i) => i.sourceKey === "konsolen")?.quantity).toBe(3);
  });

  it("appends custom Sonderposition entries and skips blank descriptions", () => {
    const input = createDefaultGeruestInput();
    input.sonderPositionen = [
      { id: "s1", description: "Sonderkonstruktion Erker", quantity: 1, unit: "pauschal", unitPrice: 300 },
      { id: "s2", description: "  ", quantity: 1, unit: "pauschal", unitPrice: 100 },
    ];
    const items = calculateGeruestLineItems(input);
    expect(items.filter((i) => i.sourceKey === "sonderposition")).toHaveLength(1);
    expect(items.find((i) => i.id === "s1")?.description).toBe("Sonderkonstruktion Erker");
  });
});
