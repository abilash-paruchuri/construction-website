import { ArrowRight } from "lucide-react";
import Hero3D from "./Hero3D";
import { Mandala } from "./ui";
import { COMPANY_EXPERIENCE } from "../data";

const words = ["Modern", "Hotels.", "Timeless", "Craft."];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[720px] w-[720px] opacity-[0.10]">
          <Mandala className="animate-spin-slow h-full w-full" />
        </div>
        <div className="absolute -bottom-52 -left-52 h-[600px] w-[600px] opacity-[0.12]">
          <Mandala className="animate-spin-rev h-full w-full" stroke="#0e4b5c" />
        </div>
        <div className="animate-glow absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-gold-light/40 blur-3xl" />
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rotate-45 bg-gold/70"
            style={{
              left: `${8 + i * 9}%`,
              bottom: `${5 + ((i * 17) % 30)}%`,
              animation: `drift ${7 + (i % 4)}s ease-in infinite`,
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2">
        {/* copy */}
        <div>
          <p className="font-serif-i animate-pop text-xl text-gold italic md:text-2xl">
            Hotel Construction &amp; Renovation
          </p>
          <h1 id="home-title" tabIndex={-1} className="hero-word font-display mt-4 text-[clamp(4.5rem,8vw,7.5rem)] leading-none font-black tracking-tight text-teal-brand outline-none" style={{ animationDelay: "0.1s" }}>
            Wish<span className="text-gold">N</span>u
            <span className="mt-3 block text-[10px] font-semibold tracking-[0.28em] sm:text-xs">
              CONSTRUCTION &amp; DEVELOPMENT
            </span>
          </h1>
          <p className="font-display mt-7 text-3xl leading-[1.2] font-bold text-teal-brand sm:text-4xl xl:text-[2.6rem] [perspective:800px]">
            {words.map((w, i) => (
              <span
                key={i}
                className={`hero-word mr-3 ${i >= 2 ? "text-gold-grad" : ""}`}
                style={{ animationDelay: `${0.25 + i * 0.12}s` }}
              >
                {w}
              </span>
            ))}
          </p>
          <p
            className="hero-word mt-6 max-w-xl text-base leading-relaxed text-teal-deep/80 md:text-lg"
            style={{ animationDelay: "1.1s" }}
          >
            Revitalizing hotels since {COMPANY_EXPERIENCE.since}, from complete renovations and property reopenings to our next chapter
            in ground-up construction.
          </p>

          <div className="hero-word mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "1.3s" }}>
            <a
              href="#contact"
              className="btn-gold font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold tracking-widest uppercase"
            >
              Start Your Project <ArrowRight size={16} />
            </a>
            <a
              href="#projects"
              className="font-display inline-flex items-center gap-2 px-2 py-4 text-xs font-bold tracking-widest text-teal-brand uppercase transition-colors hover:text-gold"
            >
              Explore Our Projects <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* 3D arch */}
        <div className="relative mx-auto w-full max-w-[520px]">
          {/* sun behind arch */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2">
            <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <polygon
                  key={i}
                  points="100,0 106,34 94,34"
                  fill="#c79a2b"
                  transform={`rotate(${i * 15} 100 100)`}
                />
              ))}
            </svg>
            <div className="absolute inset-[22%] rounded-full bg-gradient-to-b from-gold-light to-gold shadow-[0_0_60px_10px_rgba(236,208,121,0.7)]" />
          </div>

          <div className="relative rounded-t-[999px] bg-gradient-to-b from-gold-light via-gold to-gold p-[5px] shadow-2xl shadow-teal-deep/40">
            <div className="rounded-t-[999px] bg-cream p-[5px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-gradient-to-b from-teal-deep via-teal-brand to-teal-soft">
                {/* inner glow */}
                <div className="animate-glow absolute top-[8%] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-light/40 blur-3xl" />
                <Mandala className="animate-spin-slow absolute top-[3%] left-1/2 w-[90%] -translate-x-1/2 opacity-25" stroke="#ecd079" />
                <Hero3D />
                <div className="font-display absolute bottom-3 left-0 w-full text-center text-[10px] tracking-[0.35em] text-gold-light/80 uppercase">
                  Move your cursor to explore
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
