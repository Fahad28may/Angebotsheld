import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getArticleBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Ratgeber-Artikel – AngebotsHeld";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const trade = article ? siteConfig.trades[article.trade].label : undefined;
  return renderOgImage(article?.title ?? "Ratgeber", trade);
}
