import { siteConfig } from "@/lib/siteConfig";
import type { CompanyData, CustomerData, QuoteMeta } from "@/lib/types";

export function suggestQuoteNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 900 + 100);
  return `A-${year}-${String(random).padStart(3, "0")}`;
}

export function createDefaultCompany(): CompanyData {
  return {
    companyName: "",
    legalForm: "Einzelunternehmen",
    street: "",
    postalCode: "",
    city: "",
    contactName: "",
    email: "",
    phone: "",
    taxNumber: "",
    vatId: "",
  };
}

export function createDefaultCustomer(): CustomerData {
  return {
    name: "",
    street: "",
    postalCode: "",
    city: "",
  };
}

export function createDefaultMeta(): QuoteMeta {
  return {
    quoteNumber: suggestQuoteNumber(),
    quoteDate: new Date().toISOString().slice(0, 10),
    validityDays: siteConfig.defaultValidityDays,
    vatMode: "standard",
    vatRate: 19,
    paymentTermsText:
      "Zahlbar innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug. Nach Auftragserteilung behalten wir uns vor, eine Anzahlung von 30 % zu vereinbaren.",
    closingText:
      "Wir freuen uns auf Ihre Beauftragung und stehen für Rückfragen jederzeit gerne zur Verfügung.",
  };
}
