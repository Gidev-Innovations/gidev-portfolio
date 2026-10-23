export type TestimonialVideo = {
  /** Self-hosted file under /public (no hotlinking), ideally < 3 MB. */
  src: string;
  /** Self-hosted poster image. */
  poster: string;
  /** WebVTT captions file, required for accessibility. */
  captions: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Service ids (src/data/services.ts) the testimonial relates to. */
  serviceIds?: string[];
  /** Present for video testimonials; the quote is then used as the transcript/summary. */
  video?: TestimonialVideo;
  /**
   * Must stay false until the client has given written approval for this exact
   * wording and for being named. Unapproved entries are never rendered.
   */
  approved: boolean;
};

/**
 * TODO(confirm with Gidev): add real client testimonials here (text and/or video)
 * and set `approved: true` only with the client's written permission.
 * The homepage section stays hidden while no entry is approved.
 *
 * Example shape (do not publish):
 * {
 *   id: "client-name",
 *   quote: "Their words, verbatim.",
 *   author: "Full name",
 *   role: "Job title",
 *   company: "Company",
 *   serviceIds: ["ecommerce"],
 *   video: { src: "/testimonials/name.mp4", poster: "/testimonials/name.jpg", captions: "/testimonials/name.vtt" },
 *   approved: true,
 * }
 */
export const testimonials: Testimonial[] = [];

export const approvedTestimonials = (): Testimonial[] => testimonials.filter((t) => t.approved);
