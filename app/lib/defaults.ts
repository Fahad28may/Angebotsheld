import { siteConfig } from "@/lib/siteConfig";
import type { CompanyData, CustomerData, QuoteMeta } from "@/lib/types";

const LAST_QUOTE_NUMBER_KEY = "angebotsheld:last-quote-number";

export function suggestQuoteNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 900 + 100);
  return `A-${year}-${String(random).padStart(3, "0")}`;
}

// Only ever call from a client-side effect (never during initial/SSR render)
// — localStorage isn't available on the server, and reading it during the
// synchronous initial state computation would produce a value that differs
// between server and client render, causing a hydration mismatch.
export function suggestNextQuoteNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  try {
    const last = window.localStorage.getItem(LAST_QUOTE_NUMBER_KEY);
    const match = last ? /^A-(\d{4})-(\d+)$/.exec(last) : null;
    if (match) {
      const lastYear = Number(match[1]);
      const lastSeq = Number(match[2]);
      const nextSeq = lastYear === year ? lastSeq + 1 : 1;
      return `A-${year}-${String(nextSeq).padStart(3, "0")}`;
    }
  } catch {
    // storage unavailable — fall through to the random suggestion
  }
  return suggestQuoteNumber(date);
}

export function saveLastQuoteNumber(value: string) {
  try {
    window.localStorage.setItem(LAST_QUOTE_NUMBER_KEY, value);
  } catch {
    // storage unavailable (private mode, quota) — fail silently
  }
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
