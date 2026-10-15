import type { BlogPost } from "./blogData";
import { services } from "../data/services";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** "12 August, 2026" → "2026-08-12". */
export function postIsoDate(post: BlogPost): string {
  const [day, month, year] = post.date.replace(",", "").split(/\s+/);
  const m = MONTHS.indexOf(month.toLowerCase()) + 1;
  return `${year}-${String(m).padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function readingMinutes(post: BlogPost): number {
  const words = post.content
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** Generated title card: PNG for og:image, WebP for on-page display. */
export function coverWebp(post: BlogPost): string {
  return post.image.replace(/\.png$/, ".webp");
}

/** The service page a post supports, from the services' relatedPosts lists. */
export function serviceForPost(post: BlogPost) {
  return services.find((s) => s.relatedPosts[0] === post.slug)
    ?? services.find((s) => s.relatedPosts.includes(post.slug));
}
