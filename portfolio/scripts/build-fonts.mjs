/**
 * Converts the Outfit .woff sources in src/assets/fonts to subset .woff2.
 * The site is English-only, so each file keeps Basic Latin, Latin-1 and the
 * punctuation/symbols the copy actually uses. Re-run after adding copy in
 * another script or new symbols.
 *
 *   node scripts/build-fonts.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const dir = fileURLToPath(new URL("../src/assets/fonts/", import.meta.url));

const ranges = [
  [0x20, 0x7e],
  [0xa0, 0xff],
  [0x2010, 0x2027], // dashes, quotes, bullet, ellipsis
  [0x2030, 0x203a],
  [0x2190, 0x2193], // arrows
  [0x2212, 0x2212],
  [0x2264, 0x2265], // ≤ ≥
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
];
const text = ranges
  .flatMap(([from, to]) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)))
  .join("");

for (const file of (await readdir(dir)).filter((f) => f.endsWith(".woff"))) {
  const source = await readFile(dir + file);
  const out = await subsetFont(source, text, { targetFormat: "woff2" });
  await writeFile(dir + file.replace(/\.woff$/, ".woff2"), out);
  console.log(`${file}: ${(source.length / 1024).toFixed(1)} KB -> ${(out.length / 1024).toFixed(1)} KB woff2`);
}
