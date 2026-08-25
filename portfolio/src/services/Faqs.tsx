import FaqsItem from "./FaqsItem.tsx";
import { motion } from "framer-motion";
import { divParentVariants, divChildHeaderVariants } from "./Services.tsx";
import { faqs, type Faq } from "../data/faqs";

const Faqs = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={divParentVariants}
      className="w-full space-y-8 px-0 sm:px-2"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={divChildHeaderVariants}
        className="w-full max-w-xl mx-auto px-2"
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          <p>FAQ</p>
          <p className="text-2xl sm:text-3xl lg:text-5xl text-center leading-none">
            Essential FAQs Answered for You
          </p>
          <span className="text-stone-900 text-center text-sm sm:text-base">
            Everything you need to know before we start building together.
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3 w-full">
        {faqs.map((faq: Faq) => (
          <FaqsItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Faqs;
