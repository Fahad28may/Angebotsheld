import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/Reveal";

const title = "Angebotsvorlagen kostenlos für Handwerksbetriebe";
const description =
  "Kostenlose Angebotsvorlagen als Word-Dokument für Maler, Fliesenleger und Gerüstbauer – direkt herunterladen und ausfüllen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/vorlagen` },
  openGraph: { title, description, url: `${siteConfig.url}/vorlagen` },
};

const vorlagenSlugs: Record<string, string> = {
  maler: "maler-angebotsvorlage",
  fliesenleger: "fliesenleger-angebotsvorlage",
  geruestbau: "geruestbau-angebotsvorlage",
};

export default function VorlagenIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">Vorlagen</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Angebotsvorlagen zum Herunterladen</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Kostenlose Word-Vorlagen für Ihr nächstes Angebot – oder lassen Sie es direkt automatisch
          berechnen.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
        {Object.entries(siteConfig.trades).map(([key, trade]) => (
          <RevealItem key={key}>
            <Link
              href={`/vorlagen/${vorlagenSlugs[key]}`}
              className="group flex h-full flex-col rounded-md2 border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent-300 hover:shadow-panel"
            >
              <h2 className="font-serif text-lg text-ink group-hover:text-accent-600">
                {trade.label}-Angebotsvorlage
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{trade.shortDescription}</p>
              <span className="mt-4 text-sm font-semibold text-accent-500">Vorlage ansehen →</span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
