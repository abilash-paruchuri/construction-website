import { useState } from "react";
import { ChevronDown, Download, Search } from "lucide-react";
import { Counter, Reveal, SectionTitle, useInView } from "./ui";
import PropertyPhoto from "./PropertyPhoto";
import PropertyDialog from "./PropertyDialog";
import { getPropertyPhoto } from "../propertyPhotos";
import {
  changeLabel,
  findPortfolioProperty,
  formatRevenue,
  percentageChange,
  renovationTypes,
  revenueRecords,
  type RenovationType,
  type RevenueRecord,
  type PortfolioProperty,
} from "../portfolio";

type SortOrder = "newest" | "oldest" | "growth" | "revenue";

const highlights = revenueRecords
  .filter((record) => ["days-indianapolis", "days-kokomo"].includes(record.id))
  .sort((a, b) => a.location.localeCompare(b.location));

function RevenueHighlight({ record }: { record: RevenueRecord }) {
  const { ref, seen } = useInView<HTMLElement>(0.25);
  return (
    <Reveal>
      <article ref={ref} className="border-t border-gold/40 pt-6">
        <PropertyPhoto propertyId={record.id} className="mb-6" imageClassName="aspect-[16/9] rounded-md" showCaption />
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-display text-lg font-bold text-teal-brand">{record.property}</p>
            <p className="mt-1 text-sm text-teal-deep/70">{record.location}</p>
            <p className="mt-2 text-[10px] font-medium tracking-wider text-teal-soft uppercase">{record.year} / Full Renovation</p>
          </div>
          <div className="text-right">
            <p className="font-serif-i text-5xl font-semibold leading-none text-teal-brand sm:text-6xl">+<Counter to={percentageChange(record) ?? 0} suffix="%" /></p>
            <p className="mt-2 text-[10px] tracking-wider text-teal-deep/65 uppercase">Reported Revenue Growth</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {(["before", "after"] as const).map((period) => (
            <div key={period}>
              <p className="mb-2 flex justify-between text-xs tabular-nums text-teal-deep/75">
                <span>{period === "before" ? "Before renovation" : "After renovation"}</span>
                <span className={period === "after" ? "font-semibold text-teal-brand" : ""}>{formatRevenue(record[period])}</span>
              </p>
              <div aria-hidden="true" className="h-1.5 overflow-hidden bg-teal-brand/10">
                <div className={`h-full transition-[width] duration-1000 ease-out ${period === "after" ? "bg-gold" : "bg-teal-brand/35"}`} style={{ width: `${seen ? (record[period] / record.after) * 100 : 0}%`, transitionDelay: period === "after" ? "200ms" : "0ms" }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function sortRecords(records: RevenueRecord[], order: SortOrder) {
  return [...records].sort((a, b) => {
    if (order === "oldest") return a.year - b.year;
    if (order === "revenue") return b.after - a.after;
    if (order === "growth") {
      const aGrowth = percentageChange(a);
      const bGrowth = percentageChange(b);
      if (aGrowth === null) return bGrowth === null ? b.after - a.after : 1;
      if (bGrowth === null) return -1;
      return bGrowth - aGrowth;
    }
    return b.year - a.year;
  });
}

function downloadRecords(records: RevenueRecord[]) {
  const rows: (string | number)[][] = [
    ["Property", "Location", "Year", "Project Type", "Revenue Before (USD)", "Revenue After (USD)", "Percentage Change", "Absolute Change (USD)"],
    ...records.map((record) => [
      record.property,
      record.location,
      record.year,
      record.type,
      record.before,
      record.after,
      percentageChange(record) === null ? "Absolute Revenue Growth" : `${percentageChange(record)}%`,
      record.after - record.before,
    ]),
  ];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "wishnu-renovation-impact.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function RenovationImpact() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | RenovationType>("All");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<PortfolioProperty | null>(null);
  const term = query.trim().toLowerCase();
  const filtered = sortRecords(revenueRecords.filter((record) =>
    (type === "All" || record.type === type) &&
    `${record.property} ${record.location} ${record.year} ${record.type}`.toLowerCase().includes(term)
  ), sort);
  const visible = showAll ? filtered : filtered.slice(0, 8);
  const hasFilters = term !== "" || type !== "All" || sort !== "newest";
  const reset = () => {
    setQuery("");
    setType("All");
    setSort("newest");
    setShowAll(false);
  };

  return (
    <section id="results" className="bg-parchment/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="A Focus on Revenue Enhancement" title="The Impact of Revitalization" />
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-teal-deep/75 md:text-base">
            Strategic hotel improvements can unlock new revenue streams and strengthen a property's position.
            These historical results show the range of WishNu's renovation work.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
          {highlights.map((record) => <RevenueHighlight key={record.id} record={record} />)}
        </div>

        <Reveal className="mx-auto mt-10 max-w-5xl">
          <p className="text-sm leading-relaxed text-teal-deep/75">
            Reopenings at <strong className="font-medium text-teal-brand">Bliss Point Inn, Kokomo</strong> and
            <strong className="font-medium text-teal-brand"> Days Inn, Northwood</strong> established new revenue
            streams of $1,000,000 and $800,000. Targeted partial renovations also delivered reported gains of
            50% at Anderson Inn and 40% at King's Inn.
          </p>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-display text-xl font-bold text-teal-brand sm:text-2xl">Quick Snapshot of Renovation Impact</h3>
              <p className="text-xs text-teal-deep/60">2013-2024 / Company-reported revenue in USD</p>
            </div>
          </Reveal>

          <div className="mt-7 grid items-end gap-4 md:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_auto]">
            <label className="block min-w-0">
              <span className="mb-2 block text-[10px] font-medium tracking-wider text-teal-soft uppercase">Find a Property</span>
              <span className="relative block">
                <Search size={17} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-teal-deep/50" />
                <input
                  type="search"
                  value={query}
                  aria-controls="renovation-results-table"
                  placeholder="Hotel, city or year..."
                  onChange={(event) => { setQuery(event.target.value); setShowAll(false); }}
                  className="w-full rounded-md border border-gold/40 bg-cream/70 py-3 pr-3 pl-10 text-xs text-teal-deep placeholder:text-teal-deep/45"
                />
              </span>
            </label>
            <label className="block min-w-0">
              <span className="mb-2 block text-[10px] font-medium tracking-wider text-teal-soft uppercase">Project Type</span>
              <select value={type} aria-controls="renovation-results-table" onChange={(event) => { setType(event.target.value as "All" | RenovationType); setShowAll(false); }} className="w-full rounded-md border border-gold/40 bg-cream/70 px-3 py-3 text-xs text-teal-deep">
                <option value="All">All project types</option>
                {renovationTypes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="mb-2 block text-[10px] font-medium tracking-wider text-teal-soft uppercase">Sort Results</span>
              <select value={sort} aria-controls="renovation-results-table" onChange={(event) => { setSort(event.target.value as SortOrder); setShowAll(false); }} className="w-full rounded-md border border-gold/40 bg-cream/70 px-3 py-3 text-xs text-teal-deep">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="growth">Highest percentage growth</option>
                <option value="revenue">Highest revenue after</option>
              </select>
            </label>
            <button type="button" onClick={() => downloadRecords(filtered)} disabled={filtered.length === 0} className="inline-flex h-[43px] items-center justify-center gap-2 rounded-md border border-teal-brand/35 px-4 text-xs font-medium text-teal-brand transition-colors hover:bg-teal-brand hover:text-cream disabled:cursor-not-allowed disabled:opacity-40">
              <Download size={15} /> Download CSV
            </button>
          </div>

          <div className="mt-6 overflow-x-auto border-y border-gold/40" role="region" aria-label="Renovation revenue table, scroll horizontally on smaller screens" tabIndex={0}>
            <table id="renovation-results-table" className="w-full min-w-[920px] border-collapse text-left text-xs sm:text-sm">
              <caption className="sr-only">WishNu Construction's company-provided revenue snapshots, before and after hotel improvements. Search and filter controls determine the displayed records.</caption>
              <thead className="bg-teal-deep text-cream">
                <tr>
                  <th scope="col" className="px-4 py-4 font-medium">Property</th>
                  <th scope="col" className="px-4 py-4 font-medium">Year</th>
                  <th scope="col" className="w-[220px] px-4 py-4 font-medium">Project Type</th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">Revenue Before</th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">Revenue After</th>
                  <th scope="col" className="px-4 py-4 text-right font-medium">Revenue Change</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((record) => {
                  const growth = percentageChange(record);
                  return (
                    <tr key={record.id} className="border-b border-gold/20 transition-colors last:border-b-0 odd:bg-cream/45 hover:bg-gold/10">
                      <th scope="row" className="px-4 py-4 font-medium">
                        <button type="button" onClick={() => setSelected(findPortfolioProperty(record.id))} aria-haspopup="dialog" aria-controls="results-property-dialog" aria-label={`View photo and details for ${record.property}, ${record.location}`} className="group flex min-w-56 items-center gap-3 text-left">
                          <PropertyPhoto propertyId={record.id} className="w-16 shrink-0" imageClassName="h-12 rounded-sm" />
                          <span>
                            <span className="block font-medium text-teal-brand transition-colors group-hover:text-teal-soft">{record.property}</span>
                            <span className="mt-1 block text-[11px] font-normal text-teal-deep/65">{record.location}</span>
                            <span className="mt-1 block text-[9px] font-normal text-teal-soft/70">{getPropertyPhoto(record.id).kind === "representative" ? "Representative photo / view details" : "View photo & details"}</span>
                          </span>
                        </button>
                      </th>
                      <td className="px-4 py-4 tabular-nums text-teal-deep/70">{record.year}</td>
                      <td className="px-4 py-4 text-xs leading-relaxed text-teal-deep/75">{record.type}</td>
                      <td className="px-4 py-4 text-right whitespace-nowrap tabular-nums text-teal-deep/70">{formatRevenue(record.before)}</td>
                      <td className="px-4 py-4 text-right font-medium whitespace-nowrap tabular-nums text-teal-brand">{formatRevenue(record.after)}</td>
                      <td className={`px-4 py-4 text-right whitespace-nowrap tabular-nums ${growth !== null && growth < 0 ? "text-maroon" : growth === 0 ? "text-teal-deep/60" : "text-teal-brand"}`}>
                        <span className="font-semibold">{changeLabel(record)}</span>
                        {growth === null && <span className="mt-1 block text-[10px] font-normal">+{formatRevenue(record.after - record.before)} absolute growth</span>}
                      </td>
                    </tr>
                  );
                })}
                {visible.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-teal-deep/70">No properties match your search. <button type="button" onClick={reset} className="ml-1 font-medium text-teal-brand underline underline-offset-4">Clear filters</button></td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <p role="status" aria-live="polite" className="text-teal-deep/65">Showing {visible.length} of {filtered.length} matching records{filtered.length !== revenueRecords.length ? ` (${revenueRecords.length} total)` : ""}.</p>
            <div className="flex items-center gap-6">
              {hasFilters && <button type="button" onClick={reset} className="text-teal-soft underline underline-offset-4">Reset filters</button>}
              {filtered.length > 8 && (
                <button type="button" onClick={() => setShowAll(!showAll)} aria-expanded={showAll} aria-controls="renovation-results-table" className="inline-flex items-center gap-2 font-semibold text-teal-brand">
                  {showAll ? "Show fewer records" : `Show all ${filtered.length} records`}
                  <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 max-w-4xl text-[11px] leading-relaxed text-teal-deep/60">
            Figures are company-provided historical revenue snapshots; results vary by property and are not a
            guarantee of future performance. Percentage changes are rounded. A $0 starting revenue is
            shown as absolute revenue growth rather than a percentage. This schedule contains 19 revenue
            records within the company's reported portfolio of 20 completed projects.
          </p>
        </div>
      </div>
      <PropertyDialog id="results-property-dialog" property={selected} onClose={() => setSelected(null)} />
    </section>
  );
}