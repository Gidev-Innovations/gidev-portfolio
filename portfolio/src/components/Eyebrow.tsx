import type { ReactNode } from "react";

/** The one eyebrow style used above every homepage section heading. */
export default function Eyebrow({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-brand" : "text-brand-dark"
      } ${className}`}
    >
      <span className="h-px w-6 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
