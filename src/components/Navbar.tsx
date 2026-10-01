import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY } from "../data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Experience" },
  { href: "#team", label: "Our Team" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#results", label: "Results" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/40 bg-cream/90 py-2 shadow-lg shadow-teal-deep/10 backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#home" aria-label="WishNu Construction & Development">
          <Logo />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display group relative text-[11px] font-semibold tracking-wider text-teal-brand uppercase"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a href={COMPANY.phoneHref} className="hidden items-center gap-2 text-sm font-medium text-teal-brand min-[1440px]:flex">
            <Phone size={16} className="text-gold" /> {COMPANY.phone}
          </a>
          <a href="#contact" className="btn-gold font-display rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase">
            Get a Quote
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-teal-brand xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        inert={!open}
        className={`overflow-hidden bg-cream/95 backdrop-blur-md transition-all duration-500 xl:hidden ${
          open ? "max-h-[560px] border-t border-gold/40" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display rounded-lg px-3 py-3 text-sm font-semibold tracking-widest text-teal-brand uppercase hover:bg-parchment"
            >
              {l.label}
            </a>
          ))}
          <a href={COMPANY.phoneHref} className="mt-2 flex items-center gap-2 px-3 text-teal-brand">
            <Phone size={16} className="text-gold" /> {COMPANY.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
