import { useEffect, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { BUSINESS } from "../data/site";
import { budgetRanges } from "../data/budget";
import { serviceGroups, services } from "../data/services";
import { track } from "../lib/track";

/**
 * Web3Forms access key. Public by design: it can only submit to this form's
 * inbox. Restrict it to gidevtech.com in the Web3Forms dashboard.
 */
const WEB3FORMS_ACCESS_KEY = "ad3f9885-e337-4815-bf81-768e0647c4f9";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "service" | "budget" | "message";
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = ["name", "email", "service", "budget", "message"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(field: Field, value: string): string | undefined {
  const text = value.trim();
  switch (field) {
    case "name":
      return text.length < 2 ? "Enter your name." : undefined;
    case "email":
      if (!text) return "Enter your email address.";
      return EMAIL_PATTERN.test(text) ? undefined : "Enter a valid email address, like you@company.co.ke.";
    case "service":
      return text ? undefined : "Choose the service you need, or “Not sure yet”.";
    case "budget":
      return text ? undefined : "Choose a budget range, or “Not sure yet”.";
    case "message":
      return text.length < 20 ? "Tell us a little more, at least a sentence or two (20 characters)." : undefined;
  }
}

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30";

function FormUnavailable() {
  const number = BUSINESS.whatsappNumber;
  return (
    <div role="alert" className="rounded-2xl bg-brand-light border border-brand-border p-6">
      <p className="text-lg font-semibold text-gray-950">
        We couldn't send that. Nothing was lost on your side.
      </p>
      <p className="mt-1 text-gray-600 leading-relaxed">
        Please try again in a moment
        {number ? (
          <>
            , or WhatsApp us at{" "}
            <a
              href={`https://wa.me/${number.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark underline underline-offset-4"
            >
              {number}
            </a>
          </>
        ) : (
          <>
            , or{" "}
            <a href="#book" className="inline-flex min-h-11 items-center text-brand-dark underline underline-offset-4">
              book a call below
            </a>{" "}
            instead
          </>
        )}
        .
      </p>
    </div>
  );
}

function FieldShell({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-medium text-gray-900">
        {label}
        {optional && <span className="ml-2 text-sm font-normal text-gray-600">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-1.5 text-sm text-gray-600">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const describe = (field: Field, hint = false) =>
    [hint ? `cf-${field}-hint` : null, errors[field] ? `cf-${field}-error` : null].filter(Boolean).join(" ") || undefined;
  const fieldProps = (field: Field, hint = false) => ({
    id: `cf-${field}`,
    name: field,
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": describe(field, hint),
    className: `${inputClass} ${errors[field] ? "border-red-600" : "border-gray-300"}`,
  });

  function onBlur(event: FocusEvent<HTMLFormElement>) {
    const target = event.target as unknown as HTMLInputElement;
    const field = target.name as Field;
    if (!FIELD_ORDER.includes(field) || !target.value) return;
    setErrors((current) => ({ ...current, [field]: validate(field, target.value) }));
  }

  function onInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target as unknown as HTMLInputElement;
    const field = target.name as Field;
    if (errors[field] && !validate(field, target.value)) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found: Errors = {};
    for (const field of FIELD_ORDER) found[field] = validate(field, data[field] ?? "");
    setErrors(found);
    const first = FIELD_ORDER.find((field) => found[field]);
    if (first) {
      form.querySelector<HTMLElement>(`#cf-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const serviceTitle = services.find((service) => service.id === data.service)?.title ?? "Not sure yet";
      const budget = budgetRanges.find((range) => range.value === data.budget)?.label ?? data.budget;
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "Not given",
          service: serviceTitle,
          budget,
          message: data.message,
          botcheck: data.botcheck ?? "",
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${data.name} (${serviceTitle})`,
          from_name: "gidevtech.com",
          replyto: data.email,
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!json.success) throw new Error("Web3Forms rejected the submission");
      setStatus("sent");
      track("contact_form_submit", { service: String(data.service ?? "") });
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-brand-border bg-brand-light p-8 focus:outline-none"
      >
        <p className="mb-2 text-xl font-semibold text-gray-950">Thanks, message received.</p>
        <p className="leading-relaxed text-gray-600">
          We read every enquiry and will get back to you by email. If it's easier to talk it through, you can also
          book a call below.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onBlur={onBlur} onInput={onInput} noValidate className="space-y-5">
      {/* Honeypot: real visitors never see or fill this. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell id="cf-name" label="Your name" error={errors.name}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required aria-required="true" />
        </FieldShell>
        <FieldShell id="cf-email" label="Email" error={errors.email}>
          <input {...fieldProps("email")} type="email" autoComplete="email" required aria-required="true" />
        </FieldShell>
      </div>

      <FieldShell id="cf-company" label="Company" optional>
        <input id="cf-company" name="company" type="text" autoComplete="organization" className={`${inputClass} border-gray-300`} />
      </FieldShell>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell id="cf-service" label="Service needed" error={errors.service}>
          <select {...fieldProps("service")} defaultValue="" required aria-required="true">
            <option value="" disabled>
              Select a service
            </option>
            {serviceGroups.map((group) => (
              <optgroup key={group} label={group}>
                {services
                  .filter((service) => service.group === group)
                  .map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
              </optgroup>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </FieldShell>
        <FieldShell id="cf-budget" label="Budget range" error={errors.budget}>
          <select {...fieldProps("budget")} defaultValue="" required aria-required="true">
            <option value="" disabled>
              Select a range
            </option>
            {budgetRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </FieldShell>
      </div>

      <FieldShell
        id="cf-message"
        label="Project details"
        hint="What do you need, who is it for, and is there a date that matters?"
        error={errors.message}
      >
        <textarea {...fieldProps("message", true)} rows={5} required aria-required="true" />
      </FieldShell>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gray-900 px-8 font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message" : ""}
      </p>
      {status === "error" && <FormUnavailable />}
    </form>
  );
}
