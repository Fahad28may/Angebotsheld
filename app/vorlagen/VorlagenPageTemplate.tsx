import Image from "next/image";
import Link from "next/link";
import { siteConfig, type TradeKey } from "@/lib/siteConfig";
import { getAllArticles } from "@/lib/content";
import { Reveal } from "@/components/landing/Reveal";
import { VorlageDownloadButton } from "@/components/vorlagen/VorlageDownloadButton";

interface VorlagenCopy {
  intro: string;
  bullets: string[];
}

const copy: Record<TradeKey, VorlagenCopy> = {
  maler: {
    intro:
      "Kostenlose Angebotsvorlage für Malerbetriebe als Word-Dokument (.docx): Absender- und Kundenblock, Angebotsnummer, eine Positionsliste mit Beispielzeilen für Innenanstrich und Material sowie eine fertige Netto-/MwSt.-/Brutto-Summe. Herunterladen, mit Ihren Firmendaten ausfüllen, fertig.",
    bullets: [
      "Struktur nach gängiger Angebotspraxis für Malerbetriebe",
      "Beispielpositionen für Anstrich, Material und Abklebearbeiten",
      "Sauber formatiert, direkt druckfertig",
    ],
  },
  fliesenleger: {
    intro:
      "Kostenlose Angebotsvorlage für Fliesenlegerbetriebe als Word-Dokument (.docx): Absender- und Kundenblock, Angebotsnummer, eine Positionsliste mit Beispielzeilen für Verlegung und Material inklusive Verschnitt sowie eine fertige Netto-/MwSt.-/Brutto-Summe.",
    bullets: [
      "Struktur nach gängiger Angebotspraxis für Fliesenlegerbetriebe",
      "Beispielpositionen für Verlegung, Fliesenmaterial und Verfugen",
      "Sauber formatiert, direkt druckfertig",
    ],
  },
  geruestbau: {
    intro:
      "Kostenlose Angebotsvorlage für Gerüstbaubetriebe als Word-Dokument (.docx): Absender- und Kundenblock, Angebotsnummer, eine Positionsliste mit Beispielzeilen für Auf-/Abbau und Grundmiete sowie eine fertige Netto-/MwSt.-/Brutto-Summe.",
    bullets: [
      "Struktur nach gängiger Angebotspraxis für Gerüstbaubetriebe",
      "Beispielpositionen für Auf-/Abbau, Grundmiete und Zubehör",
      "Sauber formatiert, direkt druckfertig",
    ],
  },
};

export function VorlagenPageTemplate({ trade }: { trade: TradeKey }) {
  const tradeInfo = siteConfig.trades[trade];
  const tradeCopy = copy[trade];
  const docxHref = `/vorlagen/${trade}-angebotsvorlage.docx`;
  const previewSrc = `/vorlagen/${trade}-vorschau.png`;
  const relatedArticle = getAllArticles().find((article) => article.trade === trade);

  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">
              Kostenlose Vorlage
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">
              {tradeInfo.label}-Angebotsvorlage kostenlos
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{tradeCopy.intro}</p>
            <ul className="mt-6 space-y-2">
              {tradeCopy.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-ink-soft">
                  <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-accent-500">
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <VorlageDownloadButton trade={trade} href={docxHref} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-md2 border border-line bg-paper p-4 shadow-panel [transform:rotate(1deg)]">
              <Image
                src={previewSrc}
                alt={`Vorschau der ${tradeInfo.label}-Angebotsvorlage`}
                width={800}
                height={620}
                className="w-full rounded-[6px] border border-line"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-2xl text-ink">
              Vorlage ausfüllen – oder in 2 Minuten generieren lassen →
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-soft">
              Die Vorlage müssen Sie von Hand ausfüllen und rechnen. Der {siteConfig.name}-Generator
              berechnet Flächen, Material und Preise automatisch und erstellt direkt ein fertiges PDF.
            </p>
            <Link
              href={`/${tradeInfo.slug}`}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md2 border border-accent-500 px-6 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50"
            >
              Jetzt automatisch generieren →
            </Link>
          </Reveal>
        </div>
      </section>

      {relatedArticle ? (
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-500">
                Passend zum Thema
              </p>
              <Link
                href={`/ratgeber/${relatedArticle.slug}`}
                className="mt-2 block font-serif text-lg text-ink hover:text-accent-600"
              >
                {relatedArticle.title} →
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}
    </div>
  );
}
