import { Reveal, SectionTitle } from "./ui";

const steps = [
  { t: "Consultation", d: "We review the property, your vision, budget and timeline." },
  { t: "Design & Planning", d: "Architecture, interior design, brand requirements and permits." },
  { t: "Preparation", d: "Procurement, scheduling, FF&E, OS&E and site mobilization." },
  { t: "Construction", d: "Skilled crews build or renovate with daily oversight." },
  { t: "Handover", d: "Inspections, final fit-out, walkthrough and opening readiness." },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-parchment/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="How We Work" title="Our Building Process" />

        <div className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 90} className="relative border-t border-teal-deep/20 py-5 text-left">
              <div className="animate-pop text-sm font-semibold text-teal-soft">
                {i + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-teal-brand">{s.t}</h3>
              <p className="mt-2 text-sm leading-6 text-teal-deep/70">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
