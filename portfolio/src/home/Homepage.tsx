import { Link } from "react-router-dom";
import ShowcaseTicker from "./ShowcaseTicker";
import Process from "./Process";
import HomeServices from "./HomeServices";
import Features from "./Features";
import PaymentsBlock from "./PaymentsBlock";
import HomeFaq from "./HomeFaq";
import SectionDivider from "../components/SectionDivider";

export default function Homepage() {
  return (
    <div className="text-black">
      {/* Hero — static on purpose: it is the LCP element, so it must paint
          from the pre-rendered HTML without waiting for JS. */}
      <section className="flex flex-col items-center justify-center text-center px-6 bg-white pt-32 md:pt-40 pb-16">
        <div
          className="flex items-center gap-2.5 mb-8 rounded-full px-4 py-1.5"
          style={{
            backgroundColor: "var(--color-brand-light)",
            border: "1px solid var(--color-brand-border)",
          }}
        >
          <span
            className="rounded-full"
            style={{
              width: "7px",
              height: "7px",
              backgroundColor: "var(--color-brand)",
            }}
            aria-hidden="true"
          />
          {/* TODO(human): swap for a concrete line, e.g. "2 project slots open for November". */}
          <span style={{ fontSize: "15px", color: "var(--color-brand-dark)" }}>
            Taking on new projects
          </span>
        </div>

        <h1
          className="font-bold text-black max-w-4xl mx-auto mb-6"
          style={{
            fontSize: "clamp(40px, 6.5vw, 84px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Web &amp; Mobile App Development Studio in{" "}
          <span className="text-brand-dark">
            Nairobi
          </span>
        </h1>

        <p
          className="text-gray-800 max-w-2xl mx-auto mb-3 px-2 font-medium"
          style={{ fontSize: "20px", lineHeight: 1.4 }}
        >
          Building Africa's next generation of scalable digital products.
        </p>
        <p
          className="text-gray-500 max-w-xl mx-auto mb-10 px-2"
          style={{ fontSize: "17px", lineHeight: 1.55 }}
        >
          We build web apps, online stores with M-Pesa checkout, and Android
          and iOS apps for businesses in Kenya and across East Africa.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center bg-gray-900 text-white rounded-full px-8 py-3.5 font-semibold hover:bg-brand-dark transition-colors duration-200"
            style={{ fontSize: "16px" }}
          >
            Book a free call
          </Link>
          <Link
            to="/contact#message"
            className="inline-flex min-h-12 items-center rounded-full px-8 py-3.5 font-semibold text-gray-900 border border-gray-300 hover:border-brand-dark hover:text-brand-dark transition-colors duration-200"
            style={{ fontSize: "16px" }}
          >
            Send us a message
          </Link>
        </div>

        {/* TODO(human): add one line of real proof (years in business,
            projects shipped, typical reply time) once the numbers are confirmed. */}
        <p className="mt-6 text-gray-500" style={{ fontSize: "14px" }}>
          Based in Nairobi · Mobile money &amp; card payments built in · Fixed
          scope and price before we start
        </p>
      </section>

      <ShowcaseTicker />
      <Process />
      <HomeServices />
      <SectionDivider />
      <Features />
      <PaymentsBlock />
      <SectionDivider />
      <HomeFaq />
    </div>
  );
}
