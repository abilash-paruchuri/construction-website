import { Building2, Paintbrush, ClipboardCheck, Hammer, HardHat, DoorOpen } from "lucide-react";
import { Reveal, SectionTitle, Tilt, Mandala } from "./ui";

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
      <Mandala className="animate-spin-slow absolute -top-60 left-1/2 w-[1100px] -translate-x-1/2 opacity-[0.08]" stroke="#ecd079" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="What We Do" title="Our Construction Services" light />

        <div className="mt-14 grid gap-7 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 140} from="zoom">
              <Tilt max={14}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-br from-teal-brand/80 to-teal-deep p-7 shadow-xl shadow-black/30">
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gold/10 transition-all duration-700 group-hover:scale-[3]" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-teal-deep text-gold-light transition-transform duration-700 group-hover:rotate-[360deg]">
                    <s.icon size={28} />
                  </div>
                  <h3 className="font-display relative mt-5 text-lg font-bold tracking-wide text-cream">{s.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-cream/75">{s.text}</p>
                  <div className="relative mt-5 h-0.5 w-10 bg-gold transition-all duration-500 group-hover:w-full" />
                  <span className="font-display absolute right-5 bottom-3 text-5xl font-black text-gold/10">
                    0{i + 1}
                  </span>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
