import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { COMPANY } from "../../data";

export default function ContactInfo() {
  const info = [
    {
      icon: MapPin,
      label: "Visit Us",
      value: COMPANY.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        COMPANY.address
      )}`,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: COMPANY.phone,
      href: COMPANY.phoneHref,
    },
    {
      icon: Mail,
      label: "Email Us",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
    },
  ];

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gold bg-gradient-to-br from-teal-deep via-teal-brand to-teal-deep p-8 text-cream shadow-2xl shadow-teal-deep/30">
      <svg
        viewBox="0 0 200 200"
        className="animate-spin-slow absolute -right-20 -bottom-20 h-72 w-72 opacity-10"
        fill="none"
        stroke="#ecd079"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="50"
            rx="10"
            ry="40"
            transform={`rotate(${i * 22.5} 100 100)`}
          />
        ))}

        <circle cx="100" cy="100" r="95" />
      </svg>

      <h3 className="font-display relative text-2xl font-bold text-gold-light">
        Contact Information
      </h3>

      <div className="relative mt-8 space-y-6">
        {info.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Visit Us" ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-teal-deep text-gold-light transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-teal-deep">
                <Icon size={20} />
              </div>

              <div>
                <div className="font-display text-xs tracking-widest text-gold-light uppercase">
                  {item.label}
                </div>

                <div
                  className={`mt-1 text-sm leading-relaxed text-cream/90 group-hover:underline ${
                    item.label === "Email Us" ? "break-all" : ""
                  }`}
                >
                  {item.label === "Visit Us" ? (
                    <address className="not-italic">
                      {COMPANY.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-xl border border-gold/60">
        <iframe
          title={`WishNu office at ${COMPANY.address}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            COMPANY.address
          )}&output=embed`}
          className="h-52 w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}