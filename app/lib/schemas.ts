import { z } from "zod";

export const legalForms = [
  "Einzelunternehmen",
  "GbR",
  "GmbH",
  "UG (haftungsbeschränkt)",
  "OHG",
  "KG",
  "Sonstige",
] as const;

export const companySchema = z.object({
  companyName: z.string().min(1, "Bitte geben Sie den Firmennamen an."),
  legalForm: z.enum(legalForms),
  street: z.string().min(1, "Bitte geben Sie die Straße und Hausnummer an."),
  postalCode: z
    .string()
    .min(4, "Bitte geben Sie eine gültige Postleitzahl an.")
    .max(6),
  city: z.string().min(1, "Bitte geben Sie den Ort an."),
  contactName: z.string().min(1, "Bitte geben Sie einen Ansprechpartner an."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: z.string().min(1, "Bitte geben Sie eine Telefonnummer an."),
  taxNumber: z.string().optional().default(""),
  vatId: z.string().optional().default(""),
});

export const customerSchema = z.object({
  name: z.string().min(1, "Bitte geben Sie den Namen des Kunden an."),
  street: z.string().min(1, "Bitte geben Sie die Straße und Hausnummer an."),
  postalCode: z
    .string()
    .min(4, "Bitte geben Sie eine gültige Postleitzahl an.")
    .max(6),
  city: z.string().min(1, "Bitte geben Sie den Ort an."),
});

export const quoteMetaSchema = z.object({
  quoteNumber: z.string().min(1, "Bitte geben Sie eine Angebotsnummer an."),
  quoteDate: z.string().min(1),
  validityDays: z.coerce.number().int().min(1).max(180),
  vatMode: z.enum(["standard", "kleinunternehmer"]),
  vatRate: z.coerce.number().min(0).max(100),
  paymentTermsText: z.string().min(1),
  closingText: z.string().min(1),
});

export const step1Schema = z.object({
  company: companySchema,
  customer: customerSchema,
  meta: quoteMetaSchema,
});

export type Step1Values = z.infer<typeof step1Schema>;

export const lineItemSchema = z.object({
  id: z.string(),
  position: z.number(),
  description: z.string().min(1, "Bitte geben Sie eine Bezeichnung an."),
  quantity: z.coerce.number().min(0, "Menge darf nicht negativ sein."),
  unit: z.string().min(1, "Bitte geben Sie eine Einheit an."),
  unitPrice: z.coerce.number().min(0, "Preis darf nicht negativ sein."),
  editable: z.boolean(),
  sourceKey: z.string().optional(),
});

export const step3Schema = z.object({
  lineItems: z.array(lineItemSchema).min(1, "Bitte fügen Sie mindestens eine Position hinzu."),
  meta: quoteMetaSchema,
});

export type Step3Values = z.infer<typeof step3Schema>;
