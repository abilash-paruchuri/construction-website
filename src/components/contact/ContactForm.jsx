import { useState } from "react";

import {
  Loader2,
  Send,
} from "lucide-react";

import {
  COMPANY,
  CONTACT_FORM_ENDPOINT,
} from "../../data";

import { field } from "./contactStyles";

export default function ContactForm({
  onSuccess,
}) {
  const [status, setStatus] =
    useState("idle");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (
      status === "sending"
    ) {
      return;
    }

    const form =
      e.currentTarget;

    const formData =
      new FormData(form);

    const data =
      Object.fromEntries(
        formData.entries()
      );

    // Honeypot spam protection
    if (data._honey) {
      form.reset();

      onSuccess();

      return;
    }

    setStatus("sending");

    setErrorMessage("");

    try {

      const response =
        await fetch(
          CONTACT_FORM_ENDPOINT,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body: JSON.stringify({
              name:
                data.name,

              email:
                data.email,

              phone:
                data.phone,

              projectType:
                data.project_type,

              location:
                data.location,

              message:
                data.message,

              honey:
                data._honey ||
                "",
            }),
          }
        );

      const result =
        await response.json();

      console.log(
        "Apps Script response:",
        result
      );

      if (
        !result.success
      ) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to submit enquiry."
        );
      }

      form.reset();

      setStatus("idle");

      onSuccess();

    } catch (error) {

      console.error(
        "Contact submission failed:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Something went wrong. Please try again."
      );

      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}

      aria-busy={
        status === "sending"
      }

      className="relative space-y-5"
    >

      <h3 className="font-display text-2xl font-bold text-teal-brand">

        Send Us a Message

      </h3>

      <div className="grid gap-5 sm:grid-cols-2">

        {/* Full Name */}

        <label className="block">

          <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">

            Full Name *

          </span>

          <input
            required

            name="name"

            type="text"

            autoComplete="name"

            placeholder="Your name"

            className={field}
          />

        </label>

        {/* Email */}

        <label className="block">

          <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">

            Email *

          </span>

          <input
            required

            name="email"

            type="email"

            autoComplete="email"

            placeholder="you@example.com"

            className={field}
          />

        </label>

        {/* Phone */}

        <label className="block">

          <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">

            Phone *

          </span>

          <input
            required

            name="phone"

            type="tel"

            autoComplete="tel"

            placeholder="(555) 123-4567"

            className={field}
          />

        </label>

        {/* Project Type */}

        <label className="block">

          <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">

            Project Type *

          </span>

          <select
            required

            name="project_type"

            defaultValue=""

            className={field}
          >

            <option
              value=""
              disabled
            >

              Select a service

            </option>

            <option value="Ground-Up Hotel Construction">

              Ground-Up Hotel Construction

            </option>

            <option value="Full Renovation or Conversion">

              Full Renovation or Conversion

            </option>

            <option value="PIP or Partial Renovation">

              PIP or Partial Renovation

            </option>

            <option value="Closed-Property Reopening">

              Closed-Property Reopening

            </option>

            <option value="Incomplete Construction Completion">

              Incomplete Construction Completion

            </option>

            <option value="Minor Upgrades & Maintenance">

              Minor Upgrades & Maintenance

            </option>

            <option value="Other">

              Other

            </option>

          </select>

        </label>

      </div>

      {/* Project Location */}

      <label className="block">

        <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">

          Project Location *

        </span>

        <input
          required

          name="location"

          type="text"

          placeholder="City, State"

          className={field}
        />

      </label>

      {/* Message */}

      <label className="block">

        <span className="font-display mb-1.5 block text-xs font-semibold tracking-widest text-teal-brand uppercase">

          Message *

        </span>

        <textarea
          required

          name="message"

          rows={5}

          placeholder="Tell us about your project..."

          className={`${field} resize-none`}
        />

      </label>

      {/* Spam protection */}

      <input
        type="text"

        name="_honey"

        className="hidden"

        tabIndex={-1}

        autoComplete="off"
      />

      {/* Error message */}

      {status ===
        "error" && (

        <div
          role="alert"

          className="rounded-lg bg-maroon/10 px-4 py-3 text-sm text-maroon"
        >

          <p>

            {errorMessage ||
              "Something went wrong. Please try again."}

          </p>

          <p className="mt-1">

            You can also email us at{" "}

            <a
              className="underline"

              href={`mailto:${COMPANY.email}`}
            >

              {
                COMPANY.email
              }

            </a>

            .

          </p>

        </div>

      )}

      {/* Submit */}

      <button
        type="submit"

        disabled={
          status ===
          "sending"
        }

        className="btn-gold font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-widest uppercase disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >

        {status ===
        "sending" ? (

          <>

            <Loader2
              size={18}

              className="animate-spin"
            />

            Sending...

          </>

        ) : (

          <>

            Send Message

            <Send
              size={16}
            />

          </>

        )}

      </button>

    </form>
  );
}