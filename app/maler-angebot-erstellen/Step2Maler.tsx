"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldGroup, Label, Hint } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { StepNav } from "@/components/wizard/StepNav";
import {
  computeRoomAreas,
  type MalerCalculationInput,
  type MalerRoom,
} from "@/lib/calculations/maler";

interface FormValues {
  surfaceMode: "rooms" | "direct";
  wallAreaM2: number;
  ceilingAreaM2: number;
  rooms: MalerRoom[];
  workTypes: MalerCalculationInput["workTypes"];
  materials: MalerCalculationInput["materials"];
  extras: MalerCalculationInput["extras"];
}

interface Step2Props {
  defaultValues: MalerCalculationInput;
  onNext: (values: MalerCalculationInput) => void;
  onBack: () => void;
}

let roomCounter = 0;

export function Step2Maler({ defaultValues, onNext, onBack }: Step2Props) {
  const initial: FormValues = {
    surfaceMode: defaultValues.surface.mode,
    wallAreaM2: defaultValues.surface.mode === "direct" ? defaultValues.surface.wallAreaM2 : 0,
    ceilingAreaM2: defaultValues.surface.mode === "direct" ? defaultValues.surface.ceilingAreaM2 : 0,
    rooms: defaultValues.surface.mode === "rooms" ? defaultValues.surface.rooms : [],
    workTypes: defaultValues.workTypes,
    materials: defaultValues.materials,
    extras: defaultValues.extras,
  };

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: initial,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "rooms" });
  const surfaceMode = watch("surfaceMode");
  const rooms = watch("rooms");
  const wandanstrichSelected = watch("workTypes.wandanstrich.selected");
  const deckenanstrichSelected = watch("workTypes.deckenanstrich.selected");
  const fassadeSelected = watch("workTypes.fassadenanstrich.selected");
  const tapeSelected = watch("workTypes.tapezieren.selected");
  const spachtelnSelected = watch("workTypes.spachteln.selected");
  const lackSelected = watch("workTypes.lackierarbeiten.selected");
  const paintMaterialSelected = watch("materials.includePaintMaterial");
  const abdeckSelected = watch("materials.includeAbdeckmaterial");
  const anfahrtSelected = watch("extras.anfahrt.selected");
  const entsorgungSelected = watch("extras.entsorgung.selected");

  const roomAreas = surfaceMode === "rooms" ? computeRoomAreas(rooms ?? []) : null;

  const submit = (values: FormValues) => {
    const surface: MalerCalculationInput["surface"] =
      values.surfaceMode === "direct"
        ? { mode: "direct", wallAreaM2: Number(values.wallAreaM2) || 0, ceilingAreaM2: Number(values.ceilingAreaM2) || 0 }
        : { mode: "rooms", rooms: values.rooms };

    onNext({
      surface,
      workTypes: values.workTypes,
      materials: values.materials,
      extras: values.extras,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Card>
        <h2 className="font-serif text-xl text-ink">Flächen</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Erfassen Sie die Flächen direkt in m² oder über die Raummaße – Türen und Fenster werden
          automatisch abgezogen.
        </p>

        <div className="mt-4 flex gap-3">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="rooms" {...register("surfaceMode")} />
            Raummaße eingeben
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="direct" {...register("surfaceMode")} />
            Fläche direkt eingeben
          </label>
        </div>

        {surfaceMode === "direct" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FieldGroup>
              <Label htmlFor="wallAreaM2">Wandfläche (m²)</Label>
              <Input id="wallAreaM2" type="number" step="0.1" inputMode="decimal" {...register("wallAreaM2")} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="ceilingAreaM2">Deckenfläche (m²)</Label>
              <Input id="ceilingAreaM2" type="number" step="0.1" inputMode="decimal" {...register("ceilingAreaM2")} />
            </FieldGroup>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-md2 border border-line p-4">
                <div className="flex items-center justify-between">
                  <Input
                    className="max-w-[220px] font-medium"
                    {...register(`rooms.${index}.name`)}
                    placeholder="Raumbezeichnung"
                  />
                  {fields.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-ink-faint hover:text-error"
                    >
                      Entfernen
                    </button>
                  ) : null}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  <FieldGroup>
                    <Label htmlFor={`rooms.${index}.lengthM`}>Länge (m)</Label>
                    <Input id={`rooms.${index}.lengthM`} type="number" step="0.1" inputMode="decimal" {...register(`rooms.${index}.lengthM`)} />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor={`rooms.${index}.widthM`}>Breite (m)</Label>
                    <Input id={`rooms.${index}.widthM`} type="number" step="0.1" inputMode="decimal" {...register(`rooms.${index}.widthM`)} />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor={`rooms.${index}.heightM`}>Höhe (m)</Label>
                    <Input id={`rooms.${index}.heightM`} type="number" step="0.1" inputMode="decimal" {...register(`rooms.${index}.heightM`)} />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor={`rooms.${index}.doorCount`}>Türen</Label>
                    <Input id={`rooms.${index}.doorCount`} type="number" inputMode="numeric" {...register(`rooms.${index}.doorCount`)} />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor={`rooms.${index}.windowCount`}>Fenster</Label>
                    <Input id={`rooms.${index}.windowCount`} type="number" inputMode="numeric" {...register(`rooms.${index}.windowCount`)} />
                  </FieldGroup>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  id: `raum-${Date.now()}-${roomCounter++}`,
                  name: `Raum ${fields.length + 1}`,
                  lengthM: 4,
                  widthM: 3,
                  heightM: 2.5,
                  doorCount: 1,
                  windowCount: 1,
                })
              }
            >
              + Raum hinzufügen
            </Button>
            {roomAreas ? (
              <Hint>
                Berechnete Fläche: {roomAreas.wallAreaM2} m² Wand, {roomAreas.ceilingAreaM2} m² Decke
              </Hint>
            ) : null}
          </div>
        )}
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Arbeiten</h2>
        <div className="mt-4 space-y-3">
          <Checkbox label="Innenanstrich Wände" {...register("workTypes.wandanstrich.selected")} />
          {wandanstrichSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="wandCoats">Anstriche</Label>
                <Input id="wandCoats" type="number" inputMode="numeric" {...register("workTypes.wandanstrich.coats")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="wandPrice">Preis €/m²</Label>
                <Input id="wandPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.wandanstrich.pricePerM2")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Deckenanstrich" {...register("workTypes.deckenanstrich.selected")} />
          {deckenanstrichSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="deckenCoats">Anstriche</Label>
                <Input id="deckenCoats" type="number" inputMode="numeric" {...register("workTypes.deckenanstrich.coats")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="deckenPrice">Preis €/m²</Label>
                <Input id="deckenPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.deckenanstrich.pricePerM2")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Fassadenanstrich" {...register("workTypes.fassadenanstrich.selected")} />
          {fassadeSelected && (
            <div className="grid grid-cols-3 gap-3 pl-4 sm:max-w-md">
              <FieldGroup>
                <Label htmlFor="fassadeArea">Fläche (m²)</Label>
                <Input id="fassadeArea" type="number" step="0.1" inputMode="decimal" {...register("workTypes.fassadenanstrich.areaM2")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="fassadeCoats">Anstriche</Label>
                <Input id="fassadeCoats" type="number" inputMode="numeric" {...register("workTypes.fassadenanstrich.coats")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="fassadePrice">Preis €/m²</Label>
                <Input id="fassadePrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.fassadenanstrich.pricePerM2")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Tapezierarbeiten" {...register("workTypes.tapezieren.selected")} />
          {tapeSelected && (
            <div className="pl-4 sm:max-w-[200px]">
              <FieldGroup>
                <Label htmlFor="tapePrice">Preis €/m²</Label>
                <Input id="tapePrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.tapezieren.pricePerM2")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Spachteln / Untergrundvorbereitung" {...register("workTypes.spachteln.selected")} />
          {spachtelnSelected && (
            <div className="pl-4 sm:max-w-[200px]">
              <FieldGroup>
                <Label htmlFor="spachtelnPrice">Preis €/m²</Label>
                <Input id="spachtelnPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.spachteln.pricePerM2")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Lackierarbeiten (Türen, Zargen, Heizkörper)" {...register("workTypes.lackierarbeiten.selected")} />
          {lackSelected && (
            <div className="grid grid-cols-3 gap-3 pl-4 sm:max-w-lg">
              <FieldGroup>
                <Label htmlFor="doorsCount">Türen (Stk.)</Label>
                <Input id="doorsCount" type="number" inputMode="numeric" {...register("workTypes.lackierarbeiten.doors.count")} />
                <Hint>{"€/Stk."}</Hint>
                <Input type="number" step="0.1" inputMode="decimal" {...register("workTypes.lackierarbeiten.doors.pricePerPiece")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="framesCount">Zargen (Stk.)</Label>
                <Input id="framesCount" type="number" inputMode="numeric" {...register("workTypes.lackierarbeiten.frames.count")} />
                <Hint>{"€/Stk."}</Hint>
                <Input type="number" step="0.1" inputMode="decimal" {...register("workTypes.lackierarbeiten.frames.pricePerPiece")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="radiatorsCount">Heizkörper (Stk.)</Label>
                <Input id="radiatorsCount" type="number" inputMode="numeric" {...register("workTypes.lackierarbeiten.radiators.count")} />
                <Hint>{"€/Stk."}</Hint>
                <Input type="number" step="0.1" inputMode="decimal" {...register("workTypes.lackierarbeiten.radiators.pricePerPiece")} />
              </FieldGroup>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Material</h2>
        <div className="mt-4 space-y-3">
          <Checkbox
            label="Farbmaterial in Angebot aufnehmen"
            description="Berechnet aus Fläche × Anstriche ÷ Ergiebigkeit"
            {...register("materials.includePaintMaterial")}
          />
          {paintMaterialSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="coverage">Ergiebigkeit (m²/l)</Label>
                <Input id="coverage" type="number" step="0.1" inputMode="decimal" {...register("materials.paintCoveragePerLiterM2")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="paintPrice">Preis €/l</Label>
                <Input id="paintPrice" type="number" step="0.1" inputMode="decimal" {...register("materials.paintPricePerLiter")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Abklebearbeiten / Abdeckmaterial" {...register("materials.includeAbdeckmaterial")} />
          {abdeckSelected && (
            <div className="pl-4 sm:max-w-[200px]">
              <FieldGroup>
                <Label htmlFor="abdeckPrice">Preis €/m²</Label>
                <Input id="abdeckPrice" type="number" step="0.1" inputMode="decimal" {...register("materials.abdeckmaterialPricePerM2")} />
              </FieldGroup>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Zusätzliche Kosten</h2>
        <div className="mt-4 space-y-3">
          <Checkbox label="Anfahrtskosten" {...register("extras.anfahrt.selected")} />
          {anfahrtSelected && (
            <div className="pl-4 sm:max-w-[200px]">
              <FieldGroup>
                <Label htmlFor="anfahrtPrice">Preis (pauschal)</Label>
                <Input id="anfahrtPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.anfahrt.price")} />
              </FieldGroup>
            </div>
          )}
          <Checkbox label="Entsorgung" {...register("extras.entsorgung.selected")} />
          {entsorgungSelected && (
            <div className="pl-4 sm:max-w-[200px]">
              <FieldGroup>
                <Label htmlFor="entsorgungPrice">Preis (pauschal)</Label>
                <Input id="entsorgungPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.entsorgung.price")} />
              </FieldGroup>
            </div>
          )}
        </div>
      </Card>

      <StepNav onBack={onBack} nextLabel="Weiter zu Preisen & Positionen" />
    </form>
  );
}
