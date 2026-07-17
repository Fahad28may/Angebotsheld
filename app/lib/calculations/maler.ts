import type { LineItem } from "@/lib/types";
import { round2 } from "@/lib/format";

export const STANDARD_DOOR_AREA_M2 = 1.77;
export const STANDARD_WINDOW_AREA_M2 = 1.5;

export interface MalerRoom {
  id: string;
  name: string;
  lengthM: number;
  widthM: number;
  heightM: number;
  doorCount: number;
  windowCount: number;
}

export type MalerSurfaceInput =
  | { mode: "direct"; wallAreaM2: number; ceilingAreaM2: number }
  | { mode: "rooms"; rooms: MalerRoom[] };

export interface MalerWorkTypes {
  wandanstrich: { selected: boolean; coats: number; pricePerM2: number };
  deckenanstrich: { selected: boolean; coats: number; pricePerM2: number };
  fassadenanstrich: {
    selected: boolean;
    areaM2: number;
    coats: number;
    pricePerM2: number;
  };
  tapezieren: { selected: boolean; pricePerM2: number };
  spachteln: { selected: boolean; pricePerM2: number };
  lackierarbeiten: {
    selected: boolean;
    doors: { count: number; pricePerPiece: number };
    frames: { count: number; pricePerPiece: number };
    radiators: { count: number; pricePerPiece: number };
  };
}

export interface MalerMaterials {
  includePaintMaterial: boolean;
  paintCoveragePerLiterM2: number;
  paintPricePerLiter: number;
  includeAbdeckmaterial: boolean;
  abdeckmaterialPricePerM2: number;
}

export interface MalerExtras {
  anfahrt: { selected: boolean; price: number };
  entsorgung: { selected: boolean; price: number };
}

export interface MalerCalculationInput {
  surface: MalerSurfaceInput;
  workTypes: MalerWorkTypes;
  materials: MalerMaterials;
  extras: MalerExtras;
}

export interface MalerAreaBreakdown {
  wallAreaM2: number;
  ceilingAreaM2: number;
}

export function computeRoomAreas(rooms: MalerRoom[]): MalerAreaBreakdown {
  let wallAreaM2 = 0;
  let ceilingAreaM2 = 0;

  for (const room of rooms) {
    const perimeter = 2 * (room.lengthM + room.widthM);
    const grossWallArea = perimeter * room.heightM;
    const openings =
      room.doorCount * STANDARD_DOOR_AREA_M2 +
      room.windowCount * STANDARD_WINDOW_AREA_M2;
    wallAreaM2 += Math.max(0, grossWallArea - openings);
    ceilingAreaM2 += room.lengthM * room.widthM;
  }

  return {
    wallAreaM2: round2(wallAreaM2),
    ceilingAreaM2: round2(ceilingAreaM2),
  };
}

export function resolveSurfaceAreas(surface: MalerSurfaceInput): MalerAreaBreakdown {
  if (surface.mode === "direct") {
    return {
      wallAreaM2: round2(Math.max(0, surface.wallAreaM2)),
      ceilingAreaM2: round2(Math.max(0, surface.ceilingAreaM2)),
    };
  }
  return computeRoomAreas(surface.rooms);
}

export function calculateMalerLineItems(input: MalerCalculationInput): LineItem[] {
  const { wallAreaM2, ceilingAreaM2 } = resolveSurfaceAreas(input.surface);
  const items: LineItem[] = [];
  let position = 1;
  let totalPaintedAreaForMaterial = 0;

  const { workTypes, materials, extras } = input;

  if (workTypes.wandanstrich.selected && wallAreaM2 > 0) {
    const coats = Math.max(1, workTypes.wandanstrich.coats);
    items.push({
      id: "wandanstrich",
      position: position++,
      description: `Innenanstrich Wände, ${coats}-fach`,
      quantity: wallAreaM2,
      unit: "m²",
      unitPrice: round2(workTypes.wandanstrich.pricePerM2 * coats),
      editable: true,
      sourceKey: "wandanstrich",
    });
    totalPaintedAreaForMaterial += wallAreaM2 * coats;
  }

  if (workTypes.deckenanstrich.selected && ceilingAreaM2 > 0) {
    const coats = Math.max(1, workTypes.deckenanstrich.coats);
    items.push({
      id: "deckenanstrich",
      position: position++,
      description: `Deckenanstrich, ${coats}-fach`,
      quantity: ceilingAreaM2,
      unit: "m²",
      unitPrice: round2(workTypes.deckenanstrich.pricePerM2 * coats),
      editable: true,
      sourceKey: "deckenanstrich",
    });
    totalPaintedAreaForMaterial += ceilingAreaM2 * coats;
  }

  if (workTypes.fassadenanstrich.selected && workTypes.fassadenanstrich.areaM2 > 0) {
    const coats = Math.max(1, workTypes.fassadenanstrich.coats);
    items.push({
      id: "fassadenanstrich",
      position: position++,
      description: `Fassadenanstrich, ${coats}-fach`,
      quantity: round2(workTypes.fassadenanstrich.areaM2),
      unit: "m²",
      unitPrice: round2(workTypes.fassadenanstrich.pricePerM2 * coats),
      editable: true,
      sourceKey: "fassadenanstrich",
    });
  }

  if (workTypes.spachteln.selected && wallAreaM2 + ceilingAreaM2 > 0) {
    items.push({
      id: "spachteln",
      position: position++,
      description: "Spachteln / Untergrundvorbereitung",
      quantity: round2(wallAreaM2 + ceilingAreaM2),
      unit: "m²",
      unitPrice: workTypes.spachteln.pricePerM2,
      editable: true,
      sourceKey: "spachteln",
    });
  }

  if (workTypes.tapezieren.selected && wallAreaM2 > 0) {
    items.push({
      id: "tapezieren",
      position: position++,
      description: "Tapezierarbeiten",
      quantity: wallAreaM2,
      unit: "m²",
      unitPrice: workTypes.tapezieren.pricePerM2,
      editable: true,
      sourceKey: "tapezieren",
    });
  }

  if (workTypes.lackierarbeiten.selected) {
    const { doors, frames, radiators } = workTypes.lackierarbeiten;
    if (doors.count > 0) {
      items.push({
        id: "lackierarbeiten-tueren",
        position: position++,
        description: "Lackierarbeiten Türen",
        quantity: doors.count,
        unit: "Stk.",
        unitPrice: doors.pricePerPiece,
        editable: true,
        sourceKey: "lackierarbeiten-tueren",
      });
    }
    if (frames.count > 0) {
      items.push({
        id: "lackierarbeiten-zargen",
        position: position++,
        description: "Lackierarbeiten Türzargen",
        quantity: frames.count,
        unit: "Stk.",
        unitPrice: frames.pricePerPiece,
        editable: true,
        sourceKey: "lackierarbeiten-zargen",
      });
    }
    if (radiators.count > 0) {
      items.push({
        id: "lackierarbeiten-heizkoerper",
        position: position++,
        description: "Lackierarbeiten Heizkörper",
        quantity: radiators.count,
        unit: "Stk.",
        unitPrice: radiators.pricePerPiece,
        editable: true,
        sourceKey: "lackierarbeiten-heizkoerper",
      });
    }
  }

  if (materials.includePaintMaterial && totalPaintedAreaForMaterial > 0) {
    const coverage = materials.paintCoveragePerLiterM2 > 0 ? materials.paintCoveragePerLiterM2 : 7;
    const liters = Math.ceil(totalPaintedAreaForMaterial / coverage);
    items.push({
      id: "material-farbe",
      position: position++,
      description: "Material: Farbe",
      quantity: liters,
      unit: "l",
      unitPrice: materials.paintPricePerLiter,
      editable: true,
      sourceKey: "material-farbe",
    });
  }

  if (materials.includeAbdeckmaterial && wallAreaM2 + ceilingAreaM2 > 0) {
    items.push({
      id: "abdeckmaterial",
      position: position++,
      description: "Abklebearbeiten / Abdeckmaterial",
      quantity: round2(wallAreaM2 + ceilingAreaM2),
      unit: "m²",
      unitPrice: materials.abdeckmaterialPricePerM2,
      editable: true,
      sourceKey: "abdeckmaterial",
    });
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

  if (extras.entsorgung.selected) {
    items.push({
      id: "entsorgung",
      position: position++,
      description: "Entsorgung",
      quantity: 1,
      unit: "pauschal",
      unitPrice: extras.entsorgung.price,
      editable: true,
      sourceKey: "entsorgung",
    });
  }

  return items;
}

export function createDefaultMalerInput(): MalerCalculationInput {
  return {
    surface: {
      mode: "rooms",
      rooms: [
        {
          id: "raum-1",
          name: "Wohnzimmer",
          lengthM: 5,
          widthM: 4,
          heightM: 2.5,
          doorCount: 1,
          windowCount: 2,
        },
      ],
    },
    workTypes: {
      wandanstrich: { selected: true, coats: 2, pricePerM2: 8.5 },
      deckenanstrich: { selected: false, coats: 2, pricePerM2: 9.5 },
      fassadenanstrich: { selected: false, areaM2: 0, coats: 2, pricePerM2: 22 },
      tapezieren: { selected: false, pricePerM2: 12 },
      spachteln: { selected: false, pricePerM2: 6.5 },
      lackierarbeiten: {
        selected: false,
        doors: { count: 0, pricePerPiece: 65 },
        frames: { count: 0, pricePerPiece: 35 },
        radiators: { count: 0, pricePerPiece: 45 },
      },
    },
    materials: {
      includePaintMaterial: true,
      paintCoveragePerLiterM2: 7,
      paintPricePerLiter: 12,
      includeAbdeckmaterial: true,
      abdeckmaterialPricePerM2: 1.2,
    },
    extras: {
      anfahrt: { selected: false, price: 45 },
      entsorgung: { selected: false, price: 35 },
    },
  };
}
