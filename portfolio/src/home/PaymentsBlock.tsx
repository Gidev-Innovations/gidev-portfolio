import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import Reveal from "../components/Reveal";

// TODO(human): confirm every rail listed here is one you have shipped or are
// willing to deliver; remove any you would not take on.
const rails = [
  {
    name: "M-Pesa (Daraja API)",
    detail: "STK Push checkout, Paybill and Till numbers, payment confirmation callbacks and reconciliation.",
  },
  {
    name: "Airtel Money",
    detail: "Mobile money collections for customers who are not on Safaricom.",
  },
  {
    name: "Cards via Paystack, Flutterwave or Pesapal",
    detail: "Visa and Mastercard for diaspora and corporate buyers, with one checkout flow.",
  },
];

export default function PaymentsBlock() {
  return (
    <section className="bg-white py-16 px-6">
      <div
        className="mx-auto rounded-3xl px-6 md:px-14 py-12 md:py-16"
        style={{
          maxWidth: "1000px",
          backgroundColor: "var(--color-brand-light)",
          border: "1px solid var(--color-brand-border)",
        }}
      >
        <div className="flex items-center gap-2 text-gray-500 mb-3">
          <Smartphone size={13} strokeWidth={1.5} aria-hidden="true" />
          <span style={{ fontSize: "13px" }}>Payments</span>
        </div>
        <h2
          className="font-bold text-black mb-4"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Checkout the way Kenyan customers actually pay
        </h2>
        <p className="text-gray-600 max-w-2xl mb-10" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          Foreign templates assume a card. Most of your customers will pay with
          M-Pesa on a phone. We build the payment flow around that, and handle
          the failure cases: a customer who closes the STK prompt, a callback
          that arrives late, a payment that needs to be matched to an order.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {rails.map((rail, i) => (
            <Reveal as="li" key={rail.name} delay={i * 100} className="rounded-2xl bg-white p-6">
              <h3 className="font-bold text-black mb-2" style={{ fontSize: "16px" }}>
                {rail.name}
              </h3>
              <p className="text-gray-500" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                {rail.detail}
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="flex flex-wrap gap-x-6 gap-y-3" style={{ fontSize: "15px" }}>
          <Link
            to="/services/ecommerce"
            className="inline-flex min-h-11 items-center font-semibold text-brand-dark underline underline-offset-4 hover:text-brand-dark transition-colors"
          >
            E-commerce with M-Pesa checkout
          </Link>
          <Link
            to="/blog/designing-checkout-for-mpesa-and-mobile-money-2026"
            className="inline-flex min-h-11 items-center font-semibold text-brand-dark underline underline-offset-4 hover:text-brand-dark transition-colors"
          >
            Read: designing checkout for M-Pesa
          </Link>
        </div>
      </div>
    </section>
  );
}
