export interface PropertyPhotoData {
  url: string;
  source: string;
  credit: string;
  kind: "property" | "representative";
  alt: string;
  note?: string;
}

export const representativeMotelPhoto = "https://images.pexels.com/photos/12777596/pexels-photo-12777596.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

const representative: PropertyPhotoData = {
  url: representativeMotelPhoto,
  source: "https://www.pexels.com/photo/a-motel-with-a-mountain-background-12777596/",
  credit: "Thomas K / Pexels",
  kind: "representative",
  alt: "Representative roadside motel photograph, not the listed hotel.",
  note: "An exact property photograph is awaiting owner confirmation. This is representative imagery only.",
};

const blissPhoto = (file: string) =>
  `https://www.blisspointinns.com/media/catalog/product/cache/8f8fc99967f1f6da36182268eaf001fc/${file}`;

const andersonPhoto: PropertyPhotoData = {
  url: "https://images.getaroom-cdn.com/image/upload/s--sV2I-iF---/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1582262554/c05750c030e9b1fb0d1df9aa5dffa025467b17d9?_a=BACAEuDL&atc=e7cd1cfa",
  source: "https://www.guestreservations.com/americas-best-value-inn-anderson/booking",
  credit: "Anderson Inn listing / Guest Reservations",
  kind: "property",
  alt: "Published photograph of Anderson Inn at 5810 South Scatterfield Road, Anderson, Indiana.",
  note: "The property listing uses Anderson Inn; it was formerly listed as Americas Best Value Inn. Historical project names are retained.",
};

const kingsPhoto: PropertyPhotoData = {
  url: "https://photos.bringfido.com/ein/2/2/7/202722/77930_1047531_b.jpg?size=slide&density=1x",
  source: "https://www.bringfido.com/lodging/77930",
  credit: "Kings / Knights Inn listing / BringFido",
  kind: "property",
  alt: "Exterior photograph listed for Kings Inn, formerly Knights Inn, in Michigan City, Indiana.",
  note: "The source gallery uses Kings Inn and Knights Inn names. This does not merge the separately supplied project or revenue entries.",
};

// Sourced by hotel name and city. Published photos are not dated before/after renovation evidence.
export const propertyPhotos: Record<string, PropertyPhotoData> = {
  "bliss-kokomo": {
    url: blissPhoto("k/o/kokomo.jpeg"),
    source: "https://www.blisspointinns.com/blisspoint-inn-suites-kokomo.html",
    credit: "BlissPoint Inns",
    kind: "property",
    alt: "BlissPoint Inn Kokomo, Indiana, from the hotel's official photo gallery.",
  },
  "days-northwood": representative,
  "super8-fort-wayne": {
    url: "https://extended-stay-by-blisspoint.fort-wayne-hotels.com/data/Pictures/1080x700w/17200/1720011/1720011461/picture-fort-wayne-super-8-by-wyndham-fort-wayne-1.JPEG",
    source: "https://extended-stay-by-blisspoint.fort-wayne-hotels.com/en/",
    credit: "Super 8 Fort Wayne property listing",
    kind: "property",
    alt: "Super 8 by Wyndham Fort Wayne, 3320 West Coliseum Boulevard, Indiana.",
  },
  "bliss-lawrence": {
    url: blissPhoto("m/a/main_1.jpg"),
    source: "https://www.blisspointinns.com/blisspoint-inn-lawrence-indianapolis.html",
    credit: "BlissPoint Inns",
    kind: "property",
    alt: "BlissPoint Inn Lawrence, Indianapolis, from the hotel's official photo gallery.",
  },
  "bliss-wabash": {
    url: blissPhoto("m/a/main_3.jpg"),
    source: "https://www.blisspointinns.com/blisspoint-inn-wabash-indianapolis.html",
    credit: "BlissPoint Inns",
    kind: "property",
    alt: "BlissPoint Inn Wabash, Indiana, from the hotel's official photo gallery.",
  },
  "days-kokomo": {
    url: "https://www.kayak.com/rimg/himg/f5/d5/59/ice-68617-be724c-441685.jpg?width=1200&height=800&crop=true",
    source: "https://www.kayak.com/Kokomo-Hotels-Days-Inn-Suites-by-Wyndham-Kokomo.68617.ksp",
    credit: "Days Inn Kokomo building gallery / KAYAK",
    kind: "property",
    alt: "Exterior building photograph of Days Inn and Suites by Wyndham Kokomo, Indiana.",
  },
  "quality-columbia": {
    url: "https://images.getaroom-cdn.com/image/upload/s--uSUGEzAG--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1665903768/ed6d31d74f3505a9496f138153fde20f1db2c155?_a=BACAEuDL&atc=e7cd1cfa",
    source: "https://www.guestreservations.com/quality-inn-columbia-city/booking",
    credit: "Quality Inn Columbia City listing / Guest Reservations",
    kind: "property",
    alt: "Published hotel photograph of Quality Inn in Columbia City, Indiana.",
  },
  "days-indianapolis": {
    url: "https://images.getaroom-cdn.com/image/upload/s--s_ZzxC4S--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1748522357/ea7cd1228818187de8bb3d97ca77aff15a009c83?_a=BACAEuDL&atc=e7cd1cfa",
    source: "https://www.guestreservations.com/days-inn-and-suites-northwest-indianapolis/booking",
    credit: "Days Inn NW Indianapolis listing / Guest Reservations",
    kind: "property",
    alt: "Published hotel photograph of Days Inn and Suites by Wyndham Northwest Indianapolis.",
  },
  "best-western-new-buffalo": {
    url: "https://images.getaroom-cdn.com/image/upload/s--BVL1Djsw--/c_limit,e_improve,fl_lossy.immutable_cache,h_940,q_auto:good,w_940/v1666715736/4237e6b1e8f135ab65415e0676ba7f7a8c21ea24?_a=BACAEuDL&atc=e7cd1cfa",
    source: "https://www.guestreservations.com/days-inn-suites-new-buffalo/booking",
    credit: "SureStay by Best Western listing / Guest Reservations",
    kind: "property",
    alt: "Published hotel photograph of SureStay Hotel by Best Western in New Buffalo, Michigan.",
  },
  "bliss-marion": {
    url: blissPhoto("b/l/blisspoint-inn-suites-marion_01.jpeg"),
    source: "https://www.blisspointinns.com/blisspoint-inn-suites-marion.html",
    credit: "BlissPoint Inns",
    kind: "property",
    alt: "BlissPoint Inn and Suites Marion, Indiana, from the hotel's official photo gallery.",
  },
  "red-roof-perrysburg": {
    url: "https://www.kayak.com/rimg/himg/79/b1/5e/leonardo-382248-3211031-827708.jpg?width=1200&height=800&crop=true",
    source: "https://www.kayak.com/Perrysburg-Hotels-Red-Roof-Inn-Perrysburg.382248.ksp",
    credit: "Red Roof Inn Perrysburg building gallery / KAYAK",
    kind: "property",
    alt: "Exterior building photograph of Red Roof Inn in Perrysburg, Ohio.",
  },
  "express-northwood": {
    url: "https://express-motel.besthotelsohio.com/data/Pictures/1080x700w/14696/1469696/1469696903/picture-northwood-express-motel-1.JPEG",
    source: "https://express-motel.besthotelsohio.com/en/",
    credit: "Express Motel Northwood property listing",
    kind: "property",
    alt: "Published photograph of Express Motel at 301 Bihl Avenue, Northwood, Ohio.",
  },
  "anderson-inn": andersonPhoto,
  "americas-best-value-anderson": andersonPhoto,
  "regency-fort-wayne": {
    url: "https://s3-media0.fl.yelpcdn.com/bphoto/6J4-JkoTBU5VHx3Aq3uO_Q/l.jpg",
    source: "https://www.yelp.com/biz/regency-inn-fort-wayne",
    credit: "Regency Inn listing / Yelp contributor",
    kind: "property",
    alt: "Regency Inn on West Coliseum Boulevard, Fort Wayne, Indiana, photographed from across the road.",
  },
  "kings-michigan-city": kingsPhoto,
  "knights-michigan-city": kingsPhoto,
  "dunes-michigan-city": {
    url: "https://i.travelapi.com/lodging/1000000/910000/910000/909963/1ae986a0_z.jpg",
    source: "https://www.bringfido.com/lodging/1164522",
    credit: "Dunes Inn listing / BringFido",
    kind: "property",
    alt: "Exterior of Dunes Inn Michigan City, Indiana, from the published property gallery.",
  },
  "muncie-inn": {
    url: blissPhoto("m/u/muncie-1.jpeg"),
    source: "https://www.blisspointinns.com/blisspoint-inn-muncie.html",
    credit: "BlissPoint Inns",
    kind: "property",
    alt: "Muncie Inn, now listed as BlissPoint Inn Muncie, at 414 North Madison Street, Indiana.",
    note: "The current property gallery uses the BlissPoint Inn Muncie name; the supplied project name is retained.",
  },
  "hk-anderson": {
    url: "https://i0.wp.com/tedshideler.com/wp-content/uploads/2026/07/hk3.jpg?resize=788%2C591&ssl=1",
    source: "https://tedshideler.com/2026/08/04/more-remnants-of-a-holiday-inn-great-sign-in-anderson/",
    credit: "Ted Shideler / H&K Motel photo essay",
    kind: "property",
    alt: "H&K Motel in Anderson, Indiana, in a published July 2026 photograph by Ted Shideler.",
    note: "A published 2026 photograph, not a record of the property's appearance during the 2015 project.",
  },
  "roadway-indianapolis": representative,
  "bliss-indianapolis": {
    url: blissPhoto("i/n/in16.jpg"),
    source: "https://www.blisspointinns.com/blisspoint-inn-northwest-indianapolis.html",
    credit: "BlissPoint Inns",
    kind: "representative",
    alt: "BlissPoint Inn Northwest Indianapolis from the hotel's official photo gallery.",
    note: "This is a candidate photograph from BlissPoint Inn Northwest Indianapolis, not a confirmed image of this project. Confirm which Indianapolis location is in the supplied project list.",
  },
};

export function getPropertyPhoto(id: string): PropertyPhotoData {
  return propertyPhotos[id] ?? representative;
}