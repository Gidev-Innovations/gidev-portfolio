import Eyebrow from "../components/Eyebrow";
import { technologies } from "../data/technologies";
import {
  siCloudflare,
  siExpo,
  siFirebase,
  siGoogleanalytics,
  siGooglesearchconsole,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siReactrouter,
  siShopify,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWoocommerce,
  type SimpleIcon,
} from "simple-icons";

const technologyIcons: Record<string, SimpleIcon> = {
  React: siReact,
  TypeScript: siTypescript,
  "Next.js": siNextdotjs,
  "React Router": siReactrouter,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  "Tailwind CSS": siTailwindcss,
  "React Native": siReact,
  Expo: siExpo,
  Supabase: siSupabase,
  "Firebase Cloud Messaging": siFirebase,
  Cloudflare: siCloudflare,
  Vercel: siVercel,
  Shopify: siShopify,
  WooCommerce: siWoocommerce,
  "Google Search Console": siGooglesearchconsole,
  "Google Analytics": siGoogleanalytics,
};

const fallbackMarks: Record<string, string> = {
  "Payment provider APIs": "P",
  Paystack: "P",
  Flutterwave: "F",
  Pesapal: "P",
};

function TechnologyMark({ name }: { name: string }) {
  const icon = technologyIcons[name];

  if (icon) {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-[10px] font-bold text-brand-dark"
    >
      {fallbackMarks[name]}
    </span>
  );
}

/** Pure-CSS marquee (see .marquee in index.css). The duplicate copy is hidden from assistive tech and from reduced-motion users. */
export default function TechMarquee() {
  return (
    <section className="overflow-hidden border-y border-gray-200 bg-white py-12 md:py-16" aria-labelledby="tech-heading">
      <div className="gidev-stage mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="!mb-3">Technologies &amp; platforms</Eyebrow>
          <h2 id="tech-heading" className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
            Tools we use, chosen to fit the job.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-gray-600">
          We pick the platform that suits your brief, not the other way round.
        </p>
      </div>

      <div className="marquee">
        <ul className="marquee-track">
          {technologies.map((name) => (
            <li key={name} className="marquee-item inline-flex items-center gap-2">
              <TechnologyMark name={name} />
              {name}
            </li>
          ))}
          {technologies.map((name) => (
            <li key={`${name}-copy`} className="marquee-item marquee-copy inline-flex items-center gap-2" aria-hidden="true">
              <TechnologyMark name={name} />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
