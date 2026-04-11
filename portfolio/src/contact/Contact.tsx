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
        Get in touch
      </h1>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Left sticky — desktop */}
        <div className="hidden md:block md:w-5/12 sticky top-32 self-start">
          <h2 className="text-3xl font-OutfitSemiBold text-black leading-snug">
            Let's Create an unforgettable Brand together
          </h2>
        </div>

        {/* Left text — mobile */}
        <h2 className="md:hidden text-2xl font-bold text-black text-center mb-2">
          Let's Create an unforgettable Brand together
        </h2>

        {/* Calendly inline embed */}
        <div
          className="calendly-inline-widget w-full md:w-7/12"
          data-url="https://calendly.com/sejokarizz/30min?primary_color=2ec4c7"
          style={{ minWidth: "320px", height: "700px" }}
        />
      </div>
    </section>
  );
}
