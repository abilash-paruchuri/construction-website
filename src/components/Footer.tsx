import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY, COMPANY_EXPERIENCE } from "../data";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Experience", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Project Portfolio", href: "#projects" },
  { label: "Renovation Impact", href: "#results" },
  { label: "Hotel Inspiration", href: "#inspiration" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ onReplayWelcome }: { onReplayWelcome?: () => void }) {
  return (
    <footer className="relative bg-teal-deep text-cream">
      <div className="h-1 bg-gold" />
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo light size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Revitalizing hotels since {COMPANY_EXPERIENCE.since}. Full renovations, property reopenings,
              PIP improvements and a new chapter in ground-up development.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] text-gold-light uppercase">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-all hover:pl-2 hover:text-gold-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.14em] text-gold-light uppercase">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`} target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-gold-light">
                  <address className="not-italic">{COMPANY.addressLines.map((line) => <span key={line} className="block">{line}</span>)}</address>
                </a>
              </li>
              <li className="flex gap-3"><Phone size={18} className="shrink-0 text-gold" /> <a href={COMPANY.phoneHref}>{COMPANY.phone}</a></li>
              <li className="flex gap-3"><Mail size={18} className="shrink-0 text-gold" /> <a href={`mailto:${COMPANY.email}`} className="break-all">{COMPANY.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gold/30 pt-6 text-center text-xs tracking-wider text-cream/60">
          © {new Date().getFullYear()} WishNu Construction &amp; Development. All rights reserved.
          {onReplayWelcome && <button type="button" onClick={onReplayWelcome} className="mx-auto mt-4 block text-[10px] text-gold-light/80 underline underline-offset-4 transition-colors hover:text-gold-light">Replay the welcome experience</button>}
        </div>
      </div>
    </footer>
  );
}
