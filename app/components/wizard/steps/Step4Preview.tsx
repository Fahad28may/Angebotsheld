"use client";

import dynamic from "next/dynamic";
import { useState, type ReactElement, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { QuoteDocument } from "@/lib/pdf/QuoteDocument";
import { track } from "@/lib/analytics";
import { useWaitlistSignup } from "@/lib/hooks/useWaitlistSignup";
import type { BaseQuoteState } from "@/lib/types";
import type { TradeKey } from "@/lib/siteConfig";

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
  // Note: PDFDownloadLink pre-generates its blob as soon as it mounts (so
  // the download is instant once clicked) — its `loading` render-prop flag
  // therefore goes true -> false on page load too, with no user action
  // involved. Only `onClick` (which only fires from a real click, and only
  // once the button is enabled/blob ready) is a reliable "user downloaded
  // this" signal.
  onClick?: () => void;
  children: (params: { loading: boolean }) => ReactNode;
}) => JSX.Element;

interface Step4Props {
  quote: BaseQuoteState;
  tradeLabel: string;
  tradeKey: TradeKey;
  onBack: () => void;
  onReset: () => void;
}

export function Step4Preview({ quote, tradeLabel, tradeKey, onBack, onReset }: Step4Props) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const fileName = `Angebot-${quote.meta.quoteNumber || "Entwurf"}.pdf`;

  const handleDownloadComplete = () => {
    setDownloaded(true);
    track({ name: "PDF Downloaded", props: { trade: tradeKey } });
  };

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
          <PDFDownloadLink
            document={<QuoteDocument quote={quote} tradeLabel={tradeLabel} />}
            fileName={fileName}
            onClick={handleDownloadComplete}
          >
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

        <p className="mt-3 text-xs text-ink-faint">
          Alle Berechnungen ohne Gewähr. Bitte prüfen Sie alle Angaben vor Versand.
        </p>
      </Card>

      <AnimatePresence>{downloaded ? <PostDownloadWaitlistPrompt /> : null}</AnimatePresence>

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

function PostDownloadWaitlistPrompt() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { submit, status, errorMessage } = useWaitlistSignup("pdf-download");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    void submit(email, honeypot);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="mt-6 rounded-md2 border border-accent-100 bg-accent-50 p-5">
        {status === "submitted" ? (
          <p className="text-sm font-medium text-accent-700">
            Danke! Wir melden uns, sobald AngebotsHeld Pro verfügbar ist.
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-accent-700">
              Angebote speichern & mit eigenem Logo? Pro-Warteliste →
            </p>
            <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row" noValidate>
              <input
                type="text"
                name="companyWebsite"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute h-0 w-0 opacity-0"
              />
              <Input
                type="email"
                required
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={status === "error"}
                aria-label="E-Mail-Adresse für die Pro-Warteliste"
                className="h-10 min-w-0 flex-1 bg-white sm:max-w-xs"
              />
              <Button type="submit" size="md" disabled={status === "submitting"}>
                {status === "submitting" ? "Wird gesendet …" : "Auf Warteliste setzen"}
              </Button>
            </form>
            {status === "error" && errorMessage ? (
              <p className="mt-2 text-xs text-error">{errorMessage}</p>
            ) : null}
          </>
        )}
      </div>
    </motion.div>
  );
}
