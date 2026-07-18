import Link from "next/link";
import { siteConfig, type TradeKey } from "@/lib/siteConfig";

export function ArticleCTA({ trade }: { trade: TradeKey }) {
  const tradeInfo = siteConfig.trades[trade];

  return (
    <div className="not-prose my-8 rounded-md2 border border-accent-200 bg-accent-50 p-6">
      <p className="font-serif text-lg text-ink">
        Angebot für {tradeInfo.labelPlural} in 2 Minuten erstellen
      </p>
      <p className="mt-1 text-sm text-ink-soft">{tradeInfo.shortDescription}</p>
      <Link
        href={`/${tradeInfo.slug}`}
        className="mt-4 inline-flex h-11 items-center justify-center rounded-md2 bg-accent-500 px-5 text-sm font-semibold text-paper shadow-soft transition-colors hover:bg-accent-600"
      >
        Jetzt kostenlos Angebot erstellen →
      </Link>
    </div>
  );
}
