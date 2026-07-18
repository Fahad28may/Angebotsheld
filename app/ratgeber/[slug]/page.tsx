import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { siteConfig } from "@/lib/siteConfig";
import { getArticleBySlug, getArticleSlugs, extractHeadings } from "@/lib/content";
import { formatDateDE } from "@/lib/format";
import { mdxComponents } from "@/components/ratgeber/mdxComponents";
import { TableOfContents } from "@/components/ratgeber/TableOfContents";
import { AuthorBox } from "@/components/ratgeber/AuthorBox";
import { ArticleCTA } from "@/components/ratgeber/ArticleCTA";
import { Reveal } from "@/components/landing/Reveal";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${siteConfig.url}/ratgeber/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function RatgeberArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const headings = extractHeadings(article.content);
  const tradeInfo = siteConfig.trades[article.trade];
  const url = `${siteConfig.url}/ratgeber/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: `${siteConfig.name} Team` },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: url,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* JSON.stringify output is escaped to prevent a `</script>`-style
          sequence in article content from breaking out of this script tag.
          eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">
          {tradeInfo.label}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">{article.title}</h1>
        <p className="mt-4 text-xs text-ink-faint">
          {formatDateDE(new Date(article.date))} · {article.readingTimeLabel}
        </p>
      </Reveal>

      {headings.length >= 3 ? (
        <div className="mt-8">
          <TableOfContents headings={headings} />
        </div>
      ) : null}

      <article className="mt-8">
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>

      <div className="mt-10">
        <ArticleCTA trade={article.trade} />
      </div>

      <div className="mt-10">
        <AuthorBox />
      </div>
    </div>
  );
}
