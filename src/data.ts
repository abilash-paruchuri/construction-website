// ====================================================================
//  EASY-EDIT CONFIG - update these values whenever you need.
// ====================================================================

export const COMPANY = {
  name: "WishNu",
  tagline: "Construction & Development",
  address: "14214 Bergen Blvd, Suite 150, Noblesville, IN 46060, United States",
  addressLines: ["14214 Bergen Blvd, Suite 150", "Noblesville, IN 46060", "United States"],
  cityState: "Noblesville, IN",
  phone: "615-502-0282",
  phoneHref: "tel:+16155020282",
  email: "abilash6377@gmail.com",
};

export const COMPANY_EXPERIENCE = {
  since: 2013,
  completedProjects: 20,
};

// Option B: paste your published Google Form's iframe src here.
// See SETUP.md for publishing and email-notification instructions.
// Until configured, the existing FormSubmit form remains available;
// its email delivery requires the owner's FormSubmit activation.
export const GOOGLE_FORM_EMBED_URL = "";

// ----- Placeholder photos (swap with your own later) -----
export const sites = [
  "https://images.pexels.com/photos/8961260/pexels-photo-8961260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/37687676/pexels-photo-37687676.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/35300835/pexels-photo-35300835.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/9964624/pexels-photo-9964624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
];

const portrait = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=480`;

export const portraits = {
  ceo: portrait(37148308),
  d1: portrait(17049771),
  d2: portrait(31869537),
  d3: portrait(37605831),
  m1: portrait(29995581),
  m2: portrait(38197025),
  m3: portrait(31880922),
  m4: portrait(10417388),
  m5: portrait(13111213),
  m6: portrait(26872232),
};

// ----- Team structure (placeholder names & photos — update later) -----
export interface Person {
  name: string;
  role: string;
  img: string;
}
export interface Branch {
  head: Person;
  members: Person[];
}

export const ceo: Person = {
  name: "Founder Name",
  role: "Founder & CEO",
  img: portraits.ceo,
};

export const branches: Branch[] = [
  {
    head: { name: "Director Name", role: "Director of Construction", img: portraits.d1 },
    members: [
      { name: "Team Member", role: "Senior Project Manager", img: portraits.m1 },
      { name: "Team Member", role: "Site Superintendent", img: portraits.m3 },
    ],
  },
  {
    head: { name: "Director Name", role: "Director of Design & Renovation", img: portraits.d2 },
    members: [
      { name: "Team Member", role: "Lead Architect", img: portraits.m2 },
      { name: "Team Member", role: "Interior Design Lead", img: portraits.m4 },
    ],
  },
  {
    head: { name: "Director Name", role: "Director of Operations", img: portraits.d3 },
    members: [
      { name: "Team Member", role: "Safety & Compliance Manager", img: portraits.m5 },
      { name: "Team Member", role: "Client Relations Manager", img: portraits.m6 },
    ],
  },
];
