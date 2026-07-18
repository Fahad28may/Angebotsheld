import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen",
  description: `Nutzungsbedingungen für den kostenlosen Angebots-Generator von ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/nutzungsbedingungen` },
  robots: { index: true, follow: true },
};

export default function NutzungsbedingungenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-ink">Nutzungsbedingungen</h1>
      <p className="mt-4 text-sm text-ink-faint">Stand: [PLATZHALTER – Datum der letzten Aktualisierung]</p>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-ink">1. Geltungsbereich</h2>
        <p className="mt-3 text-ink-soft">
          Diese Nutzungsbedingungen gelten für die Nutzung der Website und des Angebots-Generators von{" "}
          {siteConfig.name} unter {siteConfig.url} (nachfolgend „der Dienst") durch Gewerbetreibende und
          Handwerksbetriebe. Mit der Nutzung des Dienstes erkennen Sie diese Bedingungen an. Der Dienst
          richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, nicht an Verbraucher.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">2. Leistungsbeschreibung</h2>
        <p className="mt-3 text-ink-soft">
          {siteConfig.name} stellt ein kostenloses Online-Werkzeug zur Erstellung von Angeboten für die
          Gewerke Maler, Fliesenleger und Gerüstbau bereit. Der Dienst berechnet auf Basis Ihrer Eingaben
          Materialmengen, Positionen und Preise und erzeugt daraus ein PDF-Dokument.
        </p>
        {/* REVIEW: Kernaussage zur Gewährleistung — bitte durch Rechtsberatung bestätigen lassen. */}
        <p className="mt-3 text-ink-soft">
          Der Dienst ist ein Kalkulationshilfsmittel und stellt keine Rechts-, Steuer- oder
          betriebswirtschaftliche Beratung dar. Alle berechneten Mengen, Preise und Texte sind
          unverbindliche Vorschläge auf Basis der von Ihnen eingegebenen Daten und hinterlegter
          Standardwerte. Für die Richtigkeit, Vollständigkeit und Rechtskonformität der erzeugten
          Angebote — insbesondere hinsichtlich Pflichtangaben, Umsatzsteuerbehandlung und
          Berechnungsergebnissen — wird keine Gewähr übernommen. Sie sind verpflichtet, alle Angaben vor
          Versand an Ihre Kunden eigenständig zu prüfen.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">3. Nutzungsrechte</h2>
        <p className="mt-3 text-ink-soft">
          Die von Ihnen mithilfe des Dienstes erzeugten PDF-Dokumente gehören Ihnen; Sie dürfen sie
          uneingeschränkt für Ihre geschäftlichen Zwecke verwenden, bearbeiten und an Ihre Kunden
          versenden. Layout, Quellcode und Design des Dienstes selbst bleiben Eigentum von{" "}
          {siteConfig.name} bzw. der jeweiligen Rechteinhaber und dürfen nicht ohne Zustimmung
          vervielfältigt, dekompiliert oder für einen konkurrierenden Dienst nachgebaut werden.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">4. Verfügbarkeit</h2>
        <p className="mt-3 text-ink-soft">
          Wir sind bestrebt, den Dienst dauerhaft verfügbar zu halten, können jedoch keine
          unterbrechungsfreie Verfügbarkeit garantieren. Wartungsarbeiten, technische Störungen oder
          Ausfälle bei vorgelagerten Dienstleistern (z. B. Hosting-Anbieter) können zu vorübergehenden
          Einschränkungen führen. Ein Anspruch auf eine bestimmte Verfügbarkeit besteht nicht, da der
          Dienst kostenlos bereitgestellt wird.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">5. Haftungsbeschränkung</h2>
        {/* REVIEW: Haftungsausschluss-Klausel — Formulierung juristisch prüfen lassen, insbesondere
            hinsichtlich der Grenzen der Haftungsbeschränkung bei Vorsatz und grober Fahrlässigkeit
            sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. */}
        <p className="mt-3 text-ink-soft">
          Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach Maßgabe des
          Produkthaftungsgesetzes. Für leichte Fahrlässigkeit haften wir nur bei der Verletzung einer
          wesentlichen Vertragspflicht (Kardinalpflicht), deren Erfüllung die ordnungsgemäße Nutzung des
          Dienstes überhaupt erst ermöglicht und auf deren Einhaltung Sie regelmäßig vertrauen dürfen;
          in diesem Fall ist die Haftung auf den vorhersehbaren, vertragstypischen Schaden begrenzt.
          Eine darüberhinausgehende Haftung, insbesondere für mittelbare Schäden, entgangenen Gewinn
          oder Schäden aus fehlerhaften Berechnungsergebnissen, die auf unzutreffenden Eingaben durch
          Sie beruhen, ist ausgeschlossen. Die Haftung für Schäden aus der Verletzung des Lebens, des
          Körpers oder der Gesundheit bleibt hiervon unberührt.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">6. Änderungsvorbehalt</h2>
        <p className="mt-3 text-ink-soft">
          Wir behalten uns vor, diese Nutzungsbedingungen sowie den Funktionsumfang des Dienstes
          jederzeit zu ändern oder zu erweitern, sofern dies unter Berücksichtigung Ihrer Interessen
          zumutbar ist. Über wesentliche Änderungen informieren wir durch einen entsprechenden Hinweis
          auf dieser Seite. Die fortgesetzte Nutzung des Dienstes nach Veröffentlichung einer
          geänderten Fassung gilt als Zustimmung zu den geänderten Bedingungen.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">7. Anwendbares Recht</h2>
        <p className="mt-3 text-ink-soft">
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit der
          Nutzung des Dienstes ist, soweit gesetzlich zulässig, der Sitz von {siteConfig.name}{" "}
          ([PLATZHALTER – Ort]).
        </p>
      </section>

      <p className="mt-10 text-xs text-ink-faint">
        {/* REVIEW: Bitte von einer sachkundigen Person (z. B. Rechtsanwalt) prüfen lassen, bevor die
            Seite live geht bzw. bevor ein Paddle-Händlerkonto beantragt wird. */}
        Diese Vorlage ersetzt keine Rechtsberatung. Bitte lassen Sie die Nutzungsbedingungen vor der
        Veröffentlichung fachkundig prüfen.
      </p>
    </div>
  );
}
