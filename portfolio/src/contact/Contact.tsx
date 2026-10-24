import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "../data/site";
import { track } from "../lib/track";
import ContactForm from "./ContactForm";
import PageHero from "../components/PageHero";

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Calendly's widget script is ~100 KB and slow to boot, so it only loads
 * once the embed is near the viewport. A skeleton holds the space until the
 * widget reports it has rendered, which avoids a blank white gap and CLS.
 */
function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const name = (e.data as { event?: string })?.event;
      if (!name?.startsWith("calendly.")) return;
      setReady(true);
      if (name === "calendly.event_scheduled") track("calendly_booking");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const load = () => {
      if (document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) {
        (window as { Calendly?: { initInlineWidgets?: () => void } }).Calendly?.initInlineWidgets?.();
        return;
      }
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative w-full" style={{ height: "700px" }}>
      {!ready && (
        <div
          className="absolute inset-0 rounded-2xl border border-brand-border bg-brand-light p-6 animate-pulse"
          aria-hidden="true"
        >
          <div className="h-5 w-1/2 rounded bg-brand-border mb-4" />
          <div className="h-4 w-1/3 rounded bg-brand-border mb-10" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="aspect-square rounded-full bg-brand-light" />
            ))}
          </div>
        </div>
      )}
      <div
        ref={ref}
        className="calendly-inline-widget relative h-full w-full"
        data-url={`${BUSINESS.calendlyUrl}?primary_color=18aeb4&hide_gdpr_banner=1`}
        style={{ minWidth: 0 }}
      />
      <noscript>
        <a href={BUSINESS.calendlyUrl} className="underline">
          Book a {BUSINESS.callLength} call on Calendly
        </a>
      </noscript>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="bg-white px-6 mt-4 md:mt-12 pb-12">
      <PageHero
        eyebrow="Contact"
        title="Tell us what your business needs"
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        intro={
          <>
            {/* TODO(human): state a reply time here once you can commit to one. */}
            Tell us what you are looking for and we'll get back to you, or book
            a free {BUSINESS.callLength} call. Either way you'll get a straight
            answer on fit, timeline and cost, with no obligation.
          </>
        }
      />

      <section
        id="message"
        aria-labelledby="message-heading"
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-start"
      >
        <div>
          <h2 id="message-heading" className="text-2xl md:text-3xl font-semibold text-black leading-snug">
            Send a message
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A few lines is enough. Tell us what you need help with, who it is
            for and any timing that matters, and we'll come back with questions
            or a useful next step.
          </p>
          <dl className="mt-8 space-y-4 text-gray-700">
            <div>
              <dt className="text-xs font-mono text-gray-500 tracking-widest uppercase">Working with</dt>
              <dd>Businesses and teams worldwide through remote collaboration</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>

      <section
        id="book"
        aria-labelledby="book-heading"
        className="max-w-5xl mx-auto mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-start"
      >
        <div className="md:sticky md:top-36">
          <h2 id="book-heading" className="text-2xl md:text-3xl font-semibold text-black leading-snug">
            Or book a free {BUSINESS.callLength} call
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Thirty minutes is enough to work out whether we're the right fit,
            what kind of support you need and what a sensible next step could be.
            Add a note about your goals when you book and we'll read it before the
            call.
          </p>
        </div>
        <CalendlyEmbed />
      </section>
    </div>
  );
}
