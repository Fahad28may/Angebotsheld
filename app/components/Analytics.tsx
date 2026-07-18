import Script from "next/script";

// Cookie-free, no personal data (see /datenschutz §4). Renders nothing when
// NEXT_PUBLIC_UMAMI_WEBSITE_ID isn't set, so analytics is fully optional —
// the app works identically without it, and lib/analytics.ts's track() calls
// silently no-op when window.umami never gets defined.
export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  return <Script strategy="afterInteractive" data-website-id={websiteId} src="https://cloud.umami.is/script.js" />;
}
