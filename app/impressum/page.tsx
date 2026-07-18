import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${siteConfig.name} gemäß § 5 TMG.`,
  alternates: { canonical: `${siteConfig.url}/impressum` },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-ink">Impressum</h1>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-ink">Angaben gemäß § 5 TMG</h2>
        {/* REVIEW: Betreiberangaben durch tatsächliche Firmen-/Einzelunternehmerdaten ersetzen. */}
        <p className="mt-3 text-ink-soft">
          [PLATZHALTER – Firmenname / Vor- und Nachname des Betreibers]
          <br />
          [PLATZHALTER – Straße und Hausnummer]
          <br />
          [PLATZHALTER – Postleitzahl und Ort]
          <br />
          [PLATZHALTER – Land]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Vertreten durch</h2>
        {/* REVIEW: Nur bei juristischen Personen (GmbH, UG etc.) erforderlich. */}
        <p className="mt-3 text-ink-soft">[PLATZHALTER – Name der/des Geschäftsführer(s) bzw. Vertretungsberechtigten]</p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Kontakt</h2>
        <p className="mt-3 text-ink-soft">
          Telefon: [PLATZHALTER]
          <br />
          E-Mail: [PLATZHALTER – z. B. {siteConfig.contactEmail}]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Registereintrag</h2>
        {/* REVIEW: Entfällt, falls kein Handelsregistereintrag vorliegt (z. B. bei Kleingewerbe). */}
        <p className="mt-3 text-ink-soft">
          Eintragung im Handelsregister. [PLATZHALTER – ja/nein]
          <br />
          Registergericht: [PLATZHALTER]
          <br />
          Registernummer: [PLATZHALTER]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Umsatzsteuer-ID</h2>
        {/* REVIEW: Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG, falls vorhanden. */}
        <p className="mt-3 text-ink-soft">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [PLATZHALTER]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p className="mt-3 text-ink-soft">
          [PLATZHALTER – Name]
          <br />
          [PLATZHALTER – Anschrift wie oben]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">EU-Streitschlichtung</h2>
        <p className="mt-3 text-ink-soft">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-500 underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht verpflichtet und nicht
          bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          {/* REVIEW: Satz anpassen, falls eine Teilnahme an Streitbeilegungsverfahren gewünscht ist. */}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Haftung für Inhalte</h2>
        <p className="mt-3 text-ink-soft">
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
          nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Haftung für Links</h2>
        <p className="mt-3 text-ink-soft">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
          haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
          Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">Urheberrecht</h2>
        <p className="mt-3 text-ink-soft">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>

      <p className="mt-10 text-xs text-ink-faint">
        {/* REVIEW: Bitte von einer sachkundigen Person (z. B. Rechtsanwalt/Steuerberater) prüfen lassen, bevor die Seite live geht. */}
        Diese Vorlage ersetzt keine Rechtsberatung. Bitte lassen Sie das Impressum vor der
        Veröffentlichung fachkundig prüfen.
      </p>
    </div>
  );
}
