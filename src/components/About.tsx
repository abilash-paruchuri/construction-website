import { Building2, ClipboardCheck, DoorOpen, HardHat } from "lucide-react";
import { Counter, Reveal, SectionTitle, Tilt } from "./ui";
import PropertyPhoto from "./PropertyPhoto";
import { COMPANY, COMPANY_EXPERIENCE } from "../data";

const values = [
  { icon: Building2, title: "Hotel Renovations", text: "Full overhauls, partial renovations and carefully targeted upgrades." },
  { icon: DoorOpen, title: "Property Reopenings", text: "Closed hotels transformed into operational, revenue-generating properties." },
  { icon: HardHat, title: "Construction Completion", text: "Hotels with foundations and framing in place, completed through opening." },
  { icon: ClipboardCheck, title: "PIP Expertise", text: "Property Improvement Plans that address franchise standards and room quality." },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="WishNu Construction Experience" title="A Proven Track Record in Hotel Revitalization" />

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">
          {/* images */}
          <Reveal from="left" className="relative mx-auto w-full max-w-lg pb-14">
            <Tilt max={6}>
              <div className="overflow-hidden border border-teal-deep/10 bg-white p-1 shadow-xl shadow-black/10">
                <PropertyPhoto
                  propertyId="bliss-kokomo"
                  imageClassName="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Tilt>
            <p className="mt-3 text-xs leading-relaxed text-teal-deep/55">Bliss Point Inn, Kokomo · Published property photography</p>
          </Reveal>

          {/* copy */}
          <div>
            <Reveal from="right">
              <h3 className="font-display text-2xl font-bold text-teal-brand md:text-3xl">
                <Counter to={COMPANY_EXPERIENCE.completedProjects} /> completed projects. More than a decade of hospitality experience.
              </h3>
              <p className="mt-5 leading-relaxed text-teal-deep/80">
                Since {COMPANY_EXPERIENCE.since}, WishNu Construction &amp; Development has completed a diverse
                portfolio of hotel projects, including full renovations, partial renovations, minor upgrades,
                closed-property reopenings and the completion of unfinished construction.
              </p>
              <p className="mt-4 leading-relaxed text-teal-deep/80">
                Based in {COMPANY.cityState}, we focus on enhancing property value and revenue potential through
                strategic renovations. Our experience across Indiana, Ohio and Michigan now provides the foundation
                for our expansion into ground-up hotel construction.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 120}>
                  <div className="group flex h-full gap-3 border-t border-gold/35 pt-5">
                    <div className="shrink-0 pt-0.5 text-gold transition-transform duration-500 group-hover:-translate-y-1">
                      <v.icon size={23} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold tracking-wider text-teal-brand uppercase">{v.title}</h4>
                      <p className="mt-1 text-sm text-teal-deep/70">{v.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
