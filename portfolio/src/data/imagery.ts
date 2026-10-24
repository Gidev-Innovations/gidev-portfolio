/**
 * Every photo on the site, by role. Sources live in images-src/ and are
 * processed into public/img by `npm run images`; licences are recorded in
 * images-src/CREDITS.md.
 *
 * Rules (see audits/CHANGELOG.md, Phase 2):
 *   - Use people and settings that feel authentic. Avoid generic tech clichés.
 *   - Alt text describes what is actually in the frame. Do not claim a photo
 *     shows a client or the Gidev team unless it does.
 *
 * TODO(human): the stock set is thin. Replace with commissioned photos of
 * real businesses and the team (see images-src/CREDITS.md for the brief).
 */
import type { ImageName } from "./images";

export type Photo = { name: ImageName; alt: string };

export const imagery = {
  dashboard: {
    name: "business-dashboard-laptop",
    alt: "Business owner's hands on a laptop showing a sales dashboard, with an invoice on a clipboard beside it",
  },
  shopOwner: {
    name: "shop-owner-tablet",
    alt: "Plant shop owner browsing an online product catalogue on a tablet among potted succulents",
  },
  womanCity: {
    name: "woman-city-dusk",
    alt: "Young woman on a city rooftop at dusk",
  },
  manPortrait: {
    name: "young-man-portrait",
    alt: "Smiling young man in front of a painted mural",
  },
  kibanda: {
    name: "kibandaski",
    alt: "Kibanda menu board above plates of chapati, samosas, sukuma wiki, mutura and chai",
  },
  code: {
    name: "code-screen",
    alt: "Website code open in an editor on a laptop screen",
  },
} as const satisfies Record<string, Photo>;

/** Homepage ticker — unique images only. */
export const showcaseImages: Photo[] = [
  imagery.shopOwner,
  imagery.womanCity,
  imagery.dashboard,
  imagery.kibanda,
  imagery.manPortrait,
];
