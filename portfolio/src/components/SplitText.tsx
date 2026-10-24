import type { CSSProperties } from "react";

type SplitTextProps = {
  text: string;
  /** A phrase inside `text` to render in the highlighted (teal gradient) style. */
  highlight?: string;
  /** Word index offset, so several SplitText runs can share one stagger sequence. */
  startIndex?: number;
};

/**
 * Word-level masked slide-up. Real text stays in the HTML (words are separated by
 * text-node spaces); the motion is pure CSS (.split-word in index.css), so it
 * plays on first paint without waiting for hydration and is off under reduced motion.
 * Render inside a heading or paragraph.
 */
export default function SplitText({ text, highlight, startIndex = 0 }: SplitTextProps) {
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];
  const highlightStart = highlight
    ? words.findIndex((_, i) => highlightWords.every((w, j) => words[i + j] === w))
    : -1;

  return (
    <>
      {words.map((word, i) => {
        const marked = highlightStart >= 0 && i >= highlightStart && i < highlightStart + highlightWords.length;
        return (
          <span key={i}>
            <span className="split-word">
              <span
                className={marked ? "split-word-inner split-highlight" : "split-word-inner"}
                style={{ "--i": startIndex + i } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </>
  );
}
