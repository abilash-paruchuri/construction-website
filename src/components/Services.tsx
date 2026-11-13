import { Building2, Paintbrush, ClipboardCheck, Hammer, HardHat, DoorOpen } from "lucide-react";
import { Reveal, SectionTitle } from "./ui";

const services = [
  {
    icon: Building2,
    title: "Ground-Up Hotel Construction",
    text: "Our expanding service offering brings more than a decade of hospitality experience to new hotel development, from planning to guest-ready finishes.",
  },
  {
    icon: Paintbrush,
    title: "Full Renovations & Conversions",
    text: "Complete property overhauls, including plumbing, electrical, HVAC, fire safety, rooms, roofing and interior/exterior finishes.",
  },
  {
    icon: ClipboardCheck,
    title: "PIP & Partial Renovations",
    text: "Property Improvement Plans and targeted upgrades that address franchise standards, guest-room quality and property competitiveness.",
  },
  {
    icon: DoorOpen,
    title: "Closed-Property Reopenings",
    text: "Renovations, essential systems, permits, FF&E and OS&E coordinated to bring closed hotel properties back into operation.",
  },
  {
    icon: HardHat,
    title: "Incomplete Construction Completion",
    text: "Taking over hotels with existing foundations and framing, completing utilities, approvals, construction and fit-out through opening.",
  },
  {
    icon: Hammer,
    title: "Minor Upgrades & Maintenance",
    text: "Focused repairs, room refreshes, lighting, paint and property upkeep that maintain quality without requiring a complete overhaul.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-teal-deep py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="What We Do" title="Our Construction Services" light />

        <div className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <article className="group h-full border-t border-white/20 py-7 transition-colors hover:border-gold-light">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold tracking-widest text-gold-light">0{i + 1}</span>
                  <s.icon size={20} strokeWidth={1.6} className="text-white/75 transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
