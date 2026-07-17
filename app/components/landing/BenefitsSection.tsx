import { Reveal, RevealGroup, RevealItem } from "./Reveal";

export interface Benefit {
  title: string;
  description: string;
}

export function BenefitsSection({ benefits, title }: { benefits: Benefit[]; title: string }) {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-serif text-3xl text-ink">{title}</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <RevealItem key={benefit.title}>
              <div className="h-full rounded-md2 border border-line p-6">
                <h3 className="font-serif text-lg text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
