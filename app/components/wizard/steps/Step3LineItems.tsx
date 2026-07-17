"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { step3Schema, type Step3Values } from "@/lib/schemas";
import { FieldError, FieldGroup, Label } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StepNav } from "@/components/wizard/StepNav";
import { lineItemTotal } from "@/lib/calculations/totals";
import { formatCurrency } from "@/lib/format";

interface Step3Props {
  defaultValues: Step3Values;
  onNext: (values: Step3Values) => void;
  onBack: () => void;
}

let customItemCounter = 0;

export function Step3LineItems({ defaultValues, onNext, onBack }: Step3Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: "lineItems" });
  const watched = watch("lineItems");
  const vatMode = watch("meta.vatMode");

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl text-ink">Preise & Positionen</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Automatisch aus Ihren Angaben berechnet. Passen Sie Preise, Mengen und Bezeichnungen bei Bedarf an.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-faint">
                <th className="w-10 py-2 pr-2">Pos.</th>
                <th className="py-2 pr-2">Bezeichnung</th>
                <th className="w-24 py-2 pr-2">Menge</th>
                <th className="w-24 py-2 pr-2">Einheit</th>
                <th className="w-28 py-2 pr-2">Einzelpreis</th>
                <th className="w-28 py-2 pr-2 text-right">Gesamt</th>
                <th className="w-10 py-2" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const item = watched?.[index];
                const total = item ? lineItemTotal({ ...item, id: field.id, position: index + 1 } as never) : 0;
                return (
                  <motion.tr
                    key={field.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-line/70 align-top"
                  >
                    <td className="py-2 pr-2 text-ink-faint">{index + 1}</td>
                    <td className="py-2 pr-2">
                      <Input {...register(`lineItems.${index}.description`)} />
                      <FieldError>{errors.lineItems?.[index]?.description?.message}</FieldError>
                    </td>
                    <td className="py-2 pr-2">
                      <Input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        {...register(`lineItems.${index}.quantity`)}
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <Input {...register(`lineItems.${index}.unit`)} />
                    </td>
                    <td className="py-2 pr-2">
                      <Input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        {...register(`lineItems.${index}.unitPrice`)}
                      />
                    </td>
                    <td className="py-2 pr-2 text-right tabular-nums text-ink">{formatCurrency(total)}</td>
                    <td className="py-2 text-right">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label="Position entfernen"
                        className="text-ink-faint transition-colors hover:text-error"
                      >
                        ×
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <FieldError>{errors.lineItems?.message}</FieldError>

        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() =>
            append({
              id: `custom-${Date.now()}-${customItemCounter++}`,
              position: fields.length + 1,
              description: "",
              quantity: 1,
              unit: "Stk.",
              unitPrice: 0,
              editable: true,
            })
          }
        >
          + Position hinzufügen
        </Button>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-xl text-ink">Umsatzsteuer</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="standard" {...register("meta.vatMode")} />
            19% Umsatzsteuer ausweisen
          </label>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="radio" value="kleinunternehmer" {...register("meta.vatMode")} />
            Kleinunternehmerregelung (§19 UStG)
          </label>
        </div>
        {vatMode === "standard" ? (
          <FieldGroup className="mt-4 max-w-[160px]">
            <Label htmlFor="vatRate">MwSt.-Satz (%)</Label>
            <Input id="vatRate" type="number" step="1" inputMode="decimal" {...register("meta.vatRate")} />
          </FieldGroup>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">
            Gemäß §19 UStG wird auf diesem Angebot keine Umsatzsteuer ausgewiesen.
          </p>
        )}
      </Card>

      <StepNav onBack={onBack} nextLabel="Weiter zur Vorschau" />
    </form>
  );
}
