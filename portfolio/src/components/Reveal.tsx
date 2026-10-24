import type { CSSProperties, HTMLAttributes, ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "style" | "className" | "children">;

/** See src/lib/reveal.ts — renders visible; JS only ever hides what is off screen. */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  return (
    <Tag
      {...rest}
      data-reveal=""
      className={className}
      style={
        delay
          ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}
