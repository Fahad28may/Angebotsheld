import Script from "next/script";

// Cookie-free, no personal data (see /datenschutz §4). Renders nothing when
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN isn't set, so analytics is fully optional —
// the app works identically without it, and lib/analytics.ts's track() calls
// silently no-op when window.plausible never gets defined.
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return <Script strategy="afterInteractive" data-domain={domain} src="https://plausible.io/js/script.js" />;
}
