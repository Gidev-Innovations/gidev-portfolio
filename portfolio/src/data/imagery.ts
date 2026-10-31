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
 */
import type { ImageName } from "./images";

export type Photo = { name: ImageName; alt: string };

export const imagery = {
  /* Service photos (Cloudinary). TODO(human): check each alt text against the actual photo. */
  serviceWebApps: {
    name: "service-web-apps",
    alt: "Custom web applications: dashboards, portals and internal business tools",
  },
  serviceAi: {
    name: "service-ai-automation",
    alt: "AI and automation: technology working behind the scenes of a business",
  },
  serviceBusinessWebsites: {
    name: "service-business-websites",
    alt: "Business website and systems design and development",
  },
  serviceBranding: {
    name: "service-branding",
    alt: "Branding and graphic design work",
  },
  serviceDigitalMarketing: {
    name: "service-digital-marketing",
    alt: "Digital branding and marketing content for social media and email",
  },
  serviceEcommerce: {
    name: "service-ecommerce",
    alt: "E-commerce platform for selling products online",
  },
  serviceMobileApps: {
    name: "service-mobile-apps",
    alt: "Mobile app development for Android and iOS",
  },
  serviceSeo: {
    name: "service-seo",
    alt: "Search engine optimisation to help customers find your business",
  },
  serviceMaintenance: {
    name: "service-maintenance",
    alt: "Website maintenance and support",
  },
} as const satisfies Record<string, Photo>;