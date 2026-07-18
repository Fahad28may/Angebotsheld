import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getArticleSlugs } from "@/lib/content";

const vorlagenSlugs = ["maler-angebotsvorlage", "fliesenleger-angebotsvorlage", "geruestbau-angebotsvorlage"];

export default function sitemap(): MetadataRoute.Sitemap {
  const tradeRoutes: string[] = Object.values(siteConfig.trades).map((trade) => trade.slug);
  const ratgeberRoutes = getArticleSlugs().map((slug) => `ratgeber/${slug}`);
  const vorlagenRoutes = vorlagenSlugs.map((slug) => `vorlagen/${slug}`);

  const staticRoutes = [
    "",
    "preise",
    "ratgeber",
    "vorlagen",
    "impressum",
    "datenschutz",
    "nutzungsbedingungen",
    "widerruf",
  ];

  const routes = [...staticRoutes, ...tradeRoutes, ...ratgeberRoutes, ...vorlagenRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}/${route}`.replace(/\/$/, "") || siteConfig.url,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : tradeRoutes.includes(route) ? 0.9 : 0.5,
  }));
}
