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
    <div className="relative overflow-hidden border-y border-teal-deep/10 bg-parchment py-3.5">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-xs font-semibold tracking-[0.12em] text-teal-brand uppercase md:text-sm">
              {t}
            </span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
        ))}
      </div>
    </div>
  );
}
