const items = ["Kostenlos nutzbar", "Keine Anmeldung", "Keine Cookies", "In 2 Minuten fertig"];

export function TrustBar() {
  return (
    <div className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-5 text-sm text-ink-soft sm:px-6 lg:px-8">
        {items.map((item) => (
          <span key={item} className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-accent-500">
              <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
