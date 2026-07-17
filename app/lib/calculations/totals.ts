import type { LineItem, QuoteMeta, QuoteTotals } from "@/lib/types";
import { round2 } from "@/lib/format";

export function lineItemTotal(item: LineItem): number {
  return round2(item.quantity * item.unitPrice);
}

export function calculateTotals(lineItems: LineItem[], meta: QuoteMeta): QuoteTotals {
  const netTotal = round2(lineItems.reduce((sum, item) => sum + lineItemTotal(item), 0));
  const vatAmount = meta.vatMode === "kleinunternehmer" ? 0 : round2(netTotal * (meta.vatRate / 100));
  const grossTotal = round2(netTotal + vatAmount);

  return { netTotal, vatAmount, grossTotal };
}
