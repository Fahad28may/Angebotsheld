import type { ReactNode } from "react";

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
        {/* Deliberately not wrapped in the scroll-triggered Reveal fade —
            this is above-the-fold content visible on first paint, and a
            fade-in here only delays LCP (the h1 is the LCP element on every
            trade page) for no UX benefit, since there's no scroll to trigger. */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-500">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </div>

        <div id="wizard" className="mt-10 scroll-mt-20">
          {children}
        </div>
      </div>
    </section>
  );
}
