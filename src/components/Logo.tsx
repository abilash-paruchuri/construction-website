export function LogoMark({ className = "" }: { className?: string }) {
  const gold = "#c79a2b";
  const teal = "#0e4b5c";
  return (
    <svg viewBox="0 0 200 215" className={className} fill="none">
      {/* outer arc */}
      <path d="M10 120 A90 90 0 0 1 190 120" stroke={gold} strokeWidth="1.5" opacity=".7" />
      {/* sun rays */}
      {Array.from({ length: 13 }).map((_, i) => {
        const a = Math.PI + (i / 12) * Math.PI;
        const x1 = 100 + 32 * Math.cos(a);
        const y1 = 78 + 32 * Math.sin(a);
        const x2 = 100 + 47 * Math.cos(a);
        const y2 = 78 + 47 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="3" strokeLinecap="round" />;
      })}
      <circle cx="100" cy="78" r="26" fill="#e2b744" />
      {/* shield */}
      <path
        d="M32 96 H168 V140 Q168 184 100 210 Q32 184 32 140 Z"
        fill="rgba(199,154,43,0.12)"
        stroke={gold}
        strokeWidth="1.6"
      />
      {/* arch */}
      <path
        d="M66 170 V120 Q66 92 100 68 Q134 92 134 120 V170"
        fill="#fbf5e3"
        stroke={teal}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M80 170 V126 Q80 106 100 92 Q120 106 120 126 V170" stroke={teal} strokeWidth="2.5" />
      {/* finial */}
      <path d="M100 50 C93 60 93 67 100 72 C107 67 107 60 100 50Z" fill={teal} />
      <circle cx="100" cy="62" r="2.4" fill="#ecd079" />
      {/* base */}
      <line x1="56" y1="170" x2="144" y2="170" stroke={teal} strokeWidth="5" strokeLinecap="round" />
      {/* lotus */}
      <g fill={gold}>
        <path d="M100 128 C93 136 93 146 100 154 C107 146 107 136 100 128Z" />
        <path d="M100 154 C90 152 84 146 83 140 C91 141 97 146 100 154Z" opacity=".75" />
        <path d="M100 154 C110 152 116 146 117 140 C109 141 103 146 100 154Z" opacity=".75" />
      </g>
      {/* bottom icons */}
      <circle cx="78" cy="190" r="4" fill={gold} opacity=".7" />
      <circle cx="122" cy="190" r="4" fill={gold} opacity=".7" />
    </svg>
  );
}

export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div className="flex items-center gap-3">
      <LogoMark className={big ? "h-20 w-20" : "h-12 w-12"} />
      <div className="leading-none">
        <div
          className={`font-display font-black tracking-wide ${big ? "text-4xl" : "text-2xl"} ${
            light ? "text-cream" : "text-teal-brand"
          }`}
        >
          Wish<span className="text-gold">N</span>u
        </div>
        <div
          className={`font-display mt-1 font-semibold tracking-[0.18em] ${big ? "text-[11px]" : "text-[8.5px]"} ${
            light ? "text-gold-light" : "text-teal-soft"
          }`}
        >
          CONSTRUCTION &amp; DEVELOPMENT
        </div>
      </div>
    </div>
  );
}
