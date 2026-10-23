import { Link } from "react-router-dom";
import { ArrowRight, Settings2 } from "lucide-react";
import { BUSINESS } from "../data/site";
import Reveal from "./Reveal";

const primary =
  "group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 text-lg font-medium text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";
const secondary =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-ink/40 px-8 text-lg font-medium text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

/**
 * Logo teal with ink text (7:1). White text on #18aeb4 is only 2.7:1, so the
 * emphasised word is set apart with italics and an underline instead of colour.
 */
export default function ClosingCta() {
  return (
    <Reveal
      as="section"
      aria-labelledby="closing-cta-heading"
      className="relative mb-12 overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center sm:px-10 md:px-16 md:py-24"
    >
      <div className="pointer-events-none absolute -right-16 -top-32 h-72 w-72 rounded-full border border-ink/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-8 -top-24 h-56 w-56 rounded-full border border-ink/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-ink/10" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5">
        {BUSINESS.acceptingProjects && (
          <p className="flex items-center gap-2 text-ink">
            <Settings2 size={15} strokeWidth={1.5} aria-hidden="true" />
            <span className="text-regular-16">Taking on new projects</span>
          </p>
        )}

        <h2
          id="closing-cta-heading"
          className="text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl md:text-7xl"
        >
          Ready for your next{" "}
          <em className="underline decoration-ink/40 decoration-[0.06em] underline-offset-[0.12em]">step</em>?
        </h2>

        <p className="max-w-2xl text-regular-18 text-ink md:text-regular-20">
          Book a free {BUSINESS.callLength} call, or send us a few lines about what your business needs.
        </p>

        <div className="mt-3 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
          <Link viewTransition to="/contact#book" className={primary}>
            Book a free call
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
          <Link viewTransition to="/contact#message" className={secondary}>
            Send us a message
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
