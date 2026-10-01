import { useState } from "react";
import { Building2 } from "lucide-react";
import { getPropertyPhoto, representativeMotelPhoto, type PropertyPhotoData } from "../propertyPhotos";

export default function PropertyPhoto({
  propertyId,
  className = "",
  imageClassName = "aspect-[4/3]",
  showCaption = false,
  loading = "lazy",
  photo: suppliedPhoto,
  allowRepresentativeFallback = true,
}: {
  propertyId: string;
  className?: string;
  imageClassName?: string;
  showCaption?: boolean;
  loading?: "eager" | "lazy";
  photo?: PropertyPhotoData;
  allowRepresentativeFallback?: boolean;
}) {
  const photo = suppliedPhoto ?? getPropertyPhoto(propertyId);
  const [phase, setPhase] = useState(0);
  const isRepresentative = photo.kind === "representative" || phase > 0;
  const label = phase > 1 ? "Photo unavailable" : isRepresentative ? "Representative photo / exact property unconfirmed" : "Published property photo";

  return (
    <figure className={className} data-photo-kind={isRepresentative ? "representative" : "property"} title={isRepresentative ? "Representative image, not a photograph of the listed property." : photo.alt}>
      <div className={`relative overflow-hidden bg-parchment ${imageClassName}`}>
        {phase < 2 ? (
          <img
            src={phase === 0 ? photo.url : representativeMotelPhoto}
            alt={phase === 0 ? photo.alt : "Representative motel image; the property's original photo could not load."}
            loading={loading}
            fetchPriority={loading === "eager" ? "high" : "auto"}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setPhase((current) => allowRepresentativeFallback ? current + 1 : 2)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div role="img" aria-label="Property photograph currently unavailable" className="flex h-full w-full flex-col items-center justify-center gap-2 text-teal-brand/40">
            <Building2 size={32} strokeWidth={1} />
            {showCaption && <span className="text-[10px]">Image unavailable</span>}
          </div>
        )}
      </div>
      {(showCaption || phase > 0) && <figcaption className="mt-2 text-[10px] font-normal leading-relaxed text-teal-deep/55">{label}{phase === 1 && photo.kind === "property" ? " / original image unavailable" : ""}</figcaption>}
    </figure>
  );
}