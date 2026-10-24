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
      className={`mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border text-left transition-colors duration-300 ${
        isOpen ? "border-brand-dark/40 bg-white shadow-[0_12px_32px_rgba(20,20,19,0.06)]" : "border-brand-border bg-brand-light"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-answer`}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full min-h-14 items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-dark sm:px-7"
        >
          <span
            className="min-w-0 flex-1 text-base font-medium leading-snug text-ink"
          >
            {question}
          </span>
          <span className="relative h-5 w-5 flex-shrink-0 text-brand-dark" aria-hidden="true">
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-current" />
            <span
              className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-answer`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!isOpen}>
          <p
            className="px-5 pb-6 text-sm leading-relaxed text-gray-700 sm:px-7 md:text-base"
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqsItem;
