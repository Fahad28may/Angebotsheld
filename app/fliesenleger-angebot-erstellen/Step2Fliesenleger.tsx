"use client";

import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldGroup, Label, Hint } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StepNav } from "@/components/wizard/StepNav";
import {
  resolveFliesenArea,
  TILE_FORMAT_LABELS,
  type FliesenCalculationInput,
} from "@/lib/calculations/fliesenleger";

interface Step2Props {
  defaultValues: FliesenCalculationInput;
  onNext: (values: FliesenCalculationInput) => void;
  onBack: () => void;
}

export function Step2Fliesenleger({ defaultValues, onNext, onBack }: Step2Props) {
  const { register, handleSubmit, watch } = useForm<FliesenCalculationInput>({
    defaultValues,
  });

  const areaMode = watch("area.mode");
  const area = watch("area");
  const altbelagSelected = watch("workTypes.altbelagEntfernen.selected");
  const untergrundSelected = watch("workTypes.untergrundvorbereitung.selected");
  const abdichtungSelected = watch("workTypes.abdichtung.selected");
  const verlegenSelected = watch("workTypes.fliesenVerlegen.selected");
  const verfugenSelected = watch("workTypes.verfugen.selected");
  const silikonSelected = watch("workTypes.silikonfugen.selected");
  const sockelSelected = watch("workTypes.sockelleisten.selected");
  const tilesCustomerProvided = watch("materials.tilesCustomerProvided");
  const anfahrtSelected = watch("extras.anfahrt.selected");
  const entsorgungSelected = watch("extras.entsorgungAltfliesen.selected");

  const computedArea = area ? resolveFliesenArea(area) : 0;

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <Card>
        <h2 className="font-serif text-xl text-ink">Fläche</h2>
        <div className="mt-4 flex gap-3">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="boden" {...register("areaType")} />
            Boden
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="wand" {...register("areaType")} />
            Wand
          </label>
        </div>

        <div className="mt-4 flex gap-3">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="dimensions" {...register("area.mode")} />
            Länge × Breite eingeben
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="direct" {...register("area.mode")} />
            Fläche direkt eingeben
          </label>
        </div>

        {areaMode === "direct" ? (
          <div className="mt-4 max-w-[200px]">
            <FieldGroup>
              <Label htmlFor="areaM2">Fläche (m²)</Label>
              <Input id="areaM2" type="number" step="0.1" inputMode="decimal" {...register("area.areaM2")} />
            </FieldGroup>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:max-w-sm">
            <FieldGroup>
              <Label htmlFor="lengthM">Länge (m)</Label>
              <Input id="lengthM" type="number" step="0.1" inputMode="decimal" {...register("area.lengthM")} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="widthM">Breite (m)</Label>
              <Input id="widthM" type="number" step="0.1" inputMode="decimal" {...register("area.widthM")} />
            </FieldGroup>
          </div>
        )}
        <Hint>Berechnete Fläche: {computedArea} m²</Hint>

        <div className="mt-5 max-w-[240px]">
          <FieldGroup>
            <Label htmlFor="tileFormat">Fliesenformat</Label>
            <Select id="tileFormat" {...register("tileFormat")}>
              {Object.entries(TILE_FORMAT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FieldGroup>
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Arbeiten</h2>
        <div className="mt-4 space-y-3">
          <Checkbox label="Altbelag entfernen" {...register("workTypes.altbelagEntfernen.selected")} />
          {altbelagSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="altbelagPrice">Preis €/m²</Label>
              <Input id="altbelagPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.altbelagEntfernen.pricePerM2")} />
            </FieldGroup>
          )}

          <Checkbox label="Untergrundvorbereitung / Ausgleichsmasse" {...register("workTypes.untergrundvorbereitung.selected")} />
          {untergrundSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="untergrundPrice">Preis €/m²</Label>
              <Input id="untergrundPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.untergrundvorbereitung.pricePerM2")} />
            </FieldGroup>
          )}

          <Checkbox label="Abdichtung (Nassbereich)" {...register("workTypes.abdichtung.selected")} />
          {abdichtungSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="abdichtungPrice">Preis €/m²</Label>
              <Input id="abdichtungPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.abdichtung.pricePerM2")} />
            </FieldGroup>
          )}

          <Checkbox label="Fliesen verlegen" {...register("workTypes.fliesenVerlegen.selected")} />
          {verlegenSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="verlegenPrice">Grundpreis €/m²</Label>
              <Input id="verlegenPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.fliesenVerlegen.pricePerM2Base")} />
              <Hint>Wird je nach Fliesenformat automatisch angepasst.</Hint>
            </FieldGroup>
          )}

          <Checkbox label="Verfugen" {...register("workTypes.verfugen.selected")} />
          {verfugenSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="verfugenPrice">Preis €/m²</Label>
              <Input id="verfugenPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.verfugen.pricePerM2")} />
            </FieldGroup>
          )}

          <Checkbox label="Silikonfugen" {...register("workTypes.silikonfugen.selected")} />
          {silikonSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="silikonMeters">Länge (lfm)</Label>
                <Input id="silikonMeters" type="number" step="0.1" inputMode="decimal" {...register("workTypes.silikonfugen.meters")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="silikonPrice">Preis €/lfm</Label>
                <Input id="silikonPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.silikonfugen.pricePerMeter")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Sockelleisten" {...register("workTypes.sockelleisten.selected")} />
          {sockelSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="sockelMeters">Länge (lfm)</Label>
                <Input id="sockelMeters" type="number" step="0.1" inputMode="decimal" {...register("workTypes.sockelleisten.meters")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="sockelPrice">Preis €/lfm</Label>
                <Input id="sockelPrice" type="number" step="0.1" inputMode="decimal" {...register("workTypes.sockelleisten.pricePerMeter")} />
              </FieldGroup>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Material</h2>
        <div className="mt-4 space-y-3">
          <Checkbox
            label="Fliesen werden vom Kunden gestellt"
            description="Wenn aktiv, wird kein Material für Fliesen berechnet"
            {...register("materials.tilesCustomerProvided")}
          />
          {!tilesCustomerProvided && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="tilePrice">Fliesenpreis €/m²</Label>
              <Input id="tilePrice" type="number" step="0.1" inputMode="decimal" {...register("materials.tilePricePerM2")} />
            </FieldGroup>
          )}
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <FieldGroup>
              <Label htmlFor="wastage">Verschnitt (%)</Label>
              <Input id="wastage" type="number" step="1" inputMode="decimal" {...register("materials.wastagePercent")} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="klebstoffKg">Kleber (kg/m²)</Label>
              <Input id="klebstoffKg" type="number" step="0.1" inputMode="decimal" {...register("materials.klebstoffKgPerM2")} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="klebstoffPrice">Kleber (€/kg)</Label>
              <Input id="klebstoffPrice" type="number" step="0.1" inputMode="decimal" {...register("materials.klebstoffPricePerKg")} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="fugenmassePrice">Fugenmasse (€/m²)</Label>
              <Input id="fugenmassePrice" type="number" step="0.1" inputMode="decimal" {...register("materials.fugenmassePricePerM2")} />
            </FieldGroup>
          </div>
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Zusätzliche Kosten</h2>
        <div className="mt-4 space-y-3">
          <Checkbox label="Anfahrtskosten" {...register("extras.anfahrt.selected")} />
          {anfahrtSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="anfahrtPrice">Preis (pauschal)</Label>
              <Input id="anfahrtPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.anfahrt.price")} />
            </FieldGroup>
          )}
          <Checkbox label="Entsorgung Altfliesen" {...register("extras.entsorgungAltfliesen.selected")} />
          {entsorgungSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="entsorgungPrice">Preis (pauschal)</Label>
              <Input id="entsorgungPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.entsorgungAltfliesen.price")} />
            </FieldGroup>
          )}
        </div>
      </Card>

      <StepNav onBack={onBack} nextLabel="Weiter zu Preisen & Positionen" />
    </form>
  );
}
