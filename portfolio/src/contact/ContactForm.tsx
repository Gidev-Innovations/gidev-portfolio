import { useState, type FormEvent } from "react";
import { BUSINESS } from "../data/site";
import { track } from "../lib/track";

const BUDGETS = [
  "Not sure yet",
  "Under KES 100,000",
  "KES 100,000 – 300,000",
  "KES 300,000 – 1,000,000",
  "Over KES 1,000,000",
];

/**
 * Web3Forms access key. Public by design: it can only submit to this form's
 * inbox. Restrict it to gidevtech.com in the Web3Forms dashboard.
 */
const WEB3FORMS_ACCESS_KEY = "ad3f9885-e337-4815-bf81-768e0647c4f9";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30";

function FormUnavailable() {
  const number = BUSINESS.whatsappNumber;
  return (
    <div role="alert" className="rounded-2xl bg-brand-light border border-brand-border p-6">
      <p className="text-lg font-semibold text-gray-950">
        Form temporarily unavailable
        {number && (
          <>
            {" "}— WhatsApp us at{" "}
            <a
              href={`https://wa.me/${number.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark underline underline-offset-4"
            >
              {number}
            </a>
          </>
        )}
      </p>
      {!number && (
        <p className="mt-1 text-gray-600 leading-relaxed">
          Please{" "}
          <a href="#book" className="inline-flex min-h-11 items-center text-brand-dark underline underline-offset-4">
            book a call below
          </a>{" "}
          instead.
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${data.name || "the website"}`,
          from_name: "gidevtech.com",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!json.success) throw new Error("Web3Forms rejected the submission");
      setStatus("sent");
      track("contact_form_submit", { budget: String(data.budget ?? "") });
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-brand-light border border-brand-border p-8">
        <p className="text-xl font-semibold text-gray-950 mb-2">Thanks, message received.</p>
        <p className="text-gray-600 leading-relaxed">
          We read every enquiry and will get back to you soon. If it's easier
          to talk it through, you can also book a call below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot: real visitors never see or fill this. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="cf-name" className="block font-medium text-gray-900 mb-1.5">
          Your name
        </label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-contact" className="block font-medium text-gray-900 mb-1.5">
          Phone, WhatsApp or email
        </label>
        <input
          id="cf-contact"
          name="contact"
          type="text"
          required
          autoComplete="email"
          placeholder="e.g. 0712 345 678 or you@company.co.ke"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="cf-project" className="block font-medium text-gray-900 mb-1.5">
          What are you building?
        </label>
        <textarea
          id="cf-project"
          name="message"
          required
          rows={5}
          placeholder="A few lines is plenty: what it should do, who it's for, and any deadline."
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="cf-budget" className="block font-medium text-gray-900 mb-1.5">
          Rough budget
        </label>
        <select id="cf-budget" name="budget" defaultValue={BUDGETS[0]} className={inputClass}>
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white hover:bg-brand-dark disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {status === "error" && <FormUnavailable />}
    </form>
  );
}
