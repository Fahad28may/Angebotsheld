"use client";

import { track } from "@/lib/analytics";
import type { TradeKey } from "@/lib/siteConfig";

export function VorlageDownloadButton({ trade, href }: { trade: TradeKey; href: string }) {
  return (
    <a
      href={href}
      download
      onClick={() => track({ name: "Vorlage Downloaded", props: { trade } })}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-md2 bg-accent-500 px-6 text-base font-semibold text-paper shadow-soft transition-colors hover:bg-accent-600"
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path
          d="M10 3v10m0 0l-4-4m4 4l4-4M4 16h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Vorlage herunterladen (.docx)
    </a>
  );
}
