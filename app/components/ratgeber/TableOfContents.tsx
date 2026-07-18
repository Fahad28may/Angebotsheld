import type { Heading } from "@/lib/content";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav aria-label="Inhaltsverzeichnis" className="not-prose rounded-md2 border border-line bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-500">Inhalt</p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a href={`#${heading.id}`} className="text-ink-soft transition-colors hover:text-accent-500">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
