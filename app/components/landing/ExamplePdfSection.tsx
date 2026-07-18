import Image from "next/image";
import { siteConfig, type TradeKey } from "@/lib/siteConfig";
import { Reveal } from "./Reveal";

export function ExamplePdfSection({ trade }: { trade: TradeKey }) {
  const tradeInfo = siteConfig.trades[trade];

  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">
            Made for deutsche Handwerksbetriebe
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink">So sieht Ihr Angebot aus</h2>
          <p className="mt-4 max-w-md text-ink-soft">
            Ein echtes, mit dem {siteConfig.name}-Generator erstelltes Beispielangebot für{" "}
            {tradeInfo.labelPlural} – mit allen Pflichtangaben, sauber formatiert und direkt
            versandfertig.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-md2 border border-line bg-paper p-3 shadow-panel [transform:rotate(-1deg)] transition-transform hover:rotate-0">
            <Image
              src={`/images/angebot-vorschau-${trade}.png`}
              alt={`Beispiel-Angebot für ${tradeInfo.labelPlural}, erstellt mit ${siteConfig.name}`}
              width={630}
              height={640}
              className="w-full rounded-[6px] border border-line"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
