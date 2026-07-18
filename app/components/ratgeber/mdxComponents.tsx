import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { slugifyHeading } from "@/lib/content";
import { ArticleCTA } from "./ArticleCTA";

function plainText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return plainText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2 id={slugifyHeading(plainText(children))} className="mt-10 font-serif text-2xl text-ink scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugifyHeading(plainText(children))} className="mt-8 font-serif text-xl text-ink scroll-mt-24">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-4 text-base leading-relaxed text-ink-soft">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-soft">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-soft">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-2 border-accent-300 pl-4 italic text-ink-soft">{children}</blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-accent-500 underline underline-offset-2 hover:text-accent-600">
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-accent-50 px-1.5 py-0.5 text-sm text-accent-700">{children}</code>
  ),
  table: ({ children }) => (
    <div className="not-prose mt-4 overflow-x-auto rounded-md2 border border-line">
      <table className="w-full min-w-[480px] border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line bg-paper px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-faint">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-b border-line/70 px-3 py-2 text-ink-soft">{children}</td>,
  ArticleCTA,
};
