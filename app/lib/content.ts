import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { TradeKey } from "@/lib/siteConfig";

const RATGEBER_DIR = path.join(process.cwd(), "content", "ratgeber");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-01-15"
  trade: TradeKey;
}

export interface ArticleSummary extends ArticleFrontmatter {
  slug: string;
  readingTimeMinutes: number;
  readingTimeLabel: string;
}

export interface ArticleWithContent extends ArticleSummary {
  content: string;
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] ?? c)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readingTimeLabel(minutes: number): string {
  return `${Math.max(1, Math.ceil(minutes))} Min. Lesezeit`;
}

function articleSlugs(): string[] {
  if (!fs.existsSync(RATGEBER_DIR)) return [];
  return fs
    .readdirSync(RATGEBER_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllArticles(): ArticleSummary[] {
  return articleSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(RATGEBER_DIR, `${slug}.mdx`), "utf8");
      const { data, content } = matter(raw);
      const frontmatter = data as ArticleFrontmatter;
      const stats = readingTime(content);
      return {
        ...frontmatter,
        slug,
        readingTimeMinutes: stats.minutes,
        readingTimeLabel: readingTimeLabel(stats.minutes),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleSlugs(): string[] {
  return articleSlugs();
}

export function getArticleBySlug(slug: string): ArticleWithContent | null {
  const filePath = path.join(RATGEBER_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTimeMinutes: stats.minutes,
    readingTimeLabel: readingTimeLabel(stats.minutes),
  };
}

export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1]!.length as 2 | 3;
    const text = match[2]!.trim();
    headings.push({ id: slugifyHeading(text), text, level });
  }
  return headings;
}
