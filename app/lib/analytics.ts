"use client";

import type { TradeKey } from "@/lib/siteConfig";

// Cookie-free analytics via Plausible (see components/Analytics.tsx for the
// script tag, loaded only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set). This
// helper is intentionally safe to call before that script has loaded, or
// when analytics is disabled entirely (missing env var, ad blocker, etc.):
// window.plausible is always checked before use, so every call below is a
// harmless no-op in that case rather than a thrown error.
type PlausibleFn = (event: string, options?: { props?: Record<string, string | number> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

type AnalyticsEvent =
  | { name: "Wizard Started"; props: { trade: TradeKey } }
  | { name: "Wizard Step Completed"; props: { trade: TradeKey; step: number } }
  | { name: "PDF Downloaded"; props: { trade: TradeKey } }
  | { name: "Waitlist Signup"; props: { source: string } }
  | { name: "Vorlage Downloaded"; props: { trade: TradeKey } };

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(event.name, { props: event.props });
}
