import {
  CheckCircle2,
} from "lucide-react";

import { COMPANY } from "../../data";

export default function ContactSuccess({
  onReset,
}) {
  return (
    <div
      role="status"

      className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
    >

      <div className="animate-pop flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold text-teal-deep shadow-xl shadow-gold/40">

        <CheckCircle2
          size={52}
        />

      </div>

      <h3 className="font-display mt-6 text-2xl font-bold text-teal-brand">

        Thank you!

      </h3>

      <p className="mt-2 max-w-sm text-teal-deep/75">

        Your enquiry has been submitted successfully.

        Our team will get back to you shortly.

        For a time-sensitive project, you can also call us at{" "}

        {COMPANY.phone}.

      </p>

      <button
        type="button"

        onClick={onReset}

        className="btn-outline font-display mt-6 rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase"
      >

        Send another message

      </button>

    </div>
  );
}