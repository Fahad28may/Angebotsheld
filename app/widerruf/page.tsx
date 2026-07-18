import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Widerruf & Kündigung",
  description: `Widerrufsrecht, Kündigungsbedingungen und Erstattungen für ${siteConfig.name} Pro.`,
  alternates: { canonical: `${siteConfig.url}/widerruf` },
  robots: { index: true, follow: true },
};

export default function WiderrufPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-ink">Widerruf & Kündigung</h1>

      <div className="mt-6 rounded-md2 border border-accent-100 bg-accent-50 p-5">
        <p className="text-sm text-accent-700">
          {siteConfig.name} Pro ist noch nicht verfügbar (aktuell nur als Warteliste). Die folgenden
          Bedingungen beschreiben, wie Widerruf, Kündigung und Erstattung gehandhabt werden, sobald das
          kostenpflichtige Pro-Abonnement startet.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-ink">1. Geltungsbereich</h2>
        <p className="mt-3 text-ink-soft">
          Diese Seite gilt für den kostenpflichtigen {siteConfig.name} Pro-Tarif. Die kostenlose
          Grundversion des Angebots-Generators ist hiervon nicht betroffen — sie kann jederzeit ohne
          Kündigung oder Kosten genutzt werden.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">2. Widerrufsrecht</h2>
        {/* REVIEW: {siteConfig.name} richtet sich laut Nutzungsbedingungen an Unternehmer (§ 14 BGB),
            denen gesetzlich grundsätzlich KEIN Widerrufsrecht nach § 312g BGB zusteht. Das folgende
            14-tägige Widerrufsrecht wird hier freiwillig gewährt (üblich bei vielen SaaS-Anbietern und
            oft von Zahlungsdienstleistern wie Paddle vorausgesetzt). Bitte vor Launch von Pro rechtlich
            prüfen lassen, ob und in welcher Form dies verbindlich zugesichert werden soll, und ob eine
            Unterscheidung zwischen Verbrauchern und Unternehmern in der finalen Fassung nötig ist. */}
        <p className="mt-3 text-ink-soft">
          Unabhängig von der gesetzlichen Regelung räumen wir Ihnen beim Abschluss eines
          Pro-Abonnements ein freiwilliges 14-tägiges Widerrufsrecht ein. Sie können den Vertrag
          innerhalb von 14 Tagen ab Vertragsschluss ohne Angabe von Gründen widerrufen. Zur Wahrung der
          Widerrufsfrist genügt eine formlose Mitteilung (z. B. per E-Mail) an{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent-500 underline">
            {siteConfig.contactEmail}
          </a>{" "}
          vor Ablauf der Frist. Bereits gezahlte Beträge werden in diesem Fall vollständig
          zurückerstattet.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">3. Laufzeit und Kündigung</h2>
        <p className="mt-3 text-ink-soft">
          {siteConfig.name} Pro wird als monatlich kündbares Abonnement angeboten. Es verlängert sich
          automatisch um jeweils einen weiteren Monat, sofern es nicht spätestens einen Tag vor Ablauf
          des jeweiligen Abrechnungsmonats gekündigt wird. Die Kündigung kann formlos über die
          Kontoeinstellungen oder per E-Mail an{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent-500 underline">
            {siteConfig.contactEmail}
          </a>{" "}
          erfolgen. Nach einer Kündigung bleibt der Zugang zu Pro-Funktionen bis zum Ende des bereits
          bezahlten Abrechnungszeitraums bestehen; eine anteilige Erstattung für den restlichen Monat
          erfolgt nicht.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">4. Erstattungen</h2>
        <p className="mt-3 text-ink-soft">
          Über die Widerrufsfrist hinausgehende Erstattungswünsche prüfen wir im Einzelfall,
          insbesondere bei technischen Fehlern, die eine Nutzung des Pro-Tarifs verhindert haben.
          Zahlungsabwicklung und ggf. Rückerstattungen erfolgen über unseren Zahlungsdienstleister
          [PLATZHALTER – Paddle.com, sofern Merchant-of-Record-Modell genutzt wird]; dessen eigene
          Rückerstattungsrichtlinie kann ergänzend gelten.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">5. Kontakt</h2>
        <p className="mt-3 text-ink-soft">
          Für Fragen zu Widerruf, Kündigung oder Erstattung erreichen Sie uns unter{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent-500 underline">
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </section>

      <p className="mt-10 text-xs text-ink-faint">
        {/* REVIEW: Vor Launch von Pro und vor Beantragung eines Paddle-Händlerkontos vollständig durch
            eine sachkundige Person prüfen lassen — insbesondere Ziffer 2. */}
        Diese Vorlage ersetzt keine Rechtsberatung. Bitte lassen Sie diese Seite vor dem Start von{" "}
        {siteConfig.name} Pro fachkundig prüfen.
      </p>
    </div>
  );
}
