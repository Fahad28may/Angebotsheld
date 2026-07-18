import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export function ExamplePdfShowcase() {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            Made for deutsche Handwerksbetriebe
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink">So sieht Ihr Angebot aus</h2>
          <p className="mt-4 text-ink-soft">
            Echte, mit {siteConfig.name} erstellte Beispielangebote – mit allen Pflichtangaben,
            sauber formatiert und direkt versandfertig.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
          {Object.entries(siteConfig.trades).map(([key, trade], index) => (
            <RevealItem key={key}>
              <div
                className="rounded-md2 border border-line bg-paper p-2.5 shadow-soft transition-transform hover:-translate-y-1"
                style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
              >
                <Image
                  src={`/images/angebot-vorschau-${key}.png`}
                  alt={`Beispiel-Angebot für ${trade.labelPlural}, erstellt mit ${siteConfig.name}`}
                  width={630}
                  height={640}
                  className="w-full rounded-[4px] border border-line"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-ink-soft">{trade.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
