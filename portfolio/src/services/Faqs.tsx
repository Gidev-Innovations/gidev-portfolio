import FaqsItem from "./FaqsItem.tsx";
import Reveal from "../components/Reveal";
import { faqs as defaultFaqs, type Faq } from "../data/faqs";

const Faqs = ({ items = defaultFaqs, title = "Essential FAQs Answered for You" }: { items?: Faq[]; title?: string }) => {
  return (
    <section className="w-full space-y-8 px-0 sm:px-2">
      <Reveal className="w-full max-w-xl mx-auto px-2">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p>FAQ</p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl text-center leading-none">
            {title}
          </h2>
          <span className="text-stone-900 text-center text-sm sm:text-base">
            Everything you need to know before we start building together.
          </span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-3 w-full">
        {items.map((faq) => (
          <FaqsItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default Faqs;
