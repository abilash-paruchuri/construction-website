export const renovationTypes = [
  "Full Renovation",
  "Partial Renovation",
  "Minor Upgrades & Maintenance",
  "Closed Property Reopening",
  "Incomplete Construction Completion",
] as const;

export type RenovationType = (typeof renovationTypes)[number];

export interface RevenueRecord {
  id: string;
  property: string;
  location: string;
  year: number;
  type: RenovationType;
  before: number;
  after: number;
}

// Historical figures supplied by WishNu; a zero baseline has no percentage growth.
export const revenueRecords: RevenueRecord[] = [
  { id: "bliss-kokomo", property: "Bliss Point Inn", location: "Kokomo, IN", year: 2024, type: "Closed Property Reopening", before: 0, after: 1_000_000 },
  { id: "days-northwood", property: "Days Inn", location: "Northwood, OH", year: 2024, type: "Closed Property Reopening", before: 0, after: 800_000 },
  { id: "super8-fort-wayne", property: "Super 8", location: "Fort Wayne, IN", year: 2024, type: "Full Renovation", before: 700_000, after: 1_200_000 },
  { id: "bliss-lawrence", property: "Bliss Point Inn", location: "Lawrence, IN", year: 2023, type: "Partial Renovation", before: 400_000, after: 500_000 },
  { id: "bliss-wabash", property: "Bliss Point Inn", location: "Wabash, IN", year: 2023, type: "Partial Renovation", before: 400_000, after: 500_000 },
  { id: "days-kokomo", property: "Days Inn", location: "Kokomo, IN", year: 2022, type: "Full Renovation", before: 700_000, after: 1_600_000 },
  { id: "quality-columbia", property: "Quality Inn", location: "Columbia City, IN", year: 2022, type: "Partial Renovation", before: 600_000, after: 550_000 },
  { id: "days-indianapolis", property: "Days Inn", location: "Indianapolis, IN", year: 2021, type: "Full Renovation", before: 900_000, after: 2_000_000 },
  // The detailed project scope identifies New Buffalo as MI, unlike the supplied table's IN.
  { id: "best-western-new-buffalo", property: "Best Western", location: "New Buffalo, MI", year: 2021, type: "Incomplete Construction Completion", before: 0, after: 600_000 },
  { id: "bliss-marion", property: "Bliss Point Inn", location: "Marion, IN", year: 2020, type: "Partial Renovation", before: 300_000, after: 600_000 },
  { id: "red-roof-perrysburg", property: "Red Roof Inn", location: "Perrysburg, OH", year: 2019, type: "Incomplete Construction Completion", before: 0, after: 600_000 },
  { id: "express-northwood", property: "Express Motel", location: "Northwood, OH", year: 2018, type: "Minor Upgrades & Maintenance", before: 150_000, after: 300_000 },
  { id: "anderson-inn", property: "Anderson Inn", location: "Anderson, IN", year: 2017, type: "Partial Renovation", before: 500_000, after: 750_000 },
  { id: "regency-fort-wayne", property: "Regency Inn", location: "Fort Wayne, IN", year: 2017, type: "Minor Upgrades & Maintenance", before: 150_000, after: 300_000 },
  { id: "kings-michigan-city", property: "King's Inn", location: "Michigan City, IN", year: 2016, type: "Partial Renovation", before: 500_000, after: 700_000 },
  { id: "dunes-michigan-city", property: "Dunes Inn", location: "Michigan City, IN", year: 2016, type: "Minor Upgrades & Maintenance", before: 300_000, after: 300_000 },
  { id: "muncie-inn", property: "Muncie Inn", location: "Muncie, IN", year: 2016, type: "Partial Renovation", before: 100_000, after: 300_000 },
  { id: "hk-anderson", property: "H&K Motel", location: "Anderson, IN", year: 2015, type: "Partial Renovation", before: 100_000, after: 300_000 },
  { id: "roadway-indianapolis", property: "Roadway Inn", location: "Indianapolis, IN", year: 2013, type: "Partial Renovation", before: 300_000, after: 700_000 },
];

const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatRevenue = (amount: number) => dollarFormatter.format(amount);

export function percentageChange(record: RevenueRecord): number | null {
  return record.before === 0 ? null : Math.round(((record.after - record.before) / record.before) * 100);
}

export function changeLabel(record: RevenueRecord) {
  const change = percentageChange(record);
  return change === null ? "New revenue" : `${change > 0 ? "+" : ""}${change}%`;
}

export interface MajorProject {
  id: string;
  property: string;
  location: string;
  year: number;
  approach: string;
  description: string;
  scope: string[];
}

export const majorProjects: MajorProject[] = [
  {
    id: "days-northwood",
    property: "Days Inn",
    location: "Northwood, OH",
    year: 2024,
    approach: "Major renovation & conversion",
    description: "A closed-property transformation combining essential system upgrades with a refreshed hotel environment and a successful reopening.",
    scope: [
      "Sprinkler and fire safety systems",
      "Drywall, flooring and interior/exterior painting",
      "Furniture, fixtures & equipment (FF&E) and operating supplies & equipment (OS&E)",
      "HVAC system replacement",
      "Security cameras and upgraded landscaping",
    ],
  },
  {
    id: "super8-fort-wayne",
    property: "Super 8",
    location: "Fort Wayne, IN",
    year: 2024,
    approach: "Major renovation & conversion",
    description: "A comprehensive property conversion with upgraded rooms, bathrooms, lighting and a new roofing system.",
    scope: [
      "Drywall, flooring and interior/exterior painting",
      "Bathroom remodeling",
      "FF&E and OS&E installation",
      "Roof replacement with a new TPO roof",
      "Upgraded lighting",
    ],
  },
  {
    id: "red-roof-perrysburg",
    property: "Red Roof Inn",
    location: "Perrysburg, OH",
    year: 2019,
    approach: "Construction completion & reopening",
    description: "An unfinished hotel brought through design, permits, construction and guest-ready fit-out to opening.",
    scope: [
      "Architectural planning, framing and interior design",
      "Electrical, plumbing and mechanical permit approval",
      "Construction, flooring and bathroom remodeling",
      "FF&E, OS&E and lobby/breakfast area renovation",
      "Parking lot upgrades and fire safety systems",
      "Indoor swimming pool and new windows",
    ],
  },
  {
    id: "bliss-kokomo",
    property: "Bliss Point Inn",
    location: "Kokomo, IN",
    year: 2024,
    approach: "Complete renovation & reopening",
    description: "A closed property comprehensively renovated and reopened, creating a new revenue stream for the hotel.",
    scope: [
      "Architectural planning, framing and interior design",
      "Electrical and plumbing upgrades",
      "FF&E and OS&E installation",
      "Drywall, flooring and interior/exterior painting",
      "City permits and fire safety systems",
    ],
  },
  {
    id: "best-western-new-buffalo",
    property: "Best Western",
    location: "New Buffalo, MI",
    year: 2021,
    approach: "Construction completion & reopening",
    description: "Existing construction completed with utilities, permits, interior finishes and operating equipment to bring the hotel into service.",
    scope: [
      "Water service, utilities and permits",
      "FF&E and OS&E installation",
      "Drywall, flooring and interior/exterior painting",
      "Plumbing and a new shingle roof",
    ],
  },
  {
    id: "days-indianapolis",
    property: "Days Inn",
    location: "NW Indianapolis, IN",
    year: 2021,
    approach: "Full renovation & complete overhaul",
    description: "An extensive hotel overhaul, from planning and plumbing to guest rooms, roofing and the indoor pool.",
    scope: [
      "Plumbing, architectural planning and interior design",
      "Drywall, flooring and interior/exterior painting",
      "Bathroom remodeling, FF&E and OS&E",
      "Roof replacement with a new metal roof",
      "Upgraded lighting and an indoor swimming pool",
    ],
  },
  {
    id: "days-kokomo",
    property: "Days Inn",
    location: "Kokomo, IN",
    year: 2022,
    approach: "Full renovation & complete overhaul",
    description: "A comprehensive renovation that refreshed the guest experience, key building finishes and the front desk.",
    scope: [
      "Plumbing and interior design",
      "Drywall, flooring and interior/exterior painting",
      "Bathroom remodeling, FF&E and OS&E",
      "Roof replacement with a new rubber roof",
      "Upgraded lighting and a new front desk design",
    ],
  },
];

export const pipProperties = [
  { id: "quality-columbia", property: "Quality Inn", location: "Columbia City, IN" },
  { id: "hk-anderson", property: "H&K Motel", location: "Anderson, IN" },
  { id: "regency-fort-wayne", property: "Regency Inn", location: "Fort Wayne, IN" },
  { id: "americas-best-value-anderson", property: "America's Best Value Inn", location: "Anderson, IN" },
  { id: "bliss-lawrence", property: "Bliss Point Inn", location: "Lawrence, IN" },
  { id: "knights-michigan-city", property: "Knights Inn", location: "Michigan City, IN" },
  { id: "muncie-inn", property: "Muncie Inn", location: "Muncie, IN" },
  { id: "dunes-michigan-city", property: "Dunes Inn", location: "Michigan City, IN" },
  { id: "bliss-indianapolis", property: "Bliss Point Inn", location: "Indianapolis, IN" },
  { id: "bliss-wabash", property: "Bliss Point Inn", location: "Wabash, IN" },
  { id: "bliss-marion", property: "Bliss Point Inn", location: "Marion, IN" },
  { id: "roadway-indianapolis", property: "Roadway Inn", location: "Indianapolis, IN" },
  { id: "express-northwood", property: "Express Motel", location: "Northwood, OH" },
];

export interface PortfolioProperty {
  id: string;
  property: string;
  location: string;
  group: "major" | "pip";
  project?: MajorProject;
  revenue?: RevenueRecord;
}

const listedIds = new Set([...majorProjects, ...pipProperties].map((property) => property.id));

// Preserve historical names from both supplied lists without merging their financial records.
export const portfolioProperties: PortfolioProperty[] = [
  ...majorProjects.map((project) => ({
    id: project.id,
    property: project.property,
    location: project.location,
    group: "major" as const,
    project,
    revenue: revenueRecords.find((record) => record.id === project.id),
  })),
  ...pipProperties.map((property) => ({
    ...property,
    group: "pip" as const,
    revenue: revenueRecords.find((record) => record.id === property.id),
  })),
  ...revenueRecords.filter((record) => !listedIds.has(record.id)).map((record) => ({
    id: record.id,
    property: record.property,
    location: record.location,
    group: "pip" as const,
    revenue: record,
  })),
];

export function findPortfolioProperty(id: string) {
  return portfolioProperties.find((property) => property.id === id) ?? null;
}