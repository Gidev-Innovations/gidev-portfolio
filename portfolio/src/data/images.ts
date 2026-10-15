import manifest from "./image-manifest.json";

/** Built by scripts/optimize-images.mjs — run `npm run images` after adding a source file. */
export { manifest };

export type ImageName = keyof typeof manifest;
