"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { step1Schema, legalForms, type Step1Values } from "@/lib/schemas";
import { FieldError, FieldGroup, Hint, Label } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card } from "@/components/ui/Card";
import { StepNav } from "@/components/wizard/StepNav";
import { useCompanyProfile } from "@/lib/hooks/useCompanyProfile";
import { createDefaultCompany, saveLastQuoteNumber, suggestNextQuoteNumber } from "@/lib/defaults";

interface Step1Props {
  defaultValues: Step1Values;
  onNext: (values: Step1Values) => void;
}

export function Step1CompanyCustomer({ defaultValues, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  const { profile, loaded, saveProfile, clearProfile } = useCompanyProfile();
  const [saveOptIn, setSaveOptIn] = useState(false);
  const [showLoadedNotice, setShowLoadedNotice] = useState(false);

  useEffect(() => {
    // Only pre-fill on a genuinely fresh quote (no company name yet in this
    // wizard session) — never overwrite data the user is already editing.
    if (!loaded || !profile || getValues("company.companyName")) return;
    reset({
      ...getValues(),
      company: profile,
      meta: { ...getValues("meta"), quoteNumber: suggestNextQuoteNumber() },
    });
    setShowLoadedNotice(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, profile]);

  const handleDeleteSavedData = () => {
    clearProfile();
    reset({ ...getValues(), company: createDefaultCompany() });
    setShowLoadedNotice(false);
    setSaveOptIn(false);
  };

  const handleFormSubmit = (values: Step1Values) => {
    if (saveOptIn) {
      saveProfile(values.company);
      saveLastQuoteNumber(values.meta.quoteNumber);
    }
    onNext(values);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <AnimatePresence>
        {showLoadedNotice ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mb-6 flex items-center justify-between gap-3 rounded-md2 border border-accent-100 bg-accent-50 px-4 py-3">
              <p className="text-sm text-accent-700">
                Gespeicherte Firmendaten geladen.{" "}
                <button type="button" onClick={handleDeleteSavedData} className="underline hover:no-underline">
                  Daten löschen
                </button>
              </p>
              <button
                type="button"
                onClick={() => setShowLoadedNotice(false)}
                aria-label="Hinweis schließen"
                className="text-accent-500 hover:text-accent-700"
              >
                ×
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="space-y-6">
        <Card>
          <h2 className="font-serif text-xl text-ink">Ihre Firmendaten</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Diese Angaben erscheinen als Absender auf Ihrem Angebot.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <FieldGroup className="sm:col-span-2">
              <Label htmlFor="companyName">Firmenname</Label>
              <Input
                id="companyName"
                invalid={!!errors.company?.companyName}
                placeholder="Mustermann Malerbetrieb"
                {...register("company.companyName")}
              />
              <FieldError>{errors.company?.companyName?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="legalForm">Rechtsform</Label>
              <Select id="legalForm" {...register("company.legalForm")}>
                {legalForms.map((form) => (
                  <option key={form} value={form}>
                    {form}
                  </option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="contactName">Ansprechpartner</Label>
              <Input
                id="contactName"
                invalid={!!errors.company?.contactName}
                placeholder="Max Mustermann"
                {...register("company.contactName")}
              />
              <FieldError>{errors.company?.contactName?.message}</FieldError>
            </FieldGroup>

            <FieldGroup className="sm:col-span-2">
              <Label htmlFor="street">Straße und Hausnummer</Label>
              <Input
                id="street"
                invalid={!!errors.company?.street}
                placeholder="Musterstraße 1"
                {...register("company.street")}
              />
              <FieldError>{errors.company?.street?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="postalCode">Postleitzahl</Label>
              <Input
                id="postalCode"
                invalid={!!errors.company?.postalCode}
                inputMode="numeric"
                placeholder="12345"
                {...register("company.postalCode")}
              />
              <FieldError>{errors.company?.postalCode?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="city">Ort</Label>
              <Input
                id="city"
                invalid={!!errors.company?.city}
                placeholder="Musterstadt"
                {...register("company.city")}
              />
              <FieldError>{errors.company?.city?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                invalid={!!errors.company?.email}
                placeholder="info@mustermann.de"
                {...register("company.email")}
              />
              <FieldError>{errors.company?.email?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                invalid={!!errors.company?.phone}
                placeholder="0123 456789"
                {...register("company.phone")}
              />
              <FieldError>{errors.company?.phone?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="taxNumber">Steuernummer</Label>
              <Input id="taxNumber" placeholder="12/345/67890" {...register("company.taxNumber")} />
              <Hint>Optional, falls keine USt-IdNr. vorhanden ist.</Hint>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="vatId">USt-IdNr.</Label>
              <Input id="vatId" placeholder="DE123456789" {...register("company.vatId")} />
              <Hint>Optional.</Hint>
            </FieldGroup>
          </div>

          <div className="mt-5">
            <Checkbox
              label="Firmendaten auf diesem Gerät speichern"
              description="Damit sie beim nächsten Angebot automatisch vorausgefüllt sind. Nur auf diesem Gerät, wird nicht übertragen."
              checked={saveOptIn}
              onChange={(e) => setSaveOptIn(e.target.checked)}
            />
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-xl text-ink">Kundendaten</h2>
          <p className="mt-1 text-sm text-ink-soft">An wen richtet sich dieses Angebot?</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <FieldGroup className="sm:col-span-2">
              <Label htmlFor="customerName">Name / Firma</Label>
              <Input
                id="customerName"
                invalid={!!errors.customer?.name}
                placeholder="Familie Beispiel"
                {...register("customer.name")}
              />
              <FieldError>{errors.customer?.name?.message}</FieldError>
            </FieldGroup>

            <FieldGroup className="sm:col-span-2">
              <Label htmlFor="customerStreet">Straße und Hausnummer</Label>
              <Input
                id="customerStreet"
                invalid={!!errors.customer?.street}
                placeholder="Beispielweg 2"
                {...register("customer.street")}
              />
              <FieldError>{errors.customer?.street?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="customerPostalCode">Postleitzahl</Label>
              <Input
                id="customerPostalCode"
                invalid={!!errors.customer?.postalCode}
                inputMode="numeric"
                placeholder="54321"
                {...register("customer.postalCode")}
              />
              <FieldError>{errors.customer?.postalCode?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="customerCity">Ort</Label>
              <Input
                id="customerCity"
                invalid={!!errors.customer?.city}
                placeholder="Beispielhausen"
                {...register("customer.city")}
              />
              <FieldError>{errors.customer?.city?.message}</FieldError>
            </FieldGroup>
          </div>
        </Card>

        <Card>
          <h2 className="font-serif text-xl text-ink">Angebotsdaten</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <FieldGroup>
              <Label htmlFor="quoteNumber">Angebotsnummer</Label>
              <Input id="quoteNumber" invalid={!!errors.meta?.quoteNumber} {...register("meta.quoteNumber")} />
              <FieldError>{errors.meta?.quoteNumber?.message}</FieldError>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="quoteDate">Datum</Label>
              <Input id="quoteDate" type="date" {...register("meta.quoteDate")} />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="validityDays">Gültig für (Tage)</Label>
              <Input id="validityDays" type="number" inputMode="numeric" min={1} {...register("meta.validityDays")} />
            </FieldGroup>
          </div>
        </Card>
      </div>

      <StepNav nextLabel="Weiter zu den Projektdaten" />
    </form>
  );
}
