import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "preise",
    "impressum",
    "datenschutz",
    ...Object.values(siteConfig.trades).map((trade) => trade.slug),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}/${route}`.replace(/\/$/, "") || siteConfig.url,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : Object.values(siteConfig.trades).some((t) => t.slug === route) ? 0.9 : 0.5,
  }));
}
