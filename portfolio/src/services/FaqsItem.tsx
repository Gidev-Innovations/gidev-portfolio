import { Plus } from "lucide-react";
import { useId, useState } from "react";

/**
 * The answer stays in the DOM when collapsed (grid-rows 0fr → 1fr) so it is
 * in the pre-rendered HTML for crawlers and matches the FAQPage schema.
 */
const FaqsItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-2xl text-left overflow-hidden"
      style={{
        backgroundColor: "var(--color-brand-light)",
        border: "1px solid var(--color-brand-border)",
      }}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-answer`}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full min-h-14 items-center justify-between gap-4 px-5 sm:px-7 py-4 text-left cursor-pointer"
        >
          <span
            className="text-black min-w-0 flex-1"
            style={{ fontSize: "15px", fontWeight: 500, lineHeight: 1.4 }}
          >
            {question}
          </span>
          <Plus
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
            className={`flex-shrink-0 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
      </h3>

      <div
        id={`${id}-answer`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!isOpen}>
          <p
            className="text-gray-500 px-5 sm:px-7 pb-6"
            style={{ fontSize: "14px", lineHeight: 1.8 }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqsItem;
