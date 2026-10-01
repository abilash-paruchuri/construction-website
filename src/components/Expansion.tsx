import { ArrowRight } from "lucide-react";
import { Mandala, Reveal } from "./ui";
import { COMPANY_EXPERIENCE } from "../data";

export default function Expansion() {
  return (
    <section id="development" className="relative overflow-hidden border-y border-gold/40 bg-teal-deep py-20 lg:py-24">
      <Mandala stroke="#ecd079" className="animate-spin-slow pointer-events-none absolute -top-36 -right-24 h-[650px] w-[650px] opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal className="max-w-3xl">
          <p className="font-serif-i text-xl text-gold-light italic">Expanding Horizons</p>
          <h2 className="font-display mt-3 text-3xl font-bold leading-tight text-cream md:text-5xl">From Revitalization to Ground-Up Construction</h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/80 md:text-base">
            With more than a decade of hospitality experience and {COMPANY_EXPERIENCE.completedProjects} completed hotel projects since {COMPANY_EXPERIENCE.since},
            WishNu is expanding into ground-up hotel construction. Our knowledge of building systems,
            franchise standards and guest-ready finishes provides a strong foundation for new developments.
          </p>
          <a href="#contact" className="btn-gold font-display mt-8 inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-bold tracking-wider uppercase">
            Discuss Your New Hotel <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}