import { useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";

const subscribeNever = () => () => {};

const steps = [
  {
    title: "Understand the brief",
    body: "We learn about your business, audience, current setup and the outcome you want.",
    receive: "A short written summary of your goals",
  },
  {
    title: "Agree the scope",
    body: "Priorities, deliverables, responsibilities and review points are put in writing before work starts.",
    receive: "A clear scope, timeline and cost",
  },
  {
    title: "Deliver in steps",
    body: "We share work at agreed checkpoints so you can review it and guide it as it develops.",
    receive: "Regular previews and updates",
  },
  {
    title: "Review & improve",
    body: "We hand over the agreed work, review what's working and identify sensible next steps.",
    receive: "Handover and a next-steps plan",
  },
] as const;

function Step({
  step,
  index,
  armed,
  onActive,
}: {
  step: (typeof steps)[number];
  index: number;
  armed: boolean;
  onActive: (index: number | null) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { once: true, margin: "0px 0px -40% 0px" });
  const active = !armed || reached;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      ref={ref}
      tabIndex={0}
      onMouseEnter={() => onActive(index)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(index)}
      onBlur={() => onActive(null)}
      className="relative pb-12 pl-10 outline-none last:pb-0 focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-brand-dark/40 md:pb-16 md:pl-32"
    >
      <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center md:left-0" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border border-brand-border bg-brand-light" />
        <span
          className={`absolute inset-0 rounded-full bg-brand-dark transition-[opacity,transform] duration-500 ${
            active ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </span>

      <p className="relative mb-3 h-14 w-28 text-5xl font-semibold leading-none tracking-[-0.06em] md:absolute md:left-8 md:top-0 md:mb-0 md:h-20 md:w-20 md:text-6xl" aria-hidden="true">
        <span className="text-gray-500">{number}</span>
        <span
          className={`absolute inset-0 text-brand-dark transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
        >
          {number}
        </span>
      </p>

      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        <span className="sr-only">Step {index + 1}: </span>
        {step.title}
      </h3>
      <p className="text-base leading-relaxed text-gray-700 md:text-lg">{step.body}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-700">
        <span className="font-semibold text-brand-dark">You receive: </span>
        {step.receive}
      </p>
    </li>
  );
}

function RoadmapSketch({ activeStep }: { activeStep: number | null }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const drawPath = reduceMotion || inView;

  const marker = (step: number, x: number, y: number) => (
    <motion.g
      key={step}
      animate={{ scale: activeStep === step - 1 ? 1.06 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <circle
        cx={x}
        cy={y}
        r="17"
        fill={activeStep === step - 1 ? "#bae7e8" : "#ffffff"}
        stroke="#0e7a7f"
        strokeWidth="2"
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="#141413" fontSize="10" fontWeight="600">
        {String(step).padStart(2, "0")}
      </text>
    </motion.g>
  );

  return (
    <svg
      ref={ref}
      className="mx-auto block w-full max-w-[34rem]"
      viewBox="0 0 500 760"
      fill="none"
      role="img"
      aria-label="Illustration of a four-step project roadmap: understand, agree scope, deliver in steps, review and improve."
    >
      <motion.path
        d="M250 76 C345 76 405 112 405 174 C405 230 345 260 250 260 C155 260 95 304 95 374 C95 442 155 478 250 478 C345 478 405 520 405 590 C405 654 345 690 250 690"
        stroke="#0e7a7f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        animate={{ pathLength: drawPath ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.8, ease: "easeInOut" }}
      />

      <g stroke="#0e7a7f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M112 103 Q110 100 115 97 L204 97 Q209 98 208 103 L208 148 Q208 153 203 152 L126 152 L112 164 Z" fill="#e6f6f7" />
        <path d="M130 113 H188 M130 125 H180 M130 137 H166" />
        <path d="M286 280 Q285 276 290 276 H383 Q388 276 388 281 V366 Q388 371 383 371 H290 Q285 371 285 366 Z" fill="#fff" />
        <path d="M302 296 L308 302 L318 290 M326 297 H369 M302 321 H369 M302 342 Q314 332 325 342 T347 342" />
        <path d="M137 420 Q137 415 142 415 H218 Q223 415 223 420 V469 H137 Z" fill="#e6f6f7" />
        <path d="M137 430 H223 M146 423 H147 M153 423 H154 M160 423 H161 M149 444 H210 M149 453 H184" />
        <path d="M294 620 H382 M300 620 V606 H318 V620 M328 620 V592 H346 V620 M356 620 V576 H374 V620" />
        <path d="M365 576 V558 L381 562 L365 567" />
        <path d="M337 565 L362 548 L376 554 M376 554 L374 543 M376 554 L365 557" />
        <path d="M370 122 l3 -7 M382 129 l7 -2 M356 116 l-1 -7" />
        <path d="M80 318 l3 -7 M72 330 l-7 1 M87 306 l-1 -7" />
        <path d="M430 485 l3 -7 M442 496 l7 -2 M416 479 l-1 -7" />
        <circle cx="75" cy="200" r="2" fill="#0e7a7f" />
        <circle cx="425" cy="330" r="2" fill="#0e7a7f" />
        <circle cx="115" cy="550" r="2" fill="#0e7a7f" />
      </g>

      {marker(1, 250, 76)}
      {marker(2, 250, 260)}
      {marker(3, 95, 374)}
      {marker(4, 405, 590)}
    </svg>
  );
}

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);
  const armed = hydrated && !reduceMotion;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 60%"] });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="bg-brand-light py-20 md:py-28" aria-labelledby="process-heading">
      <div className="gidev-stage">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <Reveal className="mb-10 md:mb-14">
              <Eyebrow>How we work</Eyebrow>
              <h2
                id="process-heading"
                className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl"
              >
                Thoughtful work. No mystery.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
                Whether you need a new product or ongoing digital support, you'll always know what we're doing, why it matters and what comes next.
              </p>
            </Reveal>

            <div ref={trackRef} className="relative">
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-brand-border" aria-hidden="true">
                <motion.div
                  className="h-full w-full origin-top bg-brand-dark"
                  style={{ scaleY: armed ? scrollYProgress : 1 }}
                />
              </div>
              <ol className="relative">
                {steps.map((step, index) => (
                  <Step
                    key={step.title}
                    step={step}
                    index={index}
                    armed={armed}
                    onActive={setActiveStep}
                  />
                ))}
              </ol>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base leading-relaxed text-gray-700">
                Clear priorities, agreed deliverables and open communication.
              </p>
              <Link
                viewTransition
                to="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-3 self-start whitespace-nowrap rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark sm:self-auto"
              >
                Book a free 30-minute call
                <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hidden rounded-3xl border border-brand-border/70 bg-[#f1fbfb] p-5 sm:block sm:p-8 lg:p-7 xl:p-9">
            <RoadmapSketch activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
