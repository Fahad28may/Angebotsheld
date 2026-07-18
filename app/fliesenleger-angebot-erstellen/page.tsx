import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { TradeHero } from "@/components/landing/TradeHero";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { TradeCrossLinks } from "@/components/landing/TradeCrossLinks";
import { ExamplePdfSection } from "@/components/landing/ExamplePdfSection";
import { MobileStickyCta } from "@/components/landing/MobileStickyCta";
import { FliesenlegerWizard } from "./FliesenlegerWizard";

const title = "Angebot erstellen für Fliesenleger – kostenloser Generator";
const description =
  "Kostenloser Angebots-Generator für Fliesenleger: Fläche, Verschnitt und Material automatisch berechnen und als PDF-Angebot herunterladen. Ohne Anmeldung, in unter 2 Minuten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/fliesenleger-angebot-erstellen` },
  openGraph: { title, description, url: `${siteConfig.url}/fliesenleger-angebot-erstellen` },
};

const benefits = [
  {
    title: "Verschnitt automatisch eingerechnet",
    description: "Standardmäßig 10% Verschnitt auf die Fliesenmenge – frei anpassbar an Format und Verlegeart.",
  },
  {
    title: "Formatabhängige Verlegepreise",
    description: "Mosaik und Großformat schlagen sich automatisch im Arbeitspreis pro m² nieder.",
  },
  {
    title: "Alle Gewerke einer Baustelle",
    description: "Von Altbelag entfernen über Abdichtung bis Sockelleisten – alles in einer Position erfasst.",
  },
  {
    title: "Material oder Regie",
    description: "Fliesen können vom Kunden gestellt oder von Ihnen kalkuliert werden – ein Klick genügt.",
  },
  {
    title: "In 2 Minuten fertig",
    description: "Vier kurze Schritte statt einer leeren Excel-Tabelle oder einem Word-Dokument von Hand.",
  },
  {
    title: "Kein Konto nötig",
    description: "Die kostenlose Version läuft komplett im Browser, ohne Anmeldung und ohne Speicherung auf einem Server.",
  },
];

const steps = [
  { title: "Firmen- und Kundendaten", description: "Ihre Absenderdaten und die Adresse Ihres Kunden eintragen." },
  { title: "Projektdaten", description: "Fläche, Fliesenformat und gewünschte Arbeiten auswählen." },
  { title: "Preise prüfen", description: "Automatisch berechnete Positionen kontrollieren und anpassen." },
  { title: "PDF herunterladen", description: "Fertiges Angebot direkt als PDF speichern und versenden." },
];

const faqItems = [
  {
    question: "Wie wird der Verschnitt berechnet?",
    answer:
      "Auf die reine Verlegefläche wird ein Verschnittzuschlag aufgerechnet (Standard: 10%), um Zuschnitt und Bruch abzudecken. Bei Diagonalverlegung oder komplexen Mustern empfiehlt sich ein höherer Wert, den Sie frei anpassen können.",
  },
  {
    question: "Warum ändert sich der Verlegepreis je nach Fliesenformat?",
    answer:
      "Mosaikfliesen und großformatige Fliesen erfordern mehr Zeit pro m² als Standardformate – der Generator passt den Grundpreis automatisch mit einem Formatzuschlag an, den Sie in den Projektdaten sehen können.",
  },
  {
    question: "Kann ich Material weglassen, wenn der Kunde die Fliesen mitbringt?",
    answer:
      "Ja, aktivieren Sie in Schritt 2 die Option „Fliesen werden vom Kunden gestellt“. Der Materialposten für Fliesen entfällt dann automatisch, Kleber und Fugenmasse werden weiterhin berechnet, falls die entsprechenden Arbeiten ausgewählt sind.",
  },
  {
    question: "Sind Abdichtungsarbeiten im Nassbereich enthalten?",
    answer:
      "Abdichtung ist eine eigene, optionale Position in Schritt 2. Aktivieren Sie sie für Bäder und andere Nassbereiche gemäß den geltenden Regelwerken – der Preis pro m² lässt sich frei anpassen.",
  },
  {
    question: "Wie gebe ich Silikonfugen und Sockelleisten an?",
    answer:
      "Beide Positionen werden nach Laufmetern statt nach Fläche berechnet. Tragen Sie die Länge in Metern sowie den gewünschten Preis pro Laufmeter ein – der Generator übernimmt die Berechnung.",
  },
  {
    question: "Ist das erstellte Angebot rechtssicher?",
    answer:
      "Das PDF enthält alle üblichen Bestandteile eines Angebots: Absender- und Empfängerdaten, Angebotsnummer, Datum, Gültigkeitsdauer, eine Positionsliste sowie Netto-, USt.- und Bruttosumme. Für die endgültige rechtliche Prüfung empfehlen wir dennoch einen Blick durch Ihren Steuerberater.",
  },
];

export default function FliesenlegerAngebotPage() {
  return (
    <div>
      <TradeHero
        eyebrow="Für Fliesenleger"
        title="Angebot für Fliesenarbeiten in wenigen Minuten erstellen"
        intro="Boden oder Wand, Standardformat oder Mosaik: Geben Sie die Fläche ein, wählen Sie die gewünschten Arbeiten aus, und der Generator berechnet Material inklusive Verschnitt, Arbeitszeit und Preise automatisch. Am Ende steht ein professionelles, druckfertiges PDF-Angebot – ganz ohne Excel-Tabelle oder Anmeldung."
      >
        <FliesenlegerWizard />
      </TradeHero>

      <ExamplePdfSection trade="fliesenleger" />
      <BenefitsSection title="Warum Fliesenleger den AngebotsHeld-Generator nutzen" benefits={benefits} />
      <HowItWorksSection steps={steps} />
      <FaqSection items={faqItems} title="Häufige Fragen von Fliesenlegerbetrieben" />
      <TradeCrossLinks current="fliesenleger" />
      <MobileStickyCta targetId="wizard" sessionStorageKey="angebotsheld:fliesenleger" />
    </div>
  );
}
