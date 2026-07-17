import type { LineItem } from "@/lib/types";
import { round2 } from "@/lib/format";

export type ScaffoldType = "arbeitsgeruest" | "fassadengeruest";
export type LoadClass =
  | "Lastklasse 2 (150 kg/m²)"
  | "Lastklasse 3 (200 kg/m²)"
  | "Lastklasse 4 (300 kg/m²)"
  | "Lastklasse 5 (450 kg/m²)"
  | "Lastklasse 6 (600 kg/m²)";

export const scaffoldTypeLabels: Record<ScaffoldType, string> = {
  arbeitsgeruest: "Arbeitsgerüst",
  fassadengeruest: "Fassadengerüst",
};

export interface GeruestDimensions {
  facadeLengthM: number;
  facadeHeightM: number;
}

export interface GeruestPricing {
  aufAbbauPricePerM2: number;
  grundmietePricePerM2: number;
  baseWeeks: number;
  verlaengerungPricePerM2PerWeek: number;
  standzeitWeeks: number;
}

export interface GeruestExtras {
  treppe: { selected: boolean; count: number; pricePerPiece: number };
  schutznetz: { selected: boolean; pricePerM2: number };
  konsolen: { selected: boolean; count: number; pricePerPiece: number };
  ueberbrueckungen: { selected: boolean; count: number; pricePerPiece: number };
  transport: { selected: boolean; price: number };
}

export interface SonderPosition {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface GeruestCalculationInput {
  scaffoldType: ScaffoldType;
  loadClass: LoadClass;
  dimensions: GeruestDimensions;
  pricing: GeruestPricing;
  extras: GeruestExtras;
  sonderPositionen: SonderPosition[];
}

export function computeGeruestflaeche(dimensions: GeruestDimensions): number {
  return round2(Math.max(0, dimensions.facadeLengthM * dimensions.facadeHeightM));
}

export function computeExtensionWeeks(pricing: GeruestPricing): number {
  return Math.max(0, Math.ceil(pricing.standzeitWeeks - pricing.baseWeeks));
}

export function calculateGeruestLineItems(input: GeruestCalculationInput): LineItem[] {
  const flaecheM2 = computeGeruestflaeche(input.dimensions);
  const items: LineItem[] = [];
  let position = 1;
  const { pricing, extras } = input;

  if (flaecheM2 > 0) {
    items.push({
      id: "auf-abbau",
      position: position++,
      description: `Auf- und Abbau (${scaffoldTypeLabels[input.scaffoldType]}, ${input.loadClass})`,
      quantity: flaecheM2,
      unit: "m²",
      unitPrice: pricing.aufAbbauPricePerM2,
      editable: true,
      sourceKey: "auf-abbau",
    });

    items.push({
      id: "grundmiete",
      position: position++,
      description: `Grundmiete (${Math.max(0, Math.round(pricing.baseWeeks))} Wochen inklusive)`,
      quantity: flaecheM2,
      unit: "m²",
      unitPrice: pricing.grundmietePricePerM2,
      editable: true,
      sourceKey: "grundmiete",
    });

    const extensionWeeks = computeExtensionWeeks(pricing);
    if (extensionWeeks > 0) {
      items.push({
        id: "verlaengerungsmiete",
        position: position++,
        description: `Verlängerungsmiete (${extensionWeeks} zusätzliche ${
          extensionWeeks === 1 ? "Woche" : "Wochen"
        })`,
        quantity: flaecheM2,
        unit: "m²",
        unitPrice: round2(pricing.verlaengerungPricePerM2PerWeek * extensionWeeks),
        editable: true,
        sourceKey: "verlaengerungsmiete",
      });
    }
  }

  if (extras.treppe.selected && extras.treppe.count > 0) {
    items.push({
      id: "geruesttreppe",
      position: position++,
      description: "Gerüsttreppe",
      quantity: extras.treppe.count,
      unit: "Stk.",
      unitPrice: extras.treppe.pricePerPiece,
      editable: true,
      sourceKey: "geruesttreppe",
    });
  }

  if (extras.schutznetz.selected && flaecheM2 > 0) {
    items.push({
      id: "schutznetz",
      position: position++,
      description: "Schutznetz / Plane",
      quantity: flaecheM2,
      unit: "m²",
      unitPrice: extras.schutznetz.pricePerM2,
      editable: true,
      sourceKey: "schutznetz",
    });
  }

  if (extras.konsolen.selected && extras.konsolen.count > 0) {
    items.push({
      id: "konsolen",
      position: position++,
      description: "Konsolen",
      quantity: extras.konsolen.count,
      unit: "Stk.",
      unitPrice: extras.konsolen.pricePerPiece,
      editable: true,
      sourceKey: "konsolen",
    });
  }

  if (extras.ueberbrueckungen.selected && extras.ueberbrueckungen.count > 0) {
    items.push({
      id: "ueberbrueckungen",
      position: position++,
      description: "Überbrückungen",
      quantity: extras.ueberbrueckungen.count,
      unit: "Stk.",
      unitPrice: extras.ueberbrueckungen.pricePerPiece,
      editable: true,
      sourceKey: "ueberbrueckungen",
    });
  }

  if (extras.transport.selected) {
    items.push({
      id: "transport",
      position: position++,
      description: "An- und Abtransport",
      quantity: 1,
      unit: "pauschal",
      unitPrice: extras.transport.price,
      editable: true,
      sourceKey: "transport",
    });
  }

  for (const sonder of input.sonderPositionen) {
    if (sonder.description.trim().length === 0) continue;
    items.push({
      id: sonder.id,
      position: position++,
      description: sonder.description,
      quantity: sonder.quantity,
      unit: sonder.unit,
      unitPrice: sonder.unitPrice,
      editable: true,
      sourceKey: "sonderposition",
    });
  }

  return items;
}

export function createDefaultGeruestInput(): GeruestCalculationInput {
  return {
    scaffoldType: "fassadengeruest",
    loadClass: "Lastklasse 3 (200 kg/m²)",
    dimensions: { facadeLengthM: 12, facadeHeightM: 9 },
    pricing: {
      aufAbbauPricePerM2: 9.5,
      grundmietePricePerM2: 4.5,
      baseWeeks: 4,
      verlaengerungPricePerM2PerWeek: 0.6,
      standzeitWeeks: 4,
    },
    extras: {
      treppe: { selected: false, count: 0, pricePerPiece: 120 },
      schutznetz: { selected: false, pricePerM2: 1.8 },
      konsolen: { selected: false, count: 0, pricePerPiece: 25 },
      ueberbrueckungen: { selected: false, count: 0, pricePerPiece: 95 },
      transport: { selected: false, price: 150 },
    },
    sonderPositionen: [],
  };
}
