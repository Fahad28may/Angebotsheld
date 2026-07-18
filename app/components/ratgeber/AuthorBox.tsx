import { siteConfig } from "@/lib/siteConfig";

export function AuthorBox() {
  return (
    <div className="not-prose flex items-center gap-3 border-t border-line pt-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 font-serif text-sm font-semibold text-paper">
        AH
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">Das {siteConfig.name} Team</p>
        <p className="text-xs text-ink-faint">
          Wir bauen Werkzeuge für Maler, Fliesenleger und Gerüstbauer im deutschsprachigen Raum.
        </p>
      </div>
    </div>
  );
}
