import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const tradeLinks = Object.values(siteConfig.trades);

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <span className="font-serif text-lg font-semibold text-ink">{siteConfig.name}</span>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Angebots-Generatoren</h3>
            <ul className="mt-3 space-y-2">
              {tradeLinks.map((trade) => (
                <li key={trade.slug}>
                  <Link
                    href={`/${trade.slug}`}
                    className="text-sm text-ink-soft transition-colors hover:text-accent-500"
                  >
                    {trade.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Produkt</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/preise" className="text-sm text-ink-soft transition-colors hover:text-accent-500">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/ratgeber" className="text-sm text-ink-soft transition-colors hover:text-accent-500">
                  Ratgeber
                </Link>
              </li>
              <li>
                <Link href="/vorlagen" className="text-sm text-ink-soft transition-colors hover:text-accent-500">
                  Vorlagen
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-sm text-ink-soft transition-colors hover:text-accent-500"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Rechtliches</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/impressum" className="text-sm text-ink-soft transition-colors hover:text-accent-500">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-sm text-ink-soft transition-colors hover:text-accent-500">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/nutzungsbedingungen"
                  className="text-sm text-ink-soft transition-colors hover:text-accent-500"
                >
                  Nutzungsbedingungen
                </Link>
              </li>
              <li>
                <Link href="/widerruf" className="text-sm text-ink-soft transition-colors hover:text-accent-500">
                  Widerruf
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.</p>
          <p>Keine Cookies.</p>
        </div>
      </div>
    </footer>
  );
}
