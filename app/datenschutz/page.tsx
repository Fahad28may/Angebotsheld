import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${siteConfig.name}: keine Cookies, anonyme Nutzungsstatistiken.`,
  alternates: { canonical: `${siteConfig.url}/datenschutz` },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-ink">Datenschutzerklärung</h1>

      <div className="mt-6 rounded-md2 border border-accent-100 bg-accent-50 p-5">
        <p className="font-semibold text-accent-700">Keine Cookies.</p>
        <p className="mt-1 text-sm text-accent-700">
          {siteConfig.name} verzichtet vollständig auf Cookies — auch für die anonymen
          Nutzungsstatistiken in Abschnitt 4 unten wird kein einziges Cookie gesetzt. Die von Ihnen
          eingegebenen Angebotsdaten werden ausschließlich in Ihrem Browser verarbeitet und nicht an
          unsere Server übertragen.
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
        <p className="mt-3 text-ink-soft">
          Optional können Sie über die Checkbox „Firmendaten auf diesem Gerät speichern" in Schritt 1
          Ihre eigenen Firmendaten (Name, Rechtsform, Anschrift, Steuernummer, Kontaktdaten) dauerhaft
          in Ihrem Browser hinterlegen (sogenannter Local Storage), damit sie beim nächsten Angebot
          automatisch vorausgefüllt werden. Diese Speicherung erfolgt ausschließlich, wenn Sie die
          Checkbox aktiv ankreuzen, bleibt ausschließlich auf Ihrem Gerät und wird zu keinem Zeitpunkt
          an unsere Server übertragen. Sie können die gespeicherten Daten jederzeit über den Link
          „Daten löschen" im entsprechenden Hinweis wieder entfernen, oder indem Sie den Local Storage
          Ihres Browsers für diese Website leeren.
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
        <h2 className="font-serif text-xl text-ink">4. Anonyme Nutzungsstatistiken (Umami)</h2>
        {/* REVIEW: Bitte prüfen, ob mit dem konkret gewählten Umami-Hosting (Umami Cloud, Betreiber
            Umami Software Inc.) noch ein Auftragsverarbeitungsvertrag (AVV) abzuschließen ist, und ob
            die Formulierung zur berechtigten Interessen-Abwägung (Art. 6 Abs. 1 lit. f DSGVO) trägt. */}
        <p className="mt-3 text-ink-soft">
          Um zu verstehen, welche Seiten und Funktionen genutzt werden, setzen wir den
          Webanalyse-Dienst Umami ein, gehostet als Umami Cloud. Umami verzichtet vollständig auf
          Cookies und jegliche Form von Fingerprinting, erhebt keine personenbezogenen Daten und
          ermöglicht keine Nachverfolgung einzelner Personen über Websites hinweg. Erfasst werden
          ausschließlich aggregierte, anonyme Kennzahlen wie aufgerufene Seiten, ungefähre Herkunft
          (Land, auf Basis der IP-Adresse, die nicht gespeichert wird) und ausgelöste Ereignisse (z. B.
          „PDF heruntergeladen"). Es werden keine individuellen Nutzungsprofile erstellt und keine
          Daten mit Dritten geteilt. Eine Zuordnung zu Ihrer Person ist nicht möglich. Die
          Datenverarbeitung erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f
          DSGVO) an einer bedarfsgerechten Gestaltung unserer Website. Weil keine Cookies gesetzt und
          keine personenbezogenen Daten verarbeitet werden, ist nach § 25 TTDSG keine Einwilligung
          erforderlich — deshalb zeigen wir keinen Cookie-Banner an. Weitere Informationen:{" "}
          <a
            href="https://umami.is/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-500 underline"
          >
            umami.is/privacy
          </a>
          .
        </p>
        <p className="mt-3 text-ink-soft">
          Neben Umami setzen wir keine Marketing- oder Social-Media-Pixel und keine sonstigen
          Analyse-Tools (z. B. Google Analytics) ein.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">5. Warteliste (Preise-Seite)</h2>
        {/* REVIEW: Bitte prüfen, ob mit Resend ein Auftragsverarbeitungsvertrag (AVV) abzuschließen ist
            und ob der Serverstandort (Resend verarbeitet u. a. in den USA) einen Hinweis auf
            Standardvertragsklauseln (SCC) nach Art. 44 ff. DSGVO erfordert. */}
        <p className="mt-3 text-ink-soft">
          Wenn Sie sich auf unserer Preise-Seite oder nach dem PDF-Download freiwillig für die
          Warteliste zur Pro-Version eintragen, verwenden wir Ihre E-Mail-Adresse ausschließlich, um
          Sie über die Verfügbarkeit zu informieren. Die Verarbeitung erfolgt über unseren
          E-Mail-Dienstleister Resend (Resend Inc.). Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6
          Abs. 1 lit. a DSGVO. Sie können der Speicherung Ihrer E-Mail-Adresse jederzeit formlos über{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent-500 underline">
            {siteConfig.contactEmail}
          </a>{" "}
          widersprechen; wir löschen den Eintrag dann umgehend.
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
