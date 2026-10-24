import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";
import { services } from "../data/services";

function getEcommerceService() {
  const service = services.find((item) => item.id === "ecommerce");
  if (!service) throw new Error("The e-commerce service is missing from the service catalog.");
  return service;
}

const ecommerce = getEcommerceService();

const paymentConsiderations = [
  {
    name: "Customer checkout",
    detail: "Plan a clear mobile checkout around the payment method selected for the store.",
  },
  {
    name: "Order confirmation",
    detail: "Agree how payment status should connect with the store's order workflow.",
  },
  {
    name: "Store operations",
    detail: "Consider payment alongside the product catalogue, fulfilment and customer support process.",
  },
];

const stages = [
  { title: "Customer chooses a payment method", detail: "The checkout starts the selected provider's payment flow." },
  { title: "Customer confirms payment", detail: "They review and approve the payment through their chosen method." },
  { title: "Payment confirmed", detail: "The provider sends the result back to the store." },
  { title: "Order matched", detail: "The store marks the right order as paid." },
];

const STAGE_MS = 3000;

/** Decorative phone; the same story is told in text by the step list next to it. Sample values only. */
function PhoneMock({ stage }: { stage: number }) {
  return (
    <div
      className="relative mx-auto w-60 rounded-[2.5rem] bg-ink p-2.5 shadow-[0_30px_70px_rgba(20,20,19,0.25)] sm:w-64"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-4 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative aspect-[9/17.5] overflow-hidden rounded-[2rem] bg-white">
        {/* 1. Prompt */}
        <div className="stk-screen flex flex-col justify-end bg-gray-100 p-4" data-active={stage === 0}>
          <div className="rounded-2xl bg-white p-4 text-center shadow-lg">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-dark">Payment request</p>
            <p className="mt-3 text-sm font-semibold text-ink">Pay 24.00 to Your Store?</p>
            <p className="mt-1 text-[11px] text-gray-500">Sample amount</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
              <span className="rounded-lg bg-gray-100 py-2 text-gray-600">Cancel</span>
              <span className="rounded-lg bg-brand-dark py-2 text-white">OK</span>
            </div>
          </div>
        </div>

        {/* 2. PIN */}
        <div className="stk-screen flex flex-col items-center justify-center gap-6 p-6" data-active={stage === 1}>
          <p className="text-sm font-semibold text-ink">Confirm on your device</p>
          <div className="flex gap-3">
            {[0, 1, 2, 3].map((dot) => (
              <span key={dot} className="stk-dot h-3.5 w-3.5 rounded-full bg-ink" style={{ "--d": dot } as CSSProperties} />
            ))}
          </div>
          <span className="rounded-lg bg-brand-dark px-6 py-2 text-xs font-semibold text-white">Send</span>
        </div>

        {/* 3. Confirmation */}
        <div className="stk-screen flex flex-col items-center justify-center gap-4 p-6 text-center" data-active={stage === 2}>
          <svg viewBox="0 0 52 52" className="h-16 w-16">
            <circle cx="26" cy="26" r="24" fill="#eef9fa" stroke="#18aeb4" strokeWidth="2" />
            <path className="stk-check" d="M15 27l8 8 15-16" fill="none" stroke="#0e7a7f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm font-semibold text-ink">Payment confirmed</p>
          <p className="text-[11px] leading-snug text-gray-500">The store receives the result.</p>
        </div>

        {/* 4. Order matched (store side) */}
        <div className="stk-screen flex flex-col gap-3 bg-gray-50 p-4 pt-9" data-active={stage === 3}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">Store orders</p>
          <div className="rounded-xl border border-brand-border bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink">New order</span>
              <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-semibold text-brand-dark">Paid</span>
            </div>
            <p className="mt-2 text-[11px] text-gray-500">Matched to the customer's payment</p>
          </div>
          <div className="rounded-xl bg-white p-3 opacity-60">
            <div className="h-2 w-2/3 rounded bg-gray-200" />
            <div className="mt-2 h-2 w-1/2 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduceMotion || !playing || !inView) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStage((current) => (current + 1) % stages.length);
    }, STAGE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, playing, inView]);

  return (
    <section className="bg-white px-6 py-16 md:py-24" aria-labelledby="payments-heading">
      <div
        ref={ref}
        className="mx-auto max-w-[1100px] rounded-3xl border border-brand-border bg-brand-light px-6 py-12 md:px-14 md:py-16"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow>E-commerce capability</Eyebrow>
            <h2
              id="payments-heading"
              className="mb-4 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink md:text-5xl"
            >
              Checkout that fits your customers
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg">
              We connect the payment providers that make sense for your customers
              and operations. Checkout, payment confirmation and order handling
              are planned around your store and the tools you use.
            </p>

            <ol className="mb-4 space-y-1">
              {stages.map((item, index) => {
                const active = index === stage;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      aria-current={active ? "step" : undefined}
                      onClick={() => {
                        setStage(index);
                        setPlaying(false);
                      }}
                      className={`flex min-h-14 w-full items-start gap-4 rounded-2xl px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-brand-dark ${
                        active ? "bg-white shadow-[0_8px_24px_rgba(20,20,19,0.06)]" : "hover:bg-white/60"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300 ${
                          active ? "bg-brand-dark text-white" : index < stage ? "bg-brand-border text-brand-dark" : "bg-white text-gray-600"
                        }`}
                      >
                        {index < stage ? <Check size={14} aria-hidden="true" /> : index + 1}
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">{item.title}</span>
                        <span className="block text-sm leading-relaxed text-gray-600">{item.detail}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <button
              type="button"
              aria-pressed={!playing}
              onClick={() => setPlaying((value) => !value)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-brand-dark transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-dark motion-reduce:hidden"
            >
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? "Pause animation" : "Play animation"}
            </button>
          </div>

          <div>
            <PhoneMock stage={stage} />
            <p className="mt-4 text-center text-xs text-gray-600">Illustration with sample values, not a real transaction.</p>
          </div>
        </div>

        <ul className="mb-10 mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {paymentConsiderations.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 100} className="rounded-2xl bg-white p-6">
              <h3 className="mb-2 text-base font-semibold text-ink">{item.name}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.detail}</p>
            </Reveal>
          ))}
        </ul>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
          <Link viewTransition
            to={`/services/${ecommerce.slug}`}
            className="inline-flex min-h-11 items-center font-semibold text-brand-dark underline underline-offset-4 transition-colors hover:text-ink"
          >
            {ecommerce.title} with flexible payments
          </Link>
          <Link viewTransition
            to="/blog/designing-checkout-for-mpesa-and-mobile-money-2026"
            className="inline-flex min-h-11 items-center font-semibold text-brand-dark underline underline-offset-4 transition-colors hover:text-ink"
          >
            Read: designing clear payment experiences
          </Link>
        </div>
      </div>
    </section>
  );
}
