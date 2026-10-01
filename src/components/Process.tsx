import { Reveal, SectionTitle } from "./ui";
import { sites } from "../data";

const steps = [
  { t: "Consultation", d: "We review the property, your vision, budget and timeline." },
  { t: "Design & Planning", d: "Architecture, interior design, brand requirements and permits." },
  { t: "Preparation", d: "Procurement, scheduling, FF&E, OS&E and site mobilization." },
  { t: "Construction", d: "Skilled crews build or renovate with daily oversight." },
  { t: "Handover", d: "Inspections, final fit-out, walkthrough and opening readiness." },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-parchment/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="How We Work" title="Our Building Process" />

        <div className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-4">
          <div className="absolute top-8 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 150} className="relative text-center">
              <div className="animate-pop relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-cream bg-gradient-to-br from-gold-light to-gold font-display text-2xl font-black text-teal-deep shadow-lg shadow-gold/40">
                {i + 1}
              </div>
              <h3 className="font-display mt-5 text-base font-bold tracking-wide text-teal-brand uppercase">{s.t}</h3>
              <p className="mx-auto mt-2 max-w-[220px] text-sm text-teal-deep/70">{s.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-4 sm:grid-cols-3" from="zoom">
          {sites.slice(1, 4).map((src, i) => (
            <div key={i} className="group overflow-hidden rounded-t-[120px] border-2 border-gold p-1.5">
              <img
                src={src}
                alt="Construction in progress"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-t-[112px] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
