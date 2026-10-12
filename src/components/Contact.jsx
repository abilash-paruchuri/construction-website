import { useState } from "react";

import {
  Reveal,
  SectionTitle,
} from "./ui";

import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";
import ContactSuccess from "./contact/ContactSuccess";

export default function Contact() {
  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  return (
    <section
      id="contact"

      className="relative overflow-hidden py-20 lg:py-28"
    >

      <div className="mx-auto max-w-7xl px-5">

        <SectionTitle
          eyebrow="Get In Touch"

          title="Let’s Build Something Timeless"
        />

        <Reveal>

          <p className="mx-auto mt-5 max-w-2xl text-center text-teal-deep/75">

            Planning a new hotel or renovating an existing one?

            Fill out the form and our team will get back to you shortly.

          </p>

        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">

          {/* LEFT SIDE */}

          <Reveal
            from="left"

            className="lg:col-span-2"
          >

            <ContactInfo />

          </Reveal>

          {/* RIGHT SIDE */}

          <Reveal
            from="right"

            className="lg:col-span-3"
          >

            <div className="frame h-full rounded-3xl p-6 md:p-10">

              {submitted ? (

                <ContactSuccess
                  onReset={() =>
                    setSubmitted(
                      false
                    )
                  }
                />

              ) : (

                <ContactForm
                  onSuccess={() =>
                    setSubmitted(
                      true
                    )
                  }
                />

              )}

            </div>

          </Reveal>

        </div>

      </div>

    </section>
  );
}