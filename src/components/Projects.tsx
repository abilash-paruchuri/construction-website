import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, MapPin, Search } from "lucide-react";
import { Reveal, SectionTitle, Tilt } from "./ui";
import { portfolioProperties, type PortfolioProperty } from "../portfolio";
import PropertyPhoto from "./PropertyPhoto";
import PropertyDialog from "./PropertyDialog";

type ProjectGroup = "all" | "major" | "pip";

const featuredOrder = ["bliss-kokomo", "days-indianapolis", "super8-fort-wayne", "days-kokomo", "best-western-new-buffalo", "red-roof-perrysburg", "days-northwood"];
const orderedProperties = [...portfolioProperties].sort((a, b) => {
  const first = featuredOrder.indexOf(a.id);
  const second = featuredOrder.indexOf(b.id);
  return (first === -1 ? 100 : first) - (second === -1 ? 100 : second);
});

export default function Projects() {
  const [group, setGroup] = useState<ProjectGroup>("all");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<PortfolioProperty | null>(null);
  const filtered = orderedProperties.filter((property) =>
    (group === "all" || property.group === group) &&
    `${property.property} ${property.location}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="The Places We've Revitalized" title="Our Hotel Portfolio" />
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-teal-deep/75 md:text-base">
            Explore the properties behind our experience, from complete hotel transformations to carefully
            targeted improvements. Select a hotel to see its project details.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gold/30">
            <div role="group" aria-label="Filter the property portfolio" className="flex flex-wrap gap-x-6 gap-y-1">
              {([
                { value: "all", label: "All Properties" },
                { value: "major", label: "Major Transformations" },
                { value: "pip", label: "PIP & Upgrades" },
              ] as const).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={group === item.value}
                  aria-controls="portfolio-projects"
                  onClick={() => { setGroup(item.value); setShowAll(false); }}
                  className={`font-display border-b-2 px-1 py-4 text-[11px] font-bold tracking-wider transition-colors ${group === item.value ? "border-gold text-teal-brand" : "border-transparent text-teal-deep/55 hover:text-teal-brand"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="relative mb-3 block w-full sm:w-60">
              <span className="sr-only">Find a hotel by property name or city</span>
              <Search size={15} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-gold" />
              <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false); }} placeholder="Find a property or city" className="w-full border-b border-gold/30 bg-transparent py-2 pr-2 pl-6 text-xs text-teal-deep placeholder:text-teal-deep/50" aria-controls="portfolio-projects" />
            </label>
          </div>
        </Reveal>

        <div id="portfolio-projects" className="mt-9" role="region" aria-label="Hotel property photo gallery">
          <div key={group} className="portfolio-enter grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((property) => (
              <Tilt key={property.id} max={5}>
                <button
                  type="button"
                  onClick={() => setSelected(property)}
                  aria-label={`View photos and project details for ${property.property}, ${property.location}`}
                  aria-haspopup="dialog"
                  aria-controls="portfolio-property-dialog"
                  className="group block w-full text-left"
                >
                  <PropertyPhoto propertyId={property.id} imageClassName="aspect-[16/11] rounded-lg" showCaption />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-teal-brand">{property.property}</h3>
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-teal-deep/65"><MapPin size={12} className="text-gold" />{property.location}</p>
                    </div>
                    <ArrowUpRight size={22} aria-hidden="true" className="mt-1 shrink-0 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-4 border-t border-gold/30 pt-3 text-[11px] leading-relaxed text-teal-soft">{property.project?.approach ?? property.revenue?.type ?? "PIP & Targeted Improvements"}</p>
                </button>
              </Tilt>
            ))}
          </div>
          {visible.length === 0 && <p className="py-12 text-center text-sm text-teal-deep/70">No properties match your search. <button type="button" onClick={() => { setQuery(""); setGroup("all"); }} className="font-medium text-teal-brand underline">Clear filters</button></p>}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-5">
            <p role="status" aria-live="polite" className="text-xs text-teal-deep/60">Showing {visible.length} of {filtered.length} property-name entries.</p>
            {filtered.length > 6 && <button type="button" onClick={() => setShowAll(!showAll)} aria-expanded={showAll} aria-controls="portfolio-projects" className="inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-xs font-semibold text-teal-brand">{showAll ? "Show fewer properties" : "Explore all properties"}<ChevronDown size={15} className={`transition-transform ${showAll ? "rotate-180" : ""}`} /></button>}
          </div>
          <p className="mt-5 max-w-3xl text-[10px] leading-relaxed text-teal-deep/55">Photos are matched to published property listings. Images marked representative are not the named property. Historical hotel names are preserved, so differently named entries may refer to a rebranded location. View each property for photo credits and details.</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 text-xs">
          <a href="#results" className="inline-flex items-center gap-2 border-b border-gold/60 pb-1 font-semibold text-teal-brand">
            Explore the renovation impact <ArrowDown size={15} />
          </a>
          <a href="#inspiration" className="inline-flex items-center gap-2 text-teal-deep/65 transition-colors hover:text-teal-brand">
            Explore our hotel exteriors and interior details <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <PropertyDialog id="portfolio-property-dialog" property={selected} onClose={() => setSelected(null)} />
    </section>
  );
}