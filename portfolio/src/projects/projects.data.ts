import m5 from "./images/R-Flex.png";

/**
 * Case studies, not portfolio entries.
 *
 * The previous shape (tagline / overview / mission) described what a project
 * *was*. This shape describes what *changed*: who the client was, the problem
 * they had, what we built, and the outcome. That is what a prospective client
 * is actually reading for.
 *
 * Rules for adding entries:
 *   - `outcome` must be verifiable. No invented metrics, percentages, or
 *     revenue figures. If there is no measurable result yet, describe what
 *     shipped and leave the measurement out.
 *   - `client` must be a real, named client who has agreed to be referenced,
 *     or a truthful description such as "Private client, retail sector".
 */
export type CaseStudy = {
  /** URL segment: /projects/<slug> */
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  image: string;
  /** One-line hook used on cards and as the meta description. */
  summary: string;
  problem: string;
  whatWeDid: string;
  outcome: string;
  technologies: string[];
};

export const projects: CaseStudy[] = [
  {
    slug: "r-flex",
    title: "R-Flex",
    // TODO [NEEDS REAL CONTENT]: confirm how R-Flex should be credited and
    // whether they've agreed to be named as a client.
    client: "R-Flex",
    sector: "Fashion & lifestyle retail",
    year: "2024",
    image: m5,
    summary:
      "An e-commerce platform for a streetwear and lifestyle brand selling sneakers, belts, caps, and shirts.",
    // TODO [NEEDS REAL CONTENT]: the three fields below are placeholders.
    // Replace with what was actually true for this engagement — where they
    // were selling before, what specifically was built, and what changed
    // afterwards. Do not add metrics that haven't been measured.
    problem:
      "[NEEDS REAL CONTENT] Describe where R-Flex was selling before this build and what was limiting them.",
    whatWeDid:
      "We designed and built a custom e-commerce platform for R-Flex covering the storefront, product catalogue, and checkout, built around the brand's visual identity. [NEEDS REAL CONTENT] Add the specifics: payment methods integrated, inventory handling, and anything built for their particular workflow.",
    outcome:
      "[NEEDS REAL CONTENT] Describe the verifiable result — what they can now do that they couldn't before. Leave metrics out unless they have been measured.",
    technologies: ["React", "TypeScript", "Vite", "CSS"],
  },

  // TODO: Add remaining real case studies here, following the same shape.
  // Four template-derived entries were removed in the Stage 1 audit. Their
  // images remain at src/projects/images/ (custom.jpg, m2.jpg, m3.jpg,
  // m4.jpg) and are currently unreferenced — reuse or delete them.
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
