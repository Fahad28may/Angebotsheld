// Single source of truth for the canonical site URL. Set NEXT_PUBLIC_SITE_URL
// in the environment (Vercel project settings / .env.local) to override the
// fallback below — see .env.example. Every page's metadataBase, canonical
// URL, OpenGraph url, and JSON-LD should read siteConfig.url rather than
// hardcoding a domain.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://angebotsheld24.de").replace(/\/$/, "");

export const siteConfig = {
  name: "AngebotsHeld",
  tagline: "Angebote für Handwerksbetriebe. In 2 Minuten fertig.",
  description:
    "Kostenloser Angebots-Generator für Maler, Fliesenleger und Gerüstbauer. Material, Arbeitszeit und Preise berechnen und als PDF herunterladen – ohne Anmeldung.",
  url: SITE_URL,
  locale: "de-DE",
  currency: "EUR",
  defaultValidityDays: 30,
  contactEmail: "hallo@angebotsheld24.de",
  trades: {
    maler: {
      slug: "maler-angebot-erstellen",
      label: "Maler",
      labelPlural: "Maler und Lackierer",
      shortDescription: "Anstrich, Tapezieren und Lackierarbeiten kalkulieren.",
    },
    fliesenleger: {
      slug: "fliesenleger-angebot-erstellen",
      label: "Fliesenleger",
      labelPlural: "Fliesenleger",
      shortDescription: "Boden- und Wandflächen inklusive Verschnitt kalkulieren.",
    },
    geruestbau: {
      slug: "geruestbau-angebot-erstellen",
      label: "Gerüstbauer",
      labelPlural: "Gerüstbauer",
      shortDescription: "Gerüstfläche, Standzeit und Mietpreise kalkulieren.",
    },
  },
} as const;

export type TradeKey = keyof typeof siteConfig.trades;
