export const siteConfig = {
  name: "AngebotsHeld",
  tagline: "Angebote für Handwerksbetriebe. In 2 Minuten fertig.",
  description:
    "Kostenloser Angebots-Generator für Maler, Fliesenleger und Gerüstbauer. Material, Arbeitszeit und Preise berechnen und als PDF herunterladen – ohne Anmeldung.",
  url: "https://www.angebotsheld.de",
  locale: "de-DE",
  currency: "EUR",
  defaultValidityDays: 30,
  contactEmail: "hallo@angebotsheld.de",
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
