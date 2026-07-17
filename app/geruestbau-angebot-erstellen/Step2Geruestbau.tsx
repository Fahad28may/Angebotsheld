"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldGroup, Label, Hint } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { StepNav } from "@/components/wizard/StepNav";
import {
  computeGeruestflaeche,
  computeExtensionWeeks,
  scaffoldTypeLabels,
  type GeruestCalculationInput,
  type LoadClass,
} from "@/lib/calculations/geruestbau";

const loadClasses: LoadClass[] = [
  "Lastklasse 2 (150 kg/m²)",
  "Lastklasse 3 (200 kg/m²)",
  "Lastklasse 4 (300 kg/m²)",
  "Lastklasse 5 (450 kg/m²)",
  "Lastklasse 6 (600 kg/m²)",
];

interface Step2Props {
  defaultValues: GeruestCalculationInput;
  onNext: (values: GeruestCalculationInput) => void;
  onBack: () => void;
}

let sonderCounter = 0;

export function Step2Geruestbau({ defaultValues, onNext, onBack }: Step2Props) {
  const { register, control, handleSubmit, watch } = useForm<GeruestCalculationInput>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "sonderPositionen" });

  const dimensions = watch("dimensions");
  const pricing = watch("pricing");
  const treppeSelected = watch("extras.treppe.selected");
  const schutznetzSelected = watch("extras.schutznetz.selected");
  const konsolenSelected = watch("extras.konsolen.selected");
  const ueberbrueckungenSelected = watch("extras.ueberbrueckungen.selected");
  const transportSelected = watch("extras.transport.selected");

  const flaeche = dimensions ? computeGeruestflaeche(dimensions) : 0;
  const extensionWeeks = pricing ? computeExtensionWeeks(pricing) : 0;

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <Card>
        <h2 className="font-serif text-xl text-ink">Gerüst</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FieldGroup>
            <Label htmlFor="scaffoldType">Gerüstart</Label>
            <Select id="scaffoldType" {...register("scaffoldType")}>
              {Object.entries(scaffoldTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="loadClass">Lastklasse</Label>
            <Select id="loadClass" {...register("loadClass")}>
              {loadClasses.map((lc) => (
                <option key={lc} value={lc}>
                  {lc}
                </option>
              ))}
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="facadeLengthM">Fassadenlänge (m)</Label>
            <Input id="facadeLengthM" type="number" step="0.1" inputMode="decimal" {...register("dimensions.facadeLengthM")} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="facadeHeightM">Fassadenhöhe (m)</Label>
            <Input id="facadeHeightM" type="number" step="0.1" inputMode="decimal" {...register("dimensions.facadeHeightM")} />
          </FieldGroup>
        </div>
        <Hint>Berechnete Gerüstfläche: {flaeche} m²</Hint>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Miete & Standzeit</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FieldGroup>
            <Label htmlFor="aufAbbauPrice">Auf-/Abbau (€/m²)</Label>
            <Input id="aufAbbauPrice" type="number" step="0.1" inputMode="decimal" {...register("pricing.aufAbbauPricePerM2")} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="grundmietePrice">Grundmiete (€/m²)</Label>
            <Input id="grundmietePrice" type="number" step="0.1" inputMode="decimal" {...register("pricing.grundmietePricePerM2")} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="baseWeeks">Grundmiete umfasst (Wochen)</Label>
            <Input id="baseWeeks" type="number" step="1" inputMode="numeric" {...register("pricing.baseWeeks")} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="verlaengerungPrice">Verlängerung (€/m² je Woche)</Label>
            <Input id="verlaengerungPrice" type="number" step="0.1" inputMode="decimal" {...register("pricing.verlaengerungPricePerM2PerWeek")} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="standzeitWeeks">Geplante Standzeit (Wochen)</Label>
            <Input id="standzeitWeeks" type="number" step="1" inputMode="numeric" {...register("pricing.standzeitWeeks")} />
          </FieldGroup>
        </div>
        <Hint>
          {extensionWeeks > 0
            ? `Zusätzliche Verlängerungsmiete für ${extensionWeeks} Woche(n) wird berechnet.`
            : "Standzeit liegt innerhalb der Grundmiete – keine Verlängerung nötig."}
        </Hint>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Zusätzliche Positionen</h2>
        <div className="mt-4 space-y-3">
          <Checkbox label="Gerüsttreppe" {...register("extras.treppe.selected")} />
          {treppeSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="treppeCount">Anzahl</Label>
                <Input id="treppeCount" type="number" inputMode="numeric" {...register("extras.treppe.count")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="treppePrice">Preis €/Stk.</Label>
                <Input id="treppePrice" type="number" step="0.1" inputMode="decimal" {...register("extras.treppe.pricePerPiece")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Schutznetz / Plane" {...register("extras.schutznetz.selected")} />
          {schutznetzSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="schutznetzPrice">Preis €/m²</Label>
              <Input id="schutznetzPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.schutznetz.pricePerM2")} />
            </FieldGroup>
          )}

          <Checkbox label="Konsolen" {...register("extras.konsolen.selected")} />
          {konsolenSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="konsolenCount">Anzahl</Label>
                <Input id="konsolenCount" type="number" inputMode="numeric" {...register("extras.konsolen.count")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="konsolenPrice">Preis €/Stk.</Label>
                <Input id="konsolenPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.konsolen.pricePerPiece")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="Überbrückungen" {...register("extras.ueberbrueckungen.selected")} />
          {ueberbrueckungenSelected && (
            <div className="grid grid-cols-2 gap-3 pl-4 sm:max-w-sm">
              <FieldGroup>
                <Label htmlFor="ueberbrueckungenCount">Anzahl</Label>
                <Input id="ueberbrueckungenCount" type="number" inputMode="numeric" {...register("extras.ueberbrueckungen.count")} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="ueberbrueckungenPrice">Preis €/Stk.</Label>
                <Input id="ueberbrueckungenPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.ueberbrueckungen.pricePerPiece")} />
              </FieldGroup>
            </div>
          )}

          <Checkbox label="An- und Abtransport" {...register("extras.transport.selected")} />
          {transportSelected && (
            <FieldGroup className="max-w-[200px] pl-4">
              <Label htmlFor="transportPrice">Preis (pauschal)</Label>
              <Input id="transportPrice" type="number" step="0.1" inputMode="decimal" {...register("extras.transport.price")} />
            </FieldGroup>
          )}
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Sondergerüst / Individuelle Positionen</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Für Sonderkonstruktionen, die sich nicht standardmäßig abbilden lassen.
        </p>
        <div className="mt-4 space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_100px_100px_120px_auto] items-end gap-3">
              <FieldGroup>
                <Label htmlFor={`sonder-desc-${index}`}>Bezeichnung</Label>
                <Input id={`sonder-desc-${index}`} {...register(`sonderPositionen.${index}.description`)} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor={`sonder-qty-${index}`}>Menge</Label>
                <Input id={`sonder-qty-${index}`} type="number" step="0.1" inputMode="decimal" {...register(`sonderPositionen.${index}.quantity`)} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor={`sonder-unit-${index}`}>Einheit</Label>
                <Input id={`sonder-unit-${index}`} {...register(`sonderPositionen.${index}.unit`)} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor={`sonder-price-${index}`}>Preis €</Label>
                <Input id={`sonder-price-${index}`} type="number" step="0.1" inputMode="decimal" {...register(`sonderPositionen.${index}.unitPrice`)} />
              </FieldGroup>
              <button type="button" onClick={() => remove(index)} className="mb-2 text-sm text-ink-faint hover:text-error">
                Entfernen
              </button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                id: `sonder-${Date.now()}-${sonderCounter++}`,
                description: "",
                quantity: 1,
                unit: "pauschal",
                unitPrice: 0,
              })
            }
          >
            + Sonderposition hinzufügen
          </Button>
        </div>
      </Card>

      <StepNav onBack={onBack} nextLabel="Weiter zu Preisen & Positionen" />
    </form>
  );
}
