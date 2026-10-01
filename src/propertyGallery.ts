import { findPortfolioProperty, type PortfolioProperty } from "./portfolio";
import { getPropertyPhoto, type PropertyPhotoData } from "./propertyPhotos";

export type GalleryCategory = "Hotel Exteriors" | "Interior Renovation";

export interface PropertyGalleryImage {
  id: string;
  property: PortfolioProperty;
  category: GalleryCategory;
  scene: string;
  photo: PropertyPhotoData;
  description: string;
}

function galleryImage(
  propertyId: string,
  category: GalleryCategory,
  scene: string,
  description: string,
  photo?: PropertyPhotoData,
): PropertyGalleryImage {
  const property = findPortfolioProperty(propertyId);
  if (!property) throw new Error(`Gallery property is missing from the portfolio: ${propertyId}`);
  return {
    id: `${propertyId}-${category === "Hotel Exteriors" ? "exterior" : "interior"}`,
    property,
    category,
    scene,
    photo: photo ?? getPropertyPhoto(propertyId),
    description,
  };
}

// Every entry resolves to the supplied WishNu property list, never another hotel's brand imagery.
export const propertyGallery: PropertyGalleryImage[] = [
  galleryImage("bliss-kokomo", "Hotel Exteriors", "Hotel entrance & exterior", "Published exterior photography of Bliss Point Inn in Kokomo, a property included in WishNu's complete-renovation and reopening portfolio."),
  galleryImage("days-kokomo", "Hotel Exteriors", "Hotel building & facade", "A building photograph from the Days Inn Kokomo property gallery, paired with the hotel's full-renovation record in WishNu's portfolio."),
  galleryImage("red-roof-perrysburg", "Hotel Exteriors", "Property exterior", "An exterior photograph of Red Roof Inn Perrysburg, one of the unfinished hotel construction projects completed in the supplied project list."),
  galleryImage("bliss-marion", "Hotel Exteriors", "Arrival & architecture", "Published property photography of Bliss Point Inn and Suites Marion, included in WishNu's partial-renovation and targeted-improvement portfolio."),
  galleryImage("kings-michigan-city", "Hotel Exteriors", "Exterior & grounds", "An exterior image from the Kings / Knights Inn Michigan City gallery. The historical King's Inn name from the supplied revenue schedule is retained."),
  galleryImage("dunes-michigan-city", "Hotel Exteriors", "Hotel exterior", "An exterior photograph of Dunes Inn Michigan City, included in the minor-upgrades and property-maintenance records supplied by WishNu."),
  galleryImage("bliss-kokomo", "Interior Renovation", "Guest rooms & interior finishes", "A double-queen guest room from Bliss Point Inn Kokomo's official gallery, showing the interiors of a hotel in the supplied property list.", {
    url: "https://www.blisspointinns.com/media/rooms/1.jpeg",
    source: "https://www.blisspointinns.com/blisspoint-inn-suites-kokomo.html",
    credit: "BlissPoint Inns / Kokomo guest-room gallery",
    kind: "property",
    alt: "Double-queen guest room at BlissPoint Inn Kokomo, from the hotel's official gallery.",
  }),
  galleryImage("bliss-marion", "Interior Renovation", "Guest-room layout & comfort", "A king guest room published in the official Bliss Point Inn Marion gallery, from the same property included in WishNu's partial-renovation portfolio.", {
    url: "https://www.blisspointinns.com/media/rooms/marion-king-room.jpeg",
    source: "https://www.blisspointinns.com/blisspoint-inn-suites-marion.html",
    credit: "BlissPoint Inns / Marion guest-room gallery",
    kind: "property",
    alt: "King guest room at BlissPoint Inn and Suites Marion, from the hotel's official gallery.",
  }),
  galleryImage("bliss-wabash", "Interior Renovation", "Room finishes & furnishings", "A guest-room photograph published on Bliss Point Inn Wabash's official property page, a hotel included in the supplied PIP and partial-renovation records.", {
    url: "https://www.blisspointinns.com/media/rooms/room2.jpg",
    source: "https://www.blisspointinns.com/blisspoint-inn-wabash-indianapolis.html",
    credit: "BlissPoint Inns / Wabash guest-room gallery",
    kind: "property",
    alt: "Guest room with two double beds at BlissPoint Inn Wabash, from the official property page.",
  }),
];