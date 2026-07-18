"use client";

import type { TradeKey } from "@/lib/siteConfig";

// Cookie-free analytics via Umami Cloud (see components/Analytics.tsx for the
// script tag, loaded only when NEXT_PUBLIC_UMAMI_WEBSITE_ID is set). This
// helper is intentionally safe to call before that script has loaded, or
// when analytics is disabled entirely (missing env var, ad blocker, etc.):
// window.umami is always checked before use, so every call below is a
// harmless no-op in that case rather than a thrown error.
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

type AnalyticsEvent =
  | { name: "Wizard Started"; props: { trade: TradeKey } }
  | { name: "Wizard Step Completed"; props: { trade: TradeKey; step: number } }
  | { name: "PDF Downloaded"; props: { trade: TradeKey } }
  | { name: "Waitlist Signup"; props: { source: string } }
  | { name: "Vorlage Downloaded"; props: { trade: TradeKey } };

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined" || typeof window.umami?.track !== "function") return;
  window.umami.track(event.name, event.props);
}
