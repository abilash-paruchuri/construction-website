import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { COMPANY_EXPERIENCE } from "../data";
import PropertyPhoto from "./PropertyPhoto";

type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  year?: number;
  constructionImage?: string;
  imageAlt?: string;
  controlLabel?: string;
};

const propertyFeatures: Feature[] = [
  {
    id: "bliss-kokomo",
    eyebrow: "Hotel renovation & reopening · Kokomo, Indiana",
    title: "Ready to welcome guests again.",
    description:
      "From planning and building systems to the final fit-out, we help hotel owners take on the work behind a successful reopening.",
    label: "Bliss Point Inn",
    year: 2024,
  },
  {
    id: "super8-fort-wayne",
    eyebrow: "Major renovation · Fort Wayne, Indiana",
    title: "A better stay starts with the details.",
    description:
      "Room finishes, bathrooms, lighting and building systems all shape a guest's stay. We coordinate the renovation work from scope through fit-out.",
    label: "Super 8",
    year: 2024,
  },
  {
    id: "days-indianapolis",
    eyebrow: "Full renovation · Indianapolis, Indiana",
    title: "Better stays start with the details.",
    description:
      "Guest rooms, bathrooms, finishes and building systems all shape the experience. We bring the pieces together from first scope to handover.",
    label: "Days Inn",
    year: 2021,
  },
  {
    id: "red-roof-perrysburg",
    eyebrow: "Construction completion · Perrysburg, Ohio",
    title: "Make unfinished work move forward.",
    description:
      "When a project needs a clear path to opening, we coordinate the remaining design, approvals, construction and guest-ready fit-out.",
    label: "Red Roof Inn",
    year: 2019,
  },
];

const features = propertyFeatures;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const feature = features[active];
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % features.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    <section id="home" className="home-stage relative isolate min-h-[720px] overflow-hidden bg-teal-deep text-white">
      <div key={feature.id} className="home-stage-image absolute inset-0 -z-10">
        {feature.constructionImage ? (
          <img
            src={feature.constructionImage}
            alt={feature.imageAlt}
            loading={active === 0 ? "eager" : "lazy"}
            fetchPriority={active === 0 ? "high" : "auto"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <PropertyPhoto
            propertyId={feature.id}
            loading={active === 0 ? "eager" : "lazy"}
            className="h-full w-full"
            imageClassName="h-full w-full"
            showCaption={false}
            allowRepresentativeFallback={false}
          />
        )}
      </div>
      <div className="home-stage-overlay pointer-events-none absolute inset-0 -z-[5]" />

      <div className="home-editorial mx-auto max-w-[1440px] px-6 sm:px-12">
        <p className="home-kicker"><span /> Hospitality construction · Since 2013</p>
        <h1 id="home-title" tabIndex={-1} className="home-headline outline-none">Building places.<br /><span>Elevating stays.</span></h1>
        <a href="#projects" className="home-editorial-link">Explore our portfolio <ArrowRight size={20} /></a>
      </div>
      <div className="home-slide-number" aria-hidden="true">0{active + 1}<span> / 0{features.length}</span></div>
      <div className="home-intro-panel absolute inset-x-0 bottom-0 mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-[1.12fr_1fr_0.72fr_0.62fr]">
        <div className="home-intro-primary flex min-h-[220px] flex-col justify-center px-6 py-7 sm:px-10 lg:min-h-[270px] lg:px-14">
          <p className="home-intro-eyebrow">{feature.eyebrow}</p>
          <h2 key={`${feature.id}-title`} className="home-intro-title mt-3 max-w-[13ch] outline-none">
            {feature.title}
          </h2>
        </div>

        <div className="home-intro-description flex flex-col justify-center px-6 py-7 sm:px-10 lg:px-12">
          <p key={`${feature.id}-description`} className="home-description-copy">
            {feature.description}
          </p>
          <a href="#projects" className="home-project-link mt-5 inline-flex w-fit items-center gap-2">
            See our work <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="home-intro-stat flex items-center gap-4 px-6 py-5 sm:px-10 md:flex-col md:items-start md:justify-center lg:px-8">
          <span className="home-stat-number">{COMPANY_EXPERIENCE.completedProjects}</span>
          <span className="home-stat-label">hotel projects<br />since {COMPANY_EXPERIENCE.since}</span>
        </div>

        <a href="#about" className="home-discover flex min-h-[76px] items-center justify-between gap-5 px-6 py-5 sm:px-10 md:min-h-0 md:flex-col md:items-start md:justify-center lg:px-8">
          <span>Discover<br className="hidden md:block" /> WishNu</span>
          <ArrowDown className="home-discover-arrow" size={22} aria-hidden="true" />
        </a>
      </div>

      <div className="home-feature-controls absolute right-6 bottom-[calc(100%+22px)] z-10 flex items-center gap-3 sm:right-10 lg:right-[max(calc((100vw-1440px)/2+48px),48px)]">
          <span className="home-feature-label">
            {feature.year ? `${feature.label} · ${feature.year} portfolio entry` : feature.label}
          </span>
        <div className="flex items-center gap-2" role="group" aria-label="Featured project photos">
          {features.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.controlLabel ?? item.label}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className={`home-feature-dot ${active === index ? "is-current" : ""}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="home-feature-toggle"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play featured photos" : "Pause featured photos"}
        >
          {paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />}
        </button>
      </div>
    </section>
  );
}