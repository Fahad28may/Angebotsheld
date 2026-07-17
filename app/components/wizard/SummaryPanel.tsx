"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { LineItem, QuoteMeta } from "@/lib/types";
import { calculateTotals, lineItemTotal } from "@/lib/calculations/totals";
import { formatCurrency, formatNumber } from "@/lib/format";
import { AnimatedCurrency } from "./AnimatedNumber";

interface SummaryPanelProps {
  lineItems: LineItem[];
  meta: QuoteMeta;
  tradeLabel: string;
}

export function SummaryPanel({ lineItems, meta, tradeLabel }: SummaryPanelProps) {
  const totals = calculateTotals(lineItems, meta);

  return (
    <div className="rounded-md2 border border-line bg-white p-6 shadow-panel">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-500">{tradeLabel}-Angebot</p>
      <h2 className="mt-1 font-serif text-xl text-ink">Live-Zusammenfassung</h2>

      <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {lineItems.length === 0 ? (
            <p className="text-sm text-ink-faint">
              Sobald Sie Angaben machen, erscheinen hier Ihre Positionen.
            </p>
          ) : (
            lineItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="min-w-0 truncate text-ink-soft">{item.description}</span>
                <span className="shrink-0 tabular-nums text-ink">
                  {formatCurrency(lineItemTotal(item))}
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-ink-soft">
          <span>Zwischensumme (netto)</span>
          <AnimatedCurrency value={totals.netTotal} />
        </div>
        <div className="flex justify-between text-ink-soft">
          <span>
            {meta.vatMode === "kleinunternehmer" ? "USt. gem. §19 UStG" : `MwSt. ${formatNumber(meta.vatRate)}%`}
          </span>
          <AnimatedCurrency value={totals.vatAmount} />
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-semibold text-ink">
          <span>Gesamtbetrag</span>
          <AnimatedCurrency value={totals.grossTotal} />
        </div>
      </div>
    </div>
  );
}

export function MobileSummaryBar({ lineItems, meta, tradeLabel }: SummaryPanelProps) {
  const [open, setOpen] = useState(false);
  const totals = calculateTotals(lineItems, meta);

  return (
    <div className="lg:hidden">
      <div className="h-20" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3"
          aria-expanded={open}
        >
          <span className="text-sm text-ink-soft">Gesamtbetrag</span>
          <span className="flex items-center gap-2">
            <AnimatedCurrency value={totals.grossTotal} className="text-base font-semibold text-ink" />
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 text-ink-faint"
            >
              <path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
        </button>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-line px-4"
            >
              <p className="pt-3 text-xs font-semibold uppercase tracking-wide text-accent-500">
                {tradeLabel}-Angebot
              </p>
              <div className="max-h-52 space-y-2 overflow-y-auto py-3">
                {lineItems.length === 0 ? (
                  <p className="text-sm text-ink-faint">Noch keine Positionen.</p>
                ) : (
                  lineItems.map((item) => (
                    <div key={item.id} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="min-w-0 truncate text-ink-soft">{item.description}</span>
                      <span className="shrink-0 tabular-nums text-ink">
                        {formatCurrency(lineItemTotal(item))}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-1.5 border-t border-line pb-4 pt-3 text-sm">
                <div className="flex justify-between text-ink-soft">
                  <span>Zwischensumme (netto)</span>
                  <span className="tabular-nums">{formatCurrency(totals.netTotal)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>
                    {meta.vatMode === "kleinunternehmer" ? "USt. gem. §19 UStG" : `MwSt. ${formatNumber(meta.vatRate)}%`}
                  </span>
                  <span className="tabular-nums">{formatCurrency(totals.vatAmount)}</span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
