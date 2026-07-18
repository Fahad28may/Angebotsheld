import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { getAllArticles } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/Reveal";
import { formatDateDE } from "@/lib/format";

const title = "Ratgeber für Handwerksbetriebe";
const description =
  "Praxisnahe Anleitungen rund um Angebote, Kalkulation und Umsatzsteuer für Maler, Fliesenleger und Gerüstbauer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/ratgeber` },
  openGraph: { title, description, url: `${siteConfig.url}/ratgeber` },
};

export default function RatgeberIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">Ratgeber</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Wissen für Handwerksbetriebe</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Praxisnahe Anleitungen rund um Angebote, Kalkulation und Umsatzsteuer – geschrieben für
          Maler, Fliesenleger und Gerüstbauer.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <RevealItem key={article.slug}>
            <Link
              href={`/ratgeber/${article.slug}`}
              className="group flex h-full flex-col rounded-md2 border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent-300 hover:shadow-panel"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-500">
                {siteConfig.trades[article.trade].label}
              </p>
              <h2 className="mt-2 font-serif text-lg text-ink group-hover:text-accent-600">
                {article.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{article.description}</p>
              <p className="mt-4 text-xs text-ink-faint">
                {formatDateDE(new Date(article.date))} · {article.readingTimeLabel}
              </p>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
