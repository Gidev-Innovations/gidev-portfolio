import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";
import { faqs } from "../data/faqs";
import FaqSchema from "../seo/FaqSchema";
import FaqsItem from "../services/FaqsItem";

export default function HomeFaq() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="home-faq-heading">
      <FaqSchema faqs={faqs} />
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal className="mb-12 text-center md:mb-14">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="home-faq-heading"
            className="mx-auto mb-4 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl"
          >
            Essential FAQs answered for you
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-gray-600">
            Clear answers about software, growth and ongoing digital support.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <FaqsItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
