import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-white px-6 mt-22 md:mt-34">
      <h1 className="text-center text-heading-4 md:text-heading-2 font-OutfitMedium text-black mb-8 md:mb-14">
        Book a free 15-min call
      </h1>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left sticky — desktop */}
        <div className="hidden md:block md:w-5/12 sticky top-32 self-start">
          <h2 className="text-3xl font-OutfitSemiBold text-black leading-snug">
            Tell us what you're building
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Fifteen minutes is usually enough to work out whether we're the
            right fit, roughly what your project involves, and what it would
            cost. No obligation, and you'll get a straight answer either way.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Prefer to write first? Book any slot and add a note about the
            project — we'll read it before the call.
          </p>
        </div>

        {/* Left text — mobile */}
        <div className="md:hidden mb-2">
          <h2 className="text-2xl font-bold text-black text-center">
            Tell us what you're building
          </h2>
          <p className="mt-3 text-gray-500 text-center leading-relaxed">
            Fifteen minutes to work out whether we're the right fit, what your
            project involves, and what it would cost.
          </p>
        </div>

        {/* Calendly inline embed */}
        <div
          className="calendly-inline-widget w-full md:w-7/12"
          data-url="https://calendly.com/gidevtech/30min?primary_color=2ec4c7"
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </section>
  );
}
