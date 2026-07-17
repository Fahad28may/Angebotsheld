export type TradeKey = "maler" | "fliesenleger" | "geruestbau";

export type LegalForm =
  | "Einzelunternehmen"
  | "GbR"
  | "GmbH"
  | "UG (haftungsbeschränkt)"
  | "OHG"
  | "KG"
  | "Sonstige";

export interface CompanyData {
  companyName: string;
  legalForm: LegalForm;
  street: string;
  postalCode: string;
  city: string;
  contactName: string;
  email: string;
  phone: string;
  taxNumber: string;
  vatId: string;
}

export interface CustomerData {
  name: string;
  street: string;
  postalCode: string;
  city: string;
}

export type VatMode = "standard" | "kleinunternehmer";

export interface QuoteMeta {
  quoteNumber: string;
  quoteDate: string; // ISO date
  validityDays: number;
  vatMode: VatMode;
  vatRate: number; // e.g. 19
  paymentTermsText: string;
  closingText: string;
}

export interface LineItem {
  id: string;
  position: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  editable: boolean;
  sourceKey?: string;
}

export interface QuoteTotals {
  netTotal: number;
  vatAmount: number;
  grossTotal: number;
}

export interface BaseQuoteState {
  company: CompanyData;
  customer: CustomerData;
  meta: QuoteMeta;
  lineItems: LineItem[];
}
