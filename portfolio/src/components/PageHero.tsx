import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import SplitText from "./SplitText";

export type Crumb = { label: string; to?: string };

type PageHeroProps = {
  eyebrow: string;
  /** Plain string: it is split into words for the masked reveal. */
  title: string;
  /** A phrase inside `title` to set in the teal highlight. */
  highlight?: string;
  intro?: ReactNode;
  /** Visible breadcrumb trail. The last crumb is the current page. Structured data stays in each page's JsonLd. */
  breadcrumb?: Crumb[];
  /** Buttons or extra content under the intro. */
  children?: ReactNode;
  className?: string;
};

/**
 * Shared inner-page header: breadcrumb, eyebrow, split-word h1 reveal, intro.
 * The real heading text is in the server-rendered HTML; the motion is CSS only.
 */
export default function PageHero({ eyebrow, title, highlight, intro, children, className = "" }: PageHeroProps) {
  return (
    <header className={`gidev-stage pb-12 pt-16 text-center md:pb-16 md:pt-20 ${className}`}>
      <div className="hero-in" style={{ animationDelay: "60ms" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>

      <h1 className="mx-auto max-w-4xl text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl">
        <SplitText text={title} highlight={highlight} />
      </h1>

      {intro && (
        <div
          className="hero-in mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600"
          style={{ animationDelay: "420ms" }}
        >
          {intro}
        </div>
      )}

      {children && (
        <div className="hero-in mt-8" style={{ animationDelay: "520ms" }}>
          {children}
        </div>
      )}
    </header>
  );
}
