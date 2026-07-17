import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function TradeHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
