import { Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { divChildHeroVariants } from "./Services.tsx";

const FaqsItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={divChildHeroVariants}
      className="w-full max-w-3xl mx-auto rounded-2xl text-left overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "var(--color-spring-wood-50)",
        border: "1px solid var(--color-spring-wood-100)",
      }}
      onClick={() => setIsOpen((open) => !open)}
    >
      <div className="flex items-start justify-between gap-4 px-5 sm:px-7 py-5">
        <span
          className="text-black min-w-0 flex-1"
          style={{
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <Plus size={18} strokeWidth={1.8} className="text-gray-500" />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="text-gray-500 px-5 sm:px-7 pb-6"
              style={{ fontSize: "14px", lineHeight: 1.8 }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqsItem;
