import { RevealGroup, RevealItem, Reveal } from "./Reveal";

export interface HowItWorksStep {
  title: string;
  description: string;
}

export function HowItWorksSection({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-serif text-3xl text-ink">So funktioniert es</h2>
      </Reveal>
      <RevealGroup className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <RevealItem key={step.title}>
            <span className="font-serif text-4xl text-accent-300">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
