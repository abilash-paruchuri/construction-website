import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, MapPin, X } from "lucide-react";
import { changeLabel, formatRevenue, type PortfolioProperty } from "../portfolio";
import { getPropertyPhoto } from "../propertyPhotos";
import PropertyPhoto from "./PropertyPhoto";

export default function PropertyDialog({
  property,
  onClose,
  id,
}: {
  property: PortfolioProperty | null;
  onClose: () => void;
  id: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = property !== null;

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

  const photo = property ? getPropertyPhoto(property.id) : null;
  return (
    <dialog
      id={id}
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="hotel-lightbox m-auto max-h-[90dvh] w-[min(94vw,1040px)] overflow-y-auto rounded-xl border border-gold/50 bg-cream p-0 text-teal-deep shadow-2xl"
    >
      {property && photo && (
        <div>
          <div className="flex items-center justify-between gap-4 border-b border-gold/25 px-5 py-3">
            <span className="font-display text-[10px] font-semibold tracking-widest text-teal-soft uppercase">WishNu Project Portfolio</span>
            <button type="button" autoFocus onClick={onClose} aria-label="Close property details" className="rounded-full p-2 text-teal-brand transition-colors hover:bg-gold/15"><X size={22} /></button>
          </div>
          <PropertyPhoto key={property.id} propertyId={property.id} loading="eager" className="px-5 pt-5 sm:px-8" imageClassName="aspect-[16/9] max-h-[48dvh] rounded-md" showCaption />
          <div className="px-5 py-7 sm:px-8">
            <p className="text-[10px] font-medium tracking-[0.15em] text-teal-soft uppercase">{property.project?.approach ?? property.revenue?.type ?? "PIP & Targeted Improvements"}</p>
            <h3 id={`${id}-title`} className="font-display mt-2 text-2xl font-bold text-teal-brand sm:text-3xl">{property.property}</h3>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-teal-deep/65"><MapPin size={14} className="text-gold" />{property.location}{property.revenue ? ` / ${property.revenue.year}` : ""}</p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-sm leading-relaxed text-teal-deep/75">{property.project?.description ?? "This property is included in WishNu's company-provided portfolio of partial renovations, Property Improvement Plans and targeted hotel improvements."}</p>
                {property.revenue && (
                  <div className="mt-6 border-l-2 border-gold pl-4">
                    <p className="text-[10px] tracking-wider text-teal-soft uppercase">Company-Reported Revenue</p>
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold tabular-nums text-teal-brand">{formatRevenue(property.revenue.before)}<ArrowRight size={15} aria-label="changed to" />{formatRevenue(property.revenue.after)}</p>
                    <p className="font-serif-i mt-1 text-xl text-teal-brand">{changeLabel(property.revenue)}</p>
                    <p className="mt-2 text-[10px] leading-relaxed text-teal-deep/55">Historical property results, not a guarantee of future performance.</p>
                  </div>
                )}
              </div>
              {property.project && (
                <div>
                  <h4 className="font-display mb-3 text-xs font-bold tracking-wider text-teal-brand uppercase">Scope of Work</h4>
                  <ul className="space-y-2 text-sm leading-relaxed text-teal-deep/75">
                    {property.project.scope.map((item) => <li key={item} className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" /><span>{item}</span></li>)}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-gold/30 pt-5">
              <a href={photo.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-soft underline underline-offset-4">Photo source: {photo.credit}<ArrowUpRight size={14} /></a>
              <a href="#contact" onClick={() => { dialogRef.current?.close(); onClose(); }} className="btn-gold font-display rounded-full px-5 py-3 text-[10px] font-bold tracking-wider uppercase">Discuss Your Property</a>
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-teal-deep/55">{photo.kind === "representative" ? photo.note : "Published property photography; appearance may differ from the historical project year. These images are not dated before/after renovation evidence."}{photo.kind === "property" && photo.note ? ` ${photo.note}` : ""}</p>
          </div>
        </div>
      )}
    </dialog>
  );
}