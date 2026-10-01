import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Reveal, SectionTitle } from "./ui";
import { COMPANY, GOOGLE_FORM_EMBED_URL } from "../data";

const field =
  "w-full rounded-lg border border-gold/50 bg-cream/80 px-4 py-3 text-sm text-teal-deep outline-none transition-all duration-300 placeholder:text-teal-deep/40 focus:border-teal-brand focus:bg-white focus:shadow-[0_0_0_4px_rgba(199,154,43,0.25)]";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${COMPANY.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New enquiry from ${data.name} - WishNu Construction`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const result: { success?: boolean | string } = await res.json();
      if (!res.ok || (result.success !== true && result.success !== "true")) throw new Error("failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const info = [
    { icon: MapPin, label: "Visit Us", value: COMPANY.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}` },
    { icon: Phone, label: "Call Us", value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: Mail, label: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="Get In Touch" title="Let’s Build Something Timeless" />
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center text-teal-deep/75">
            Planning a new hotel or renovating an existing one? Fill out the form and our team will get back to you
            shortly.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* info */}
          <Reveal from="left" className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gold bg-gradient-to-br from-teal-deep via-teal-brand to-teal-deep p-8 text-cream shadow-2xl shadow-teal-deep/30">
              <svg viewBox="0 0 200 200" className="animate-spin-slow absolute -right-20 -bottom-20 h-72 w-72 opacity-10" fill="none" stroke="#ecd079">
                {Array.from({ length: 16 }).map((_, i) => (
                  <ellipse key={i} cx="100" cy="50" rx="10" ry="40" transform={`rotate(${i * 22.5} 100 100)`} />
                ))}
                <circle cx="100" cy="100" r="95" />
              </svg>
              <h3 className="font-display relative text-2xl font-bold text-gold-light">Contact Information</h3>
              <div className="relative mt-8 space-y-6">
                {info.map((it) => (
                  <a key={it.label} href={it.href} target={it.label === "Visit Us" ? "_blank" : undefined} rel="noreferrer" className="group flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-teal-deep text-gold-light transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-teal-deep">
                      <it.icon size={20} />
                    </div>
                    <div>
                      <div className="font-display text-xs tracking-widest text-gold-light uppercase">{it.label}</div>
                      <div className={`mt-1 text-sm leading-relaxed text-cream/90 group-hover:underline ${it.label === "Email Us" ? "break-all" : ""}`}>
                        {it.label === "Visit Us" ? (
                          <address className="not-italic">{COMPANY.addressLines.map((line) => <span key={line} className="block">{line}</span>)}</address>
                        ) : it.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="relative mt-8 overflow-hidden rounded-xl border border-gold/60">
                <iframe
                  title={`WishNu office at ${COMPANY.address}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`}
                  className="h-52 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          {/* form */}
          <Reveal from="right" className="lg:col-span-3">
            <div className="frame h-full rounded-3xl p-6 md:p-10">
              {GOOGLE_FORM_EMBED_URL ? (
                <div className="relative">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-teal-brand">Your Hotel Project</h3>
                    <a href={GOOGLE_FORM_EMBED_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-soft underline underline-offset-4">
                      Open Google Form in a new tab
                    </a>
                  </div>
                  <iframe
                    title="WishNu Hotel Project Enquiry Google Form"
                    src={GOOGLE_FORM_EMBED_URL}
                    className="h-[1100px] w-full border-0"
                    loading="lazy"
                  >
                    Loading form...
                  </iframe>
                </div>
              ) : status === "success" ? (
                <div role="status" className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="animate-pop flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold text-teal-deep shadow-xl shadow-gold/40">
                    <CheckCircle2 size={52} />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-bold text-teal-brand">Thank you!</h3>
                  <p className="mt-2 max-w-sm text-teal-deep/75">
                    Your enquiry has been submitted. For a time-sensitive project, you can also call us at {COMPANY.phone}.
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-outline font-display mt-6 rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} aria-busy={status === "sending"} className="relative space-y-5">
                  <h3 className="font-display text-2xl font-bold text-teal-brand">Send Us a Message</h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">Full Name *</span>
                      <input required name="name" type="text" autoComplete="name" placeholder="Your name" className={field} />
                    </label>
                    <label className="block">
                      <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">Email *</span>
                      <input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
                    </label>
                    <label className="block">
                      <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">Phone</span>
                      <input name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" className={field} />
                    </label>
                    <label className="block">
                      <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">Project Type *</span>
                      <select required name="project_type" defaultValue="" className={field}>
                        <option value="" disabled>Select a service</option>
                        <option>Ground-Up Hotel Construction</option>
                        <option>Full Renovation or Conversion</option>
                        <option>PIP or Partial Renovation</option>
                        <option>Closed-Property Reopening</option>
                        <option>Incomplete Construction Completion</option>
                        <option>Minor Upgrades & Maintenance</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">Project Location</span>
                    <input name="location" type="text" placeholder="City, State" className={field} />
                  </label>
                  <label className="block">
                    <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">Message *</span>
                    <textarea required name="message" rows={5} placeholder="Tell us about your project…" className={`${field} resize-none`} />
                  </label>
                  {/* honeypot */}
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                  {status === "error" && (
                    <p role="alert" className="rounded-lg bg-maroon/10 px-4 py-3 text-sm text-maroon">
                      Something went wrong. Please try again or email us at{" "}
                      <a className="underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-gold font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-widest uppercase disabled:opacity-70 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
