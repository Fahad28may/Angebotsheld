import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${siteConfig.name}: keine Cookies, kein Tracking.`,
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-ink">Datenschutzerklärung</h1>

      <div className="mt-6 rounded-md2 border border-accent-100 bg-accent-50 p-5">
        <p className="font-semibold text-accent-700">Keine Cookies, kein Tracking.</p>
        <p className="mt-1 text-sm text-accent-700">
          {siteConfig.name} verzichtet in der kostenlosen Version vollständig auf Tracking- oder
          Marketing-Cookies. Die von Ihnen eingegebenen Angebotsdaten werden ausschließlich in Ihrem
          Browser verarbeitet und nicht an unsere Server übertragen.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-ink">1. Verantwortlicher</h2>
        {/* REVIEW: Betreiberangaben durch tatsächliche Daten ersetzen, konsistent mit dem Impressum. */}
        <p className="mt-3 text-ink-soft">
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          <br />
          [PLATZHALTER – Firmenname / Name]
          <br />
          [PLATZHALTER – Anschrift]
          <br />
          E-Mail: [PLATZHALTER – z. B. {siteConfig.contactEmail}]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">2. Wie wir Ihre Angebotsdaten verarbeiten</h2>
        <p className="mt-3 text-ink-soft">
          Die Angaben, die Sie in den Angebots-Generatoren machen (z. B. Firmen-, Kunden- und
          Projektdaten), werden ausschließlich lokal in Ihrem Browser berechnet und zu einem PDF
          zusammengeführt. Es findet keine Übertragung dieser Daten an unsere Server statt. Damit ein
          versehentliches Neuladen der Seite Ihre Eingaben nicht löscht, speichert Ihr Browser die
          Daten temporär im sogenannten Session-Storage. Diese Daten werden automatisch gelöscht, sobald
          Sie den Browser-Tab schließen, und verlassen zu keinem Zeitpunkt Ihr Gerät.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">3. Hosting und Server-Log-Dateien</h2>
        {/* REVIEW: Konkreten Hosting-Anbieter eintragen und dessen Auftragsverarbeitungsvertrag (AVV) referenzieren. */}
        <p className="mt-3 text-ink-soft">
          Diese Website wird bei [PLATZHALTER – Hosting-Anbieter, z. B. Vercel Inc. oder ein
          EU-Rechenzentrum] gehostet. Wie bei praktisch jedem Website-Aufruf erfasst der Hosting-Anbieter
          aus technischen Gründen automatisch bestimmte Informationen in sogenannten Server-Log-Dateien,
          die Ihr Browser automatisch übermittelt (z. B. IP-Adresse, Datum und Uhrzeit der Anfrage,
          aufgerufene Seite, verwendeter Browser). Diese Daten werden nicht mit anderen Datenquellen
          zusammengeführt, dienen ausschließlich der technischen Bereitstellung und Sicherheit der
          Website und werden nicht für Tracking- oder Analysezwecke ausgewertet.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">4. Keine Cookies, keine Analyse- oder Marketing-Tools</h2>
        <p className="mt-3 text-ink-soft">
          Wir setzen keine Analyse-Tools (z. B. Google Analytics), keine Marketing- oder Social-Media-Pixel
          und keine Cookies ein, die eine Einwilligung nach § 25 TTDSG erfordern würden. Aus diesem Grund
          zeigen wir Ihnen auch keinen Cookie-Banner an.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">5. Warteliste (Preise-Seite)</h2>
        {/* REVIEW: Absatz nur relevant, solange die Warteliste aktiv ist; ggf. um Double-Opt-in / Versanddienstleister ergänzen. */}
        <p className="mt-3 text-ink-soft">
          Wenn Sie sich auf unserer Preise-Seite freiwillig für die Warteliste zur Pro-Version eintragen,
          verwenden wir Ihre E-Mail-Adresse ausschließlich, um Sie über die Verfügbarkeit zu informieren.
          Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. [PLATZHALTER –
          eingesetzten Versanddienstleister und Speicherort ergänzen, sobald die Warteliste technisch
          angebunden ist.]
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">6. Ihre Rechte</h2>
        <p className="mt-3 text-ink-soft">
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
          Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
          Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser
          Daten. Ebenso haben Sie ein Recht auf Einschränkung der Verarbeitung, ein Recht auf
          Datenübertragbarkeit sowie ein Widerspruchsrecht gegen die Verarbeitung. Hierzu sowie zu
          weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit über die im
          Impressum angegebene Adresse an uns wenden.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">7. Beschwerderecht bei der Aufsichtsbehörde</h2>
        <p className="mt-3 text-ink-soft">
          Ihnen steht zudem ein Beschwerderecht bei der zuständigen Aufsichtsbehörde für den Datenschutz
          zu. [PLATZHALTER – zuständige Landesdatenschutzbehörde je nach Sitz des Verantwortlichen
          eintragen.]
        </p>
      </section>

      <p className="mt-10 text-xs text-ink-faint">
        {/* REVIEW: Bitte von einer sachkundigen Person (z. B. Datenschutzbeauftragter/Rechtsanwalt) prüfen lassen. */}
        Diese Vorlage ersetzt keine Rechtsberatung. Bitte lassen Sie die Datenschutzerklärung vor der
        Veröffentlichung fachkundig prüfen, insbesondere sobald Hosting-Anbieter oder Warteliste final
        feststehen.
      </p>
    </div>
  );
}
