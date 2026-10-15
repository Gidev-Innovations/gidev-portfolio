import { Settings } from "lucide-react";
import { faqs } from "../data/faqs";
import FaqsItem from "../services/FaqsItem";
import FaqSchema from "../seo/FaqSchema";

export default function HomeFaq() {
  return (
    <section className="bg-white py-16">
      <FaqSchema faqs={faqs} />
      <div className="mx-auto px-6 sm:px-8 text-center" style={{ maxWidth: "760px" }}>
      {/* Label */}
      <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
        <Settings size={13} strokeWidth={1.5} />
        <span style={{ fontSize: "13px" }}>FAQ</span>
      </div>

      {/* Heading */}
      <h2
        className="font-bold text-black mx-auto mb-3"
        style={{
          fontSize: "clamp(32px, 5vw, 62px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "560px",
        }}
      >
        Essential FAQs Answered for You
      </h2>

      <p
        className="text-gray-500 mx-auto mb-14"
        style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "360px" }}
      >
        Everything you need to know before we start building together.
      </p>

      <div className="flex flex-col gap-3">
        {faqs.map((faq) => (
          <FaqsItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      </div>
    </section>
  );
}
