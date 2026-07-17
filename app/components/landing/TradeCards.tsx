import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const icons: Record<string, JSX.Element> = {
  maler: (
    <path
      d="M6 4h9l3 3v2H6V4zM9 9h6l1 11H8L9 9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  fliesenleger: (
    <>
      <rect x="4" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="13" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="4" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="13" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  geruestbau: (
    <path
      d="M4 20V6l4-2 4 2 4-2 4 2v14M4 12h16M8 4v16M16 4v16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

export function TradeCards() {
  return (
    <section id="trades" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-serif text-3xl text-ink">Wählen Sie Ihr Gewerk</h2>
        <p className="mt-2 max-w-xl text-ink-soft">
          Jeder Generator ist auf die typischen Positionen und Preislogiken des jeweiligen Gewerks zugeschnitten.
        </p>
      </Reveal>
      <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
        {Object.entries(siteConfig.trades).map(([key, trade]) => (
          <RevealItem key={key}>
            <Link
              href={`/${trade.slug}`}
              className="group flex h-full flex-col rounded-md2 border border-line bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-accent-300 hover:shadow-panel"
            >
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent-500">
                {icons[key]}
              </svg>
              <h3 className="mt-5 font-serif text-xl text-ink group-hover:text-accent-600">
                Angebot für {trade.labelPlural}
              </h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{trade.shortDescription}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-500">
                Generator öffnen
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
