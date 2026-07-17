import type { LineItem } from "@/lib/types";
import { round2 } from "@/lib/format";

export type TileFormat = "mosaik" | "standard" | "grossformat";

export const TILE_FORMAT_LABOR_MULTIPLIER: Record<TileFormat, number> = {
  mosaik: 1.35,
  standard: 1,
  grossformat: 1.25,
};

export const TILE_FORMAT_LABELS: Record<TileFormat, string> = {
  mosaik: "Mosaik",
  standard: "Standardformat",
  grossformat: "Großformat",
};

export type FliesenAreaType = "boden" | "wand";

export interface FliesenAreaInput {
  mode: "direct" | "dimensions";
  areaM2: number;
  lengthM: number;
  widthM: number;
}

export function resolveFliesenArea(input: FliesenAreaInput): number {
  if (input.mode === "dimensions") {
    return round2(Math.max(0, input.lengthM * input.widthM));
  }
  return round2(Math.max(0, input.areaM2));
}

export interface FliesenWorkTypes {
  altbelagEntfernen: { selected: boolean; pricePerM2: number };
  untergrundvorbereitung: { selected: boolean; pricePerM2: number };
  abdichtung: { selected: boolean; pricePerM2: number };
  fliesenVerlegen: { selected: boolean; pricePerM2Base: number };
  verfugen: { selected: boolean; pricePerM2: number };
  silikonfugen: { selected: boolean; meters: number; pricePerMeter: number };
  sockelleisten: { selected: boolean; meters: number; pricePerMeter: number };
}

export interface FliesenMaterials {
  tilesCustomerProvided: boolean;
  tilePricePerM2: number;
  wastagePercent: number;
  klebstoffKgPerM2: number;
  klebstoffPricePerKg: number;
  fugenmassePricePerM2: number;
}

export interface FliesenExtras {
  anfahrt: { selected: boolean; price: number };
  entsorgungAltfliesen: { selected: boolean; price: number };
}

export interface FliesenCalculationInput {
  areaType: FliesenAreaType;
  area: FliesenAreaInput;
  tileFormat: TileFormat;
  workTypes: FliesenWorkTypes;
  materials: FliesenMaterials;
  extras: FliesenExtras;
}

export function calculateFliesenLineItems(input: FliesenCalculationInput): LineItem[] {
  const areaM2 = resolveFliesenArea(input.area);
  const items: LineItem[] = [];
  let position = 1;
  const { workTypes, materials, extras } = input;
  const areaLabel = input.areaType === "boden" ? "Boden" : "Wand";

  if (workTypes.altbelagEntfernen.selected && areaM2 > 0) {
    items.push({
      id: "altbelag-entfernen",
      position: position++,
      description: `Altbelag entfernen (${areaLabel})`,
      quantity: areaM2,
      unit: "m²",
      unitPrice: workTypes.altbelagEntfernen.pricePerM2,
      editable: true,
      sourceKey: "altbelag-entfernen",
    });
  }

  if (workTypes.untergrundvorbereitung.selected && areaM2 > 0) {
    items.push({
      id: "untergrundvorbereitung",
      position: position++,
      description: "Untergrundvorbereitung / Ausgleichsmasse",
      quantity: areaM2,
      unit: "m²",
      unitPrice: workTypes.untergrundvorbereitung.pricePerM2,
      editable: true,
      sourceKey: "untergrundvorbereitung",
    });
  }

  if (workTypes.abdichtung.selected && areaM2 > 0) {
    items.push({
      id: "abdichtung",
      position: position++,
      description: "Abdichtungsarbeiten (Nassbereich)",
      quantity: areaM2,
      unit: "m²",
      unitPrice: workTypes.abdichtung.pricePerM2,
      editable: true,
      sourceKey: "abdichtung",
    });
  }

  if (workTypes.fliesenVerlegen.selected && areaM2 > 0) {
    const multiplier = TILE_FORMAT_LABOR_MULTIPLIER[input.tileFormat];
    items.push({
      id: "fliesen-verlegen",
      position: position++,
      description: `Fliesen verlegen (${areaLabel}, ${TILE_FORMAT_LABELS[input.tileFormat]})`,
      quantity: areaM2,
      unit: "m²",
      unitPrice: round2(workTypes.fliesenVerlegen.pricePerM2Base * multiplier),
      editable: true,
      sourceKey: "fliesen-verlegen",
    });
  }

  if (workTypes.verfugen.selected && areaM2 > 0) {
    items.push({
      id: "verfugen",
      position: position++,
      description: "Verfugen",
      quantity: areaM2,
      unit: "m²",
      unitPrice: workTypes.verfugen.pricePerM2,
      editable: true,
      sourceKey: "verfugen",
    });
  }

  if (workTypes.silikonfugen.selected && workTypes.silikonfugen.meters > 0) {
    items.push({
      id: "silikonfugen",
      position: position++,
      description: "Silikonfugen",
      quantity: round2(workTypes.silikonfugen.meters),
      unit: "lfm",
      unitPrice: workTypes.silikonfugen.pricePerMeter,
      editable: true,
      sourceKey: "silikonfugen",
    });
  }

  if (workTypes.sockelleisten.selected && workTypes.sockelleisten.meters > 0) {
    items.push({
      id: "sockelleisten",
      position: position++,
      description: "Sockelleisten verlegen",
      quantity: round2(workTypes.sockelleisten.meters),
      unit: "lfm",
      unitPrice: workTypes.sockelleisten.pricePerMeter,
      editable: true,
      sourceKey: "sockelleisten",
    });
  }

  if (areaM2 > 0) {
    const wastageFactor = 1 + Math.max(0, materials.wastagePercent) / 100;
    const tileQuantity = round2(areaM2 * wastageFactor);

    if (!materials.tilesCustomerProvided) {
      items.push({
        id: "material-fliesen",
        position: position++,
        description: `Material: Fliesen (inkl. ${round2(materials.wastagePercent)}% Verschnitt)`,
        quantity: tileQuantity,
        unit: "m²",
        unitPrice: materials.tilePricePerM2,
        editable: true,
        sourceKey: "material-fliesen",
      });
    }

    if (workTypes.fliesenVerlegen.selected) {
      const klebstoffKg = round2(areaM2 * materials.klebstoffKgPerM2);
      items.push({
        id: "material-klebstoff",
        position: position++,
        description: "Material: Fliesenkleber",
        quantity: klebstoffKg,
        unit: "kg",
        unitPrice: materials.klebstoffPricePerKg,
        editable: true,
        sourceKey: "material-klebstoff",
      });
    }

    if (workTypes.verfugen.selected) {
      items.push({
        id: "material-fugenmasse",
        position: position++,
        description: "Material: Fugenmasse",
        quantity: areaM2,
        unit: "m²",
        unitPrice: materials.fugenmassePricePerM2,
        editable: true,
        sourceKey: "material-fugenmasse",
      });
    }
  }

  if (extras.anfahrt.selected) {
    items.push({
      id: "anfahrt",
      position: position++,
      description: "Anfahrtskosten",
      quantity: 1,
      unit: "pauschal",
      unitPrice: extras.anfahrt.price,
      editable: true,
      sourceKey: "anfahrt",
    });
  }

  if (extras.entsorgungAltfliesen.selected) {
    items.push({
      id: "entsorgung-altfliesen",
      position: position++,
      description: "Entsorgung Altfliesen",
      quantity: 1,
      unit: "pauschal",
      unitPrice: extras.entsorgungAltfliesen.price,
      editable: true,
      sourceKey: "entsorgung-altfliesen",
    });
  }

  return items;
}

export function createDefaultFliesenInput(): FliesenCalculationInput {
  return {
    areaType: "boden",
    area: { mode: "dimensions", areaM2: 0, lengthM: 4, widthM: 3 },
    tileFormat: "standard",
    workTypes: {
      altbelagEntfernen: { selected: false, pricePerM2: 12 },
      untergrundvorbereitung: { selected: true, pricePerM2: 9 },
      abdichtung: { selected: false, pricePerM2: 14 },
      fliesenVerlegen: { selected: true, pricePerM2Base: 38 },
      verfugen: { selected: true, pricePerM2: 6 },
      silikonfugen: { selected: false, meters: 0, pricePerMeter: 6 },
      sockelleisten: { selected: false, meters: 0, pricePerMeter: 9 },
    },
    materials: {
      tilesCustomerProvided: false,
      tilePricePerM2: 28,
      wastagePercent: 10,
      klebstoffKgPerM2: 5,
      klebstoffPricePerKg: 0.9,
      fugenmassePricePerM2: 2.5,
    },
    extras: {
      anfahrt: { selected: false, price: 45 },
      entsorgungAltfliesen: { selected: false, price: 60 },
    },
  };
}
