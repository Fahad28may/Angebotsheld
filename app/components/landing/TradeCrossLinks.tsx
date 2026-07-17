import Link from "next/link";
import { siteConfig, type TradeKey } from "@/lib/siteConfig";
import { Reveal } from "./Reveal";

export function TradeCrossLinks({ current }: { current: TradeKey }) {
  const others = Object.entries(siteConfig.trades).filter(([key]) => key !== current);

  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-serif text-2xl text-ink">Weitere Angebots-Generatoren</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map(([key, trade]) => (
            <Link
              key={key}
              href={`/${trade.slug}`}
              className="group rounded-md2 border border-line p-6 transition-colors hover:border-accent-300"
            >
              <h3 className="font-serif text-lg text-ink group-hover:text-accent-600">
                Angebot für {trade.labelPlural} erstellen
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{trade.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
