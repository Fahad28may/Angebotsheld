"use client";

import dynamic from "next/dynamic";
import { useState, type ReactElement, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuoteDocument } from "@/lib/pdf/QuoteDocument";
import type { BaseQuoteState } from "@/lib/types";

const PDFViewer = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center rounded-md2 border border-line bg-white text-sm text-ink-faint">
      PDF-Vorschau wird geladen …
    </div>
  ),
}) as unknown as (props: {
  width?: number | string;
  height?: number | string;
  showToolbar?: boolean;
  style?: React.CSSProperties;
  children: ReactElement;
}) => JSX.Element;

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
) as unknown as (props: {
  document: ReactElement;
  fileName?: string;
  children: (params: { loading: boolean }) => ReactNode;
}) => JSX.Element;

interface Step4Props {
  quote: BaseQuoteState;
  tradeLabel: string;
  onBack: () => void;
  onReset: () => void;
}

export function Step4Preview({ quote, tradeLabel, onBack, onReset }: Step4Props) {
  const [confirmReset, setConfirmReset] = useState(false);
  const fileName = `Angebot-${quote.meta.quoteNumber || "Entwurf"}.pdf`;

  return (
    <div>
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl text-ink">Vorschau & Download</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Prüfen Sie Ihr Angebot und laden Sie es als PDF herunter.
            </p>
          </div>
          <PDFDownloadLink document={<QuoteDocument quote={quote} tradeLabel={tradeLabel} />} fileName={fileName}>
            {({ loading }) => (
              <Button type="button" size="lg" disabled={loading}>
                {loading ? "PDF wird erstellt …" : "PDF herunterladen"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        <div className="mt-6 overflow-hidden rounded-md2 border border-line">
          <PDFViewer width="100%" height={640} showToolbar={false} style={{ border: "none" }}>
            <QuoteDocument quote={quote} tradeLabel={tradeLabel} />
          </PDFViewer>
        </div>
      </Card>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <Button type="button" variant="ghost" onClick={onBack}>
          Zurück
        </Button>
        {confirmReset ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-soft">Neues Angebot beginnen? Ihre Eingaben gehen verloren.</span>
            <Button type="button" variant="secondary" onClick={() => setConfirmReset(false)}>
              Abbrechen
            </Button>
            <Button type="button" onClick={onReset}>
              Bestätigen
            </Button>
          </div>
        ) : (
          <Button type="button" variant="secondary" onClick={() => setConfirmReset(true)}>
            Neues Angebot
          </Button>
        )}
      </div>
    </div>
  );
}
