import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { TrustBar } from "@/components/landing/TrustBar";
import { TradeCards } from "@/components/landing/TradeCards";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ExamplePdfShowcase } from "@/components/landing/ExamplePdfShowcase";
import { FaqSection } from "@/components/landing/FaqSection";

const title = "AngebotsHeld – Angebote für Maler, Fliesenleger & Gerüstbauer";
const description = siteConfig.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: siteConfig.url },
  openGraph: { title, description, url: siteConfig.url },
};

const steps = [
  { title: "Gewerk wählen", description: "Maler, Fliesenleger oder Gerüstbauer – jeweils mit passender Kalkulationslogik." },
  { title: "Angaben machen", description: "Kunden-, Firmen- und Projektdaten in einem kurzen, geführten Formular eingeben." },
  { title: "Preise prüfen", description: "Automatisch berechnete Positionen kontrollieren und bei Bedarf anpassen." },
  { title: "PDF herunterladen", description: "Fertiges, professionelles Angebot direkt versandfertig speichern." },
];

const faqItems = [
  {
    question: "Ist AngebotsHeld wirklich kostenlos?",
    answer:
      "Ja. Die Grundfunktionen – Kalkulation und PDF-Export mit kleinem Hinweis-Footer – sind dauerhaft kostenlos nutzbar, ohne Anmeldung und ohne versteckte Kosten.",
  },
  {
    question: "Für welche Gewerke ist der Generator geeignet?",
    answer:
      "Aktuell für Maler, Fliesenleger und Gerüstbauer. Jeder Generator berücksichtigt die typischen Positionen, Materialberechnungen und Preislogiken des jeweiligen Gewerks.",
  },
  {
    question: "Muss ich mich registrieren?",
    answer:
      "Nein. Sie können sofort loslegen. Ihre Eingaben bleiben während der Sitzung im Zwischenspeicher Ihres Browsers erhalten, es findet keine Übertragung an einen Server statt.",
  },
  {
    question: "Was ist der Unterschied zwischen Free und Pro?",
    answer:
      "Die kostenlose Version enthält einen kleinen Hinweis-Footer auf dem PDF und ist auf Einzelangebote ausgelegt. Die geplante Pro-Version wird u. a. Ihr eigenes Logo, gespeicherte Vorlagen und den Wegfall des Hinweis-Footers bieten – mehr dazu auf der Preise-Seite.",
  },
  {
    question: "Sind meine Daten sicher?",
    answer:
      "Alle Berechnungen laufen in Ihrem Browser – Ihre Angebotsdaten werden nie an unsere Server übertragen. Es werden keine Cookies gesetzt. Wir nutzen lediglich anonyme, cookie-freie Nutzungsstatistiken (Umami), die keine Rückschlüsse auf einzelne Personen zulassen. Details finden Sie auf unserer Datenschutz-Seite.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-line bg-white">
        {/* Not wrapped in Reveal — above-the-fold, and the h1 is the LCP
            element on this page; a scroll-triggered fade only delays it. */}
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            Für Maler, Fliesenleger & Gerüstbauer
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Angebote, die Ihre Kunden überzeugen. In 2 Minuten fertig.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Material, Arbeitszeit und Preise automatisch berechnen und als professionelles PDF-Angebot
            herunterladen – kostenlos, ohne Anmeldung, direkt im Browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#trades"
              className="inline-flex h-12 items-center justify-center rounded-md2 bg-accent-500 px-6 text-base font-semibold text-paper shadow-soft transition-colors hover:bg-accent-600"
            >
              Jetzt Angebot erstellen
            </Link>
            <Link href="/preise" className="text-sm font-semibold text-ink-soft hover:text-accent-500">
              Preise ansehen →
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />
      <TradeCards />
      <ExamplePdfShowcase />
      <HowItWorksSection steps={steps} />
      <FaqSection items={faqItems} title="Häufige Fragen" />
    </div>
  );
}
