import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/Reveal";
import { WaitlistForm } from "./WaitlistForm";

const title = "Preise";
const description = "AngebotsHeld ist in der Grundversion kostenlos. Die Pro-Version mit eigenem Logo und Vorlagen folgt in Kürze.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/preise` },
};

const freeFeatures = [
  "Alle drei Angebots-Generatoren (Maler, Fliesenleger, Gerüstbauer)",
  "Automatische Material- und Preisberechnung",
  "Unbegrenzte Angebote pro Sitzung",
  "PDF-Download mit kleinem Hinweis-Footer",
  "Keine Anmeldung, keine Cookies, kein Tracking",
];

const proFeatures = [
  "Eigenes Firmenlogo auf dem PDF",
  "Kein Hinweis-Footer",
  "Gespeicherte Vorlagen & Kundendaten",
  "Angebote als Konto-Historie abrufbar",
  "Priorisierter Support",
];

export default function PreisePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">Preise</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Einfach, transparent, ohne Überraschungen</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Starten Sie kostenlos. Wenn Sie mehr wollen – eigenes Logo, gespeicherte Vorlagen, kein
          Hinweis-Footer – informieren wir Sie, sobald AngebotsHeld Pro verfügbar ist.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
        <RevealItem>
          <div className="flex h-full flex-col rounded-md2 border border-line bg-white p-8 shadow-soft">
            <h2 className="font-serif text-2xl text-ink">Free</h2>
            <p className="mt-1 text-sm text-ink-soft">Für einzelne Angebote, sofort einsatzbereit.</p>
            <p className="mt-6 font-serif text-4xl text-ink">0 €</p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500">
                    <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="flex h-full flex-col rounded-md2 border-2 border-accent-500 bg-white p-8 shadow-panel">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-ink">Pro</h2>
              <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-600">
                Demnächst verfügbar
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">Für Betriebe, die regelmäßig Angebote versenden.</p>
            <p className="mt-6 font-serif text-4xl text-ink">Preis folgt</p>
            <ul className="mt-6 flex-1 space-y-3">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500">
                    <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-3 text-sm font-medium text-ink">Jetzt informieren, wenn Pro startet:</p>
              <WaitlistForm />
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </div>
  );
}
