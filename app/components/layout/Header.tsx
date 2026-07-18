import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const tradeLinks = Object.values(siteConfig.trades);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md2 bg-accent-500 font-serif text-sm font-semibold text-paper">
            AH
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Hauptnavigation">
          {tradeLinks.map((trade) => (
            <Link
              key={trade.slug}
              href={`/${trade.slug}`}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-500"
            >
              {trade.label}
            </Link>
          ))}
          <Link
            href="/ratgeber"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-500"
          >
            Ratgeber
          </Link>
          <Link
            href="/preise"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-accent-500"
          >
            Preise
          </Link>
        </nav>

        <Link
          href="/#trades"
          className="rounded-md2 bg-accent-500 px-4 py-2 text-sm font-semibold text-paper shadow-soft transition-transform hover:bg-accent-600 active:scale-[0.98]"
        >
          Kostenlos starten
        </Link>
      </div>
    </header>
  );
}
