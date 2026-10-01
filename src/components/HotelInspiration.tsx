import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { Reveal, SectionTitle, Tilt } from "./ui";
import PropertyPhoto from "./PropertyPhoto";
import { propertyGallery, type GalleryCategory, type PropertyGalleryImage } from "../propertyGallery";

export default function HotelInspiration() {
  const [filter, setFilter] = useState<"All" | GalleryCategory>("All");
  const [selected, setSelected] = useState<PropertyGalleryImage | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = selected !== null;
  const list = propertyGallery.filter((image) => filter === "All" || image.category === filter);

  // Native dialog supplies keyboard focus trapping and Escape handling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <section id="inspiration" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="From Our Property List" title="Our Hotels, In Focus" />
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-teal-deep/75 md:text-base">
            Exteriors and interiors from the hotels in WishNu's supplied project portfolio, including Days Inn,
            Bliss Point Inn, Red Roof Inn, King's Inn and Dunes Inn.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div role="group" aria-label="Filter property photography" className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {(["All", "Hotel Exteriors", "Interior Renovation"] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                aria-controls="property-inspiration-gallery"
                className={`font-display border-b-2 px-1 py-3 text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 sm:text-xs ${
                  filter === category
                    ? "border-gold text-teal-brand"
                    : "border-transparent text-teal-deep/55 hover:border-gold/40 hover:text-teal-brand"
                }`}
              >
                {category === "All" ? "All Inspiration" : category}
              </button>
            ))}
          </div>
        </Reveal>
        <p className="sr-only" aria-live="polite">{filter}: {list.length} property photographs shown.</p>

        <div id="property-inspiration-gallery" className="mt-12 grid gap-8 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
          {list.map((image, i) => (
            <Reveal key={image.id} delay={(i % 3) * 100} from="zoom">
              <Tilt max={6}>
                <button
                  type="button"
                  onClick={() => setSelected(image)}
                  aria-label={`Explore ${image.scene} at ${image.property.property}, ${image.property.location}`}
                  aria-haspopup="dialog"
                  aria-controls="property-inspiration-dialog"
                  className="group block w-full rounded-xl text-left"
                >
                  <PropertyPhoto
                    propertyId={image.property.id}
                    photo={image.photo}
                    imageClassName="aspect-[4/3] rounded-xl"
                    allowRepresentativeFallback={false}
                  />
                  <div className="flex items-start justify-between gap-3 pt-4">
                    <div>
                      <p className="mb-2 text-[10px] font-medium tracking-[0.16em] text-teal-soft uppercase">{image.scene}</p>
                      <h3 className="font-display text-base font-bold leading-snug text-teal-brand">{image.property.property}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-teal-deep/65">
                        <MapPin size={13} className="text-gold" /> {image.property.location}
                      </p>
                    </div>
                    <ArrowUpRight size={20} className="mt-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </button>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-teal-deep/60">
          Published photos of properties in the supplied project list, not dated before-and-after renovation
          records. Photo credits and original sources are available when you open an image.
        </p>
      </div>

      <dialog
        id="property-inspiration-dialog"
        ref={dialogRef}
        aria-labelledby="property-inspiration-title"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
        className="hotel-lightbox m-auto max-h-[90dvh] w-[min(94vw,960px)] overflow-y-auto rounded-2xl border border-gold/60 bg-cream p-0 text-teal-deep shadow-2xl"
      >
        {selected && (
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-gold/25 px-5 py-3">
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-teal-soft uppercase">Property Photo Gallery</span>
              <button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close property photograph" className="rounded-full p-2 text-teal-brand transition-colors hover:bg-gold/15">
                <X size={22} />
              </button>
            </div>
            <PropertyPhoto
              key={selected.id}
              propertyId={selected.property.id}
              photo={selected.photo}
              loading="eager"
              imageClassName="aspect-[16/9] max-h-[52dvh]"
              allowRepresentativeFallback={false}
            />
            <div className="px-5 py-6 sm:px-8">
              <p className="mb-2 text-xs font-medium tracking-wider text-teal-soft uppercase">{selected.scene}</p>
              <h3 id="property-inspiration-title" className="font-display text-xl font-bold text-teal-brand sm:text-2xl">{selected.property.property}</h3>
              <p className="mt-2 text-xs text-teal-deep/65">{selected.property.location}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-teal-deep/75">{selected.description}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <a href={selected.photo.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border-b border-gold/70 pb-1 text-xs font-semibold text-teal-brand">
                  View property photo source <ArrowUpRight size={15} />
                </a>
                <a href="#contact" onClick={() => {
                  dialogRef.current?.close();
                  setSelected(null);
                }} className="btn-gold font-display rounded-full px-5 py-3 text-[10px] font-bold tracking-wider uppercase">
                  Discuss Your Hotel
                </a>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-teal-deep/55">Photo credit: {selected.photo.credit}. Published appearance may differ from the historical project year.</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
