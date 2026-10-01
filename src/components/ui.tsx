import { useEffect, useRef, useState, type ReactNode } from "react";

type From = "up" | "left" | "right" | "zoom" | "none";

const hiddenMap: Record<From, string> = {
  up: "translate-y-12",
  left: "-translate-x-14",
  right: "translate-x-14",
  zoom: "scale-90",
  none: "",
};

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

export function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: From;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        seen ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${hiddenMap[from]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Tilt({
  children,
  className = "",
  max = 10,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-6px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1900;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function Ornament({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const c = light ? "#ecd079" : "#c79a2b";
  return (
    <svg viewBox="0 0 240 28" className={`h-6 w-52 ${className}`} fill="none">
      <line x1="0" y1="14" x2="92" y2="14" stroke={c} strokeWidth="1.2" />
      <line x1="148" y1="14" x2="240" y2="14" stroke={c} strokeWidth="1.2" />
      <rect x="84" y="10" width="8" height="8" transform="rotate(45 88 14)" fill={c} />
      <rect x="148" y="10" width="8" height="8" transform="rotate(45 152 14)" fill={c} />
      <g fill={c}>
        <path d="M120 4 C112 10 112 18 120 24 C128 18 128 10 120 4Z" />
        <path d="M120 24 C108 22 102 16 101 11 C109 12 116 16 120 24Z" opacity=".75" />
        <path d="M120 24 C132 22 138 16 139 11 C131 12 124 16 120 24Z" opacity=".75" />
      </g>
    </svg>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="font-serif-i text-xl italic tracking-wide text-gold md:text-2xl">{eyebrow}</p>
      <h2
        className={`font-display mt-2 text-3xl font-bold leading-tight md:text-5xl ${
          light ? "text-cream" : "text-teal-brand"
        }`}
      >
        {title}
      </h2>
      <Ornament light={light} className={`mt-4 ${center ? "mx-auto" : ""}`} />
    </Reveal>
  );
}

export function Mandala({ className = "", stroke = "#c79a2b" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" stroke={stroke} strokeWidth="1">
      {[190, 170, 120, 70].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <ellipse key={i} cx="200" cy="120" rx="14" ry="48" transform={`rotate(${i * 15} 200 200)`} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={i}
          d="M200 20 C188 50 188 70 200 90 C212 70 212 50 200 20Z"
          transform={`rotate(${i * 30} 200 200)`}
        />
      ))}
      {Array.from({ length: 36 }).map((_, i) => (
        <circle key={i} cx="200" cy="14" r="3" transform={`rotate(${i * 10} 200 200)`} />
      ))}
    </svg>
  );
}
