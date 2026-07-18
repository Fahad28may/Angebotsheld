import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { TradeHero } from "@/components/landing/TradeHero";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { TradeCrossLinks } from "@/components/landing/TradeCrossLinks";
import { ExamplePdfSection } from "@/components/landing/ExamplePdfSection";
import { MobileStickyCta } from "@/components/landing/MobileStickyCta";
import { MalerWizard } from "./MalerWizard";

const title = "Angebot erstellen für Maler – kostenloser Generator";
const description =
  "Kostenloser Angebots-Generator für Maler: Wandfläche, Anstriche und Material automatisch berechnen und als PDF-Angebot herunterladen. Ohne Anmeldung, in unter 2 Minuten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/maler-angebot-erstellen` },
  openGraph: { title, description, url: `${siteConfig.url}/maler-angebot-erstellen` },
};

const benefits = [
  {
    title: "Automatische Flächenberechnung",
    description: "Raummaße eingeben – Türen und Fenster werden mit Standardgrößen automatisch abgezogen.",
  },
  {
    title: "Realistische Materialmengen",
    description: "Farbbedarf wird aus Fläche, Anstrichanzahl und Ergiebigkeit pro Liter berechnet.",
  },
  {
    title: "Rechtssicheres PDF",
    description: "Mit allen Pflichtangaben eines Angebots – inklusive USt.-Hinweis oder Kleinunternehmerregelung.",
  },
  {
    title: "In 2 Minuten fertig",
    description: "Vier kurze Schritte statt einer leeren Excel-Tabelle oder einem Word-Dokument von Hand.",
  },
  {
    title: "Frei editierbar",
    description: "Jede Position, jeder Preis und jede Menge lässt sich vor dem Versand noch anpassen.",
  },
  {
    title: "Kein Konto nötig",
    description: "Die kostenlose Version läuft komplett im Browser, ohne Anmeldung und ohne Speicherung auf einem Server.",
  },
];

const steps = [
  { title: "Firmen- und Kundendaten", description: "Ihre Absenderdaten und die Adresse Ihres Kunden eintragen." },
  { title: "Projektdaten", description: "Räume oder Flächen sowie gewünschte Malerarbeiten auswählen." },
  { title: "Preise prüfen", description: "Automatisch berechnete Positionen kontrollieren und anpassen." },
  { title: "PDF herunterladen", description: "Fertiges Angebot direkt als PDF speichern und versenden." },
];

const faqItems = [
  {
    question: "Wie berechnet der Generator die Wandfläche?",
    answer:
      "Sie geben Länge, Breite und Höhe eines Raums sowie die Anzahl der Türen und Fenster ein. Der Generator berechnet daraus die Wandfläche und zieht automatisch Standardgrößen für Türen (1,77 m²) und Fenster (1,5 m²) ab. Alternativ können Sie die Fläche auch direkt in m² eingeben, wenn Sie sie bereits kennen.",
  },
  {
    question: "Welche Materialmenge wird für die Farbe berechnet?",
    answer:
      "Die benötigte Farbmenge ergibt sich aus der zu streichenden Fläche, der Anzahl der Anstriche und der Ergiebigkeit der Farbe (Standard: 7 m² pro Liter und Anstrich). Die Ergiebigkeit können Sie an das tatsächlich verwendete Produkt anpassen.",
  },
  {
    question: "Kann ich eigene Preise hinterlegen?",
    answer:
      "Ja. Alle Preise pro m², pro Stück oder pauschal sind mit sinnvollen Standardwerten vorausgefüllt, lassen sich aber in Schritt 3 jederzeit frei anpassen – ebenso wie Mengen und Bezeichnungen.",
  },
  {
    question: "Ist das erstellte Angebot rechtssicher?",
    answer:
      "Das PDF enthält alle üblichen Bestandteile eines Angebots: Absender- und Empfängerdaten, Angebotsnummer, Datum, Gültigkeitsdauer, eine Positionsliste sowie Netto-, USt.- und Bruttosumme. Für die endgültige rechtliche Prüfung empfehlen wir dennoch einen Blick durch Ihren Steuerberater.",
  },
  {
    question: "Was bedeutet die Kleinunternehmerregelung im Generator?",
    answer:
      "Wenn Sie nach §19 UStG von der Umsatzsteuer befreit sind, wählen Sie in Schritt 3 die Kleinunternehmerregelung aus. Das PDF weist dann automatisch keinen Umsatzsteuerbetrag aus, sondern den gesetzlich vorgeschriebenen Hinweistext.",
  },
  {
    question: "Werden meine Daten gespeichert?",
    answer:
      "Nein. Alle Berechnungen laufen ausschließlich in Ihrem Browser. Ihre Eingaben bleiben während der Sitzung im Zwischenspeicher Ihres Browsers erhalten, damit ein versehentliches Neuladen der Seite sie nicht löscht – es findet keine Übertragung an einen Server statt.",
  },
];

export default function MalerAngebotPage() {
  return (
    <div>
      <TradeHero
        eyebrow="Für Maler & Lackierer"
        title="Angebot für Malerarbeiten in wenigen Minuten erstellen"
        intro="Ob Innenanstrich, Fassade oder Lackierarbeiten: Geben Sie Ihre Raum- oder Flächenmaße ein, wählen Sie die gewünschten Arbeiten aus, und der Generator berechnet Material, Positionen und Preise automatisch. Am Ende steht ein professionelles, druckfertiges PDF-Angebot – ganz ohne Excel-Tabelle oder Anmeldung."
      >
        <MalerWizard />
      </TradeHero>

      <ExamplePdfSection trade="maler" />
      <BenefitsSection title="Warum Maler den AngebotsHeld-Generator nutzen" benefits={benefits} />
      <HowItWorksSection steps={steps} />
      <FaqSection items={faqItems} title="Häufige Fragen von Malerbetrieben" />
      <TradeCrossLinks current="maler" />
      <MobileStickyCta targetId="wizard" sessionStorageKey="angebotsheld:maler" />
    </div>
  );
}
