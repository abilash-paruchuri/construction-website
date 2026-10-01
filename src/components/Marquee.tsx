const items = [
  "New Hotel Construction",
  "Hotel Renovation",
  "Property Reopenings",
  "PIP Renovations",
  "Construction Completion",
  "Targeted Upgrades",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y-4 border-double border-gold bg-teal-deep py-4">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-sm font-semibold tracking-[0.25em] text-gold-light uppercase md:text-base">
              {t}
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="currentColor">
              <path d="M12 2 C9 7 9 13 12 18 C15 13 15 7 12 2Z" />
              <path d="M12 18 C6 17 2 13 2 9 C7 9 11 12 12 18Z" opacity=".7" />
              <path d="M12 18 C18 17 22 13 22 9 C17 9 13 12 12 18Z" opacity=".7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
