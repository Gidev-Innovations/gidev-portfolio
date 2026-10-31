import manifest from "./image-manifest.json";

/** Built by scripts/optimize-images.mjs — run `npm run images` after adding a source file. */
export { manifest };

/**
 * Images hosted on Cloudinary (not processed by scripts/optimize-images.mjs).
 * `ResponsiveImage` resizes them on the fly with `f_auto,q_auto,w_<width>`, so
 * browsers get AVIF/WebP at the right size. `width`/`height` are the intrinsic
 * ratio, used only to reserve space (every use is cropped with object-cover).
 */
const CLOUDINARY = "https://res.cloudinary.com/djj0zq6qj/image/upload";

export const remoteImages = {
  // TODO(human): placeholder — reuses the business-websites photo. Replace this url with a dedicated Web Applications photo.
  "service-web-apps": {
    url: `${CLOUDINARY}/v1793048050/1981-digital-oMe_FjZnHGU-unsplash_tfimb1.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-ai-automation": {
    url: `${CLOUDINARY}/v1793048052/julien-tromeur-0VCIV2h_Nlg-unsplash_sky2ch.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-business-websites": {
    url: `${CLOUDINARY}/v1793048050/1981-digital-oMe_FjZnHGU-unsplash_tfimb1.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-branding": {
    url: `${CLOUDINARY}/v1793047959/2h-media-EP6vP1i_l5I-unsplash_sqkuv6.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-digital-marketing": {
    url: `${CLOUDINARY}/v1793047958/melanie-deziel-U33fHryBYBU-unsplash_ejxjjw.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-ecommerce": {
    url: `${CLOUDINARY}/v1793047951/growtika-9WnjxT1NCoY-unsplash_yemgln.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-mobile-apps": {
    url: `${CLOUDINARY}/v1793191789/alexander-shatov-mr4JG4SYOF8-unsplash_oqtfgx.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-seo": {
    url: `${CLOUDINARY}/v1793048047/markus-winkler-afW1hht0NSs-unsplash_qeimxl.jpg`,
    width: 1600,
    height: 1067,
  },
  "service-maintenance": {
    url: `${CLOUDINARY}/v1793047961/shane-rounce-DNkoNXQti3c-unsplash_xnkg0h.jpg`,
    width: 1600,
    height: 1067,
  },
} as const;

export type LocalImageName = keyof typeof manifest;
export type RemoteImageName = keyof typeof remoteImages;
export type ImageName = LocalImageName | RemoteImageName;