import { useState } from "react";

import { Reveal, SectionTitle } from "./ui";

import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import ContactSuccess from "./contact/ContactSuccess";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="Get in touch" title="Start with a conversation" />
        <Reveal>
          <p className="mx-auto mt-5 max-w-2xl text-center leading-7 text-teal-deep/75">
            Tell us about the property and the work you have in mind. We’ll follow up to discuss next steps.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <Reveal from="left" className="lg:col-span-2">
            <ContactInfo />
          </Reveal>
          <Reveal from="right" className="lg:col-span-3">
            <div className="frame h-full rounded-md p-6 md:p-10">
              {submitted ? (
                <ContactSuccess onReset={() => setSubmitted(false)} />
              ) : (
                <ContactForm onSuccess={() => setSubmitted(true)} />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}