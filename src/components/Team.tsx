import { Reveal, SectionTitle, Tilt } from "./ui";
import { branches, ceo, type Person } from "../data";

function PersonCard({ p, big = false }: { p: Person; big?: boolean }) {
  return (
    <Tilt max={12} className="mx-auto">
      <div
        className={`frame group mx-auto rounded-2xl p-3 text-center ${big ? "w-60" : "w-48"}`}
      >
        <div className="rounded-t-[999px] bg-gradient-to-b from-gold-light to-gold p-1">
          <img
            src={p.img}
            alt={`${p.name}, ${p.role}`}
            loading="lazy"
            className={`w-full rounded-t-[999px] object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
              big ? "h-60" : "h-44"
            }`}
          />
        </div>
        <h4 className={`font-display mt-3 font-bold text-teal-brand ${big ? "text-lg" : "text-sm"}`}>{p.name}</h4>
        <p className="font-serif-i text-base leading-tight font-semibold text-gold italic">{p.role}</p>
      </div>
    </Tilt>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-parchment/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="The People Behind The Build" title="Our Team Structure" />
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-teal-deep/75">
            A clear chain of leadership — from vision to the final handover — so every project has an accountable
            owner at each step.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center">
          <Reveal from="zoom">
            <PersonCard p={ceo} big />
          </Reveal>
          <div className="org-stem" />

          <div className="org-row grid w-full gap-12 lg:grid-cols-3 lg:gap-6">
            {branches.map((b, i) => (
              <div key={i} className="org-branch">
                <Reveal delay={i * 150}>
                  <PersonCard p={b.head} />
                </Reveal>
                <div className="mt-0 flex flex-col items-center">
                  {b.members.map((m, j) => (
                    <div key={j} className="flex flex-col items-center">
                      <div className="org-stem" />
                      <Reveal delay={300 + i * 150 + j * 150}>
                        <PersonCard p={m} />
                      </Reveal>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
