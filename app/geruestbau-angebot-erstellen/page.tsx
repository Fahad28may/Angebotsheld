import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { TradeHero } from "@/components/landing/TradeHero";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { TradeCrossLinks } from "@/components/landing/TradeCrossLinks";
import { ExamplePdfSection } from "@/components/landing/ExamplePdfSection";
import { MobileStickyCta } from "@/components/landing/MobileStickyCta";
import { GeruestbauWizard } from "./GeruestbauWizard";

const title = "Angebot erstellen für Gerüstbauer – kostenloser Generator";
const description =
  "Kostenloser Angebots-Generator für Gerüstbauer: Gerüstfläche, Standzeit und Mietpreise automatisch berechnen und als PDF-Angebot herunterladen. Ohne Anmeldung, in unter 2 Minuten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/geruestbau-angebot-erstellen` },
  openGraph: { title, description, url: `${siteConfig.url}/geruestbau-angebot-erstellen` },
};

const benefits = [
  {
    title: "Gerüstfläche direkt berechnet",
    description: "Fassadenlänge × Höhe ergibt automatisch die abzurechnende Gerüstfläche in m².",
  },
  {
    title: "Faire Mietstruktur",
    description: "Auf-/Abbau, Grundmiete und Verlängerungsmiete werden getrennt und nachvollziehbar ausgewiesen.",
  },
  {
    title: "Standzeit im Blick",
    description: "Geben Sie die geplante Standzeit ein – Verlängerungswochen über die Grundmiete hinaus werden automatisch berechnet.",
  },
  {
    title: "Alle Zusatzleistungen erfasst",
    description: "Gerüsttreppen, Schutznetze, Konsolen und Überbrückungen als eigene Positionen.",
  },
  {
    title: "Raum für Sonderkonstruktionen",
    description: "Freitext-Positionen für individuelle Gerüstlösungen, die sich nicht standardmäßig abbilden lassen.",
  },
  {
    title: "In 2 Minuten fertig",
    description: "Vier kurze Schritte statt einer leeren Excel-Tabelle oder einem Word-Dokument von Hand.",
  },
];

const steps = [
  { title: "Firmen- und Kundendaten", description: "Ihre Absenderdaten und die Adresse Ihres Kunden eintragen." },
  { title: "Projektdaten", description: "Gerüstart, Maße, Standzeit und Zusatzleistungen festlegen." },
  { title: "Preise prüfen", description: "Automatisch berechnete Positionen kontrollieren und anpassen." },
  { title: "PDF herunterladen", description: "Fertiges Angebot direkt als PDF speichern und versenden." },
];

const faqItems = [
  {
    question: "Wie wird die Gerüstfläche berechnet?",
    answer:
      "Die Gerüstfläche ergibt sich aus der Fassadenlänge multipliziert mit der Fassadenhöhe. Sie ist die Grundlage für Auf-/Abbau-, Grundmiete- und Verlängerungsmietpreise, die jeweils pro m² berechnet werden.",
  },
  {
    question: "Was passiert, wenn die Standzeit länger als die Grundmiete dauert?",
    answer:
      "Die Grundmiete deckt standardmäßig 4 Wochen ab (anpassbar). Überschreitet Ihre geplante Standzeit diesen Zeitraum, berechnet der Generator automatisch eine zusätzliche Verlängerungsmiete für die überschüssigen Wochen, aufgerundet auf volle Wochen.",
  },
  {
    question: "Kann ich verschiedene Lastklassen berücksichtigen?",
    answer:
      "Ja, wählen Sie die passende Lastklasse gemäß DIN EN 12811 aus. Sie erscheint informativ in der Positionsbezeichnung für Auf- und Abbau; die Preise passen Sie bei Bedarf entsprechend Ihrer Kalkulation an.",
  },
  {
    question: "Wie erfasse ich Sonderkonstruktionen wie Überdachungen oder Erker?",
    answer:
      "Nutzen Sie die freien Sonderpositionen in Schritt 2. Dort können Sie beliebige Bezeichnungen, Mengen, Einheiten und Preise für individuelle Gerüstlösungen hinzufügen, die sich nicht standardmäßig abbilden lassen.",
  },
  {
    question: "Sind Schutznetze und Gerüsttreppen im Grundpreis enthalten?",
    answer:
      "Nein, diese Leistungen sind optionale Zusatzpositionen, die Sie einzeln aktivieren und mit eigenen Preisen versehen können – so bleibt die Kalkulation transparent für Ihren Kunden.",
  },
  {
    question: "Ist das erstellte Angebot rechtssicher?",
    answer:
      "Das PDF enthält alle üblichen Bestandteile eines Angebots: Absender- und Empfängerdaten, Angebotsnummer, Datum, Gültigkeitsdauer, eine Positionsliste sowie Netto-, USt.- und Bruttosumme. Für die endgültige rechtliche Prüfung empfehlen wir dennoch einen Blick durch Ihren Steuerberater.",
  },
];

export default function GeruestbauAngebotPage() {
  return (
    <div>
      <TradeHero
        eyebrow="Für Gerüstbauer"
        title="Angebot für Gerüstbauarbeiten in wenigen Minuten erstellen"
        intro="Fassadenmaße eingeben, Gerüstart und Standzeit festlegen – der Generator berechnet Gerüstfläche, Auf-/Abbau, Grundmiete und eine mögliche Verlängerungsmiete automatisch. Am Ende steht ein professionelles, druckfertiges PDF-Angebot – ganz ohne Excel-Tabelle oder Anmeldung."
      >
        <GeruestbauWizard />
      </TradeHero>

      <ExamplePdfSection trade="geruestbau" />
      <BenefitsSection title="Warum Gerüstbauer den AngebotsHeld-Generator nutzen" benefits={benefits} />
      <HowItWorksSection steps={steps} />
      <FaqSection items={faqItems} title="Häufige Fragen von Gerüstbaubetrieben" />
      <TradeCrossLinks current="geruestbau" />
      <MobileStickyCta targetId="wizard" sessionStorageKey="angebotsheld:geruestbau" />
    </div>
  );
}
