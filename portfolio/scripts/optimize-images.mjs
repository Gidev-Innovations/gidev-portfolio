/**
 * Image pipeline. Run with `npm run images` after adding or changing a file
 * in images-src/ (originals are kept out of public/ so they never deploy).
 *
 *   images-src/<name>.<ext>  →  public/img/<name>-<width>.{avif,webp,jpg}
 *                               src/data/image-manifest.json (intrinsic sizes)
 *
 * Also renders 1200×630 title cards used as og:image and blog covers:
 *   public/og-image.png (gidev-logo.svg), public/og/<post-slug>.{png,webp}
 *   (gidev-wordmark.svg), logos from src/assets/gidev-logo-kit/
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("..", import.meta.url));
const srcDir = join(root, "images-src");
const outDir = join(root, "public", "img");
const ogDir = join(root, "public", "og");
const WIDTHS = [480, 768, 1200, 1600];

async function optimisePhotos() {
  await mkdir(outDir, { recursive: true });
  const manifest = {};

  const images = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f));
  for (const file of images.sort()) {
    const { name } = parse(file);
    const input = sharp(join(srcDir, file)).rotate();
    const { width, height } = await input.metadata();
    const widths = WIDTHS.filter((w) => w < width).concat(width > 1600 ? [] : [width]);
    const unique = [...new Set(widths.map((w) => Math.min(w, 1600)))].sort((a, b) => a - b);

    for (const w of unique) {
      const resized = input.clone().resize({ width: w, withoutEnlargement: true });
      await resized.clone().avif({ quality: 50, effort: 6 }).toFile(join(outDir, `${name}-${w}.avif`));
      await resized.clone().webp({ quality: 70 }).toFile(join(outDir, `${name}-${w}.webp`));
      await resized.clone().flatten({ background: "#ffffff" }).jpeg({ quality: 72, mozjpeg: true }).toFile(join(outDir, `${name}-${w}.jpg`));
    }

    manifest[name] = { width, height, widths: unique };
    console.log(`  ${file} → ${unique.join(", ")}`);
  }

  await writeFile(
    join(root, "src", "data", "image-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Greedy word wrap; the SVG renderer has no text layout of its own. */
function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > maxChars) {
      lines.push(line.trim());
      line = word;
    } else {
      line += ` ${word}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

/** Mirrors the brand tokens in src/index.css (SVG rendering can't read CSS variables). */
const BRAND = { base: "#18aeb4", dark: "#0e7a7f", ink: "#111111", muted: "#6a7282" };
const kitDir = join(root, "src", "assets", "gidev-logo-kit");

/** White card: the kit's primary logo and wordmark have ink letters. */
function cardSvg({ eyebrow, title }) {
  const lines = wrap(title, 26).slice(0, 4);
  const size = lines.length > 3 ? 56 : 64;
  const startY = 340;
  const text = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * size * 1.1}">${escapeXml(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="12" fill="${BRAND.base}"/>
  <text x="80" y="250" fill="${BRAND.dark}" font-family="Outfit, Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="3">${escapeXml(eyebrow.toUpperCase())}</text>
  <text fill="${BRAND.ink}" font-family="Outfit, Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="800">${text}</text>
  <text x="1120" y="575" text-anchor="end" fill="${BRAND.muted}" font-family="Outfit, Segoe UI, Arial, sans-serif" font-size="26">gidevtech.com · Nairobi, Kenya</text>
</svg>`;
}

async function renderCard({ eyebrow, title, logoFile, logoWidth }) {
  const logo = await sharp(join(kitDir, logoFile)).resize({ width: logoWidth }).png().toBuffer();
  const png = await sharp(Buffer.from(cardSvg({ eyebrow, title })))
    .composite([{ input: logo, left: 80, top: 64 }])
    .png()
    .toBuffer();
  return sharp(png);
}

async function renderCards() {
  await mkdir(ogDir, { recursive: true });

  const home = await renderCard({
    eyebrow: "Software studio · Nairobi",
    title: "Web & Mobile App Development in Kenya",
    logoFile: "gidev-logo.svg",
    logoWidth: 260,
  });
  await home.png({ compressionLevel: 9 }).toFile(join(root, "public", "og-image.png"));

  const blog = await readFile(join(root, "src", "blog", "blogData.ts"), "utf8");
  const posts = [...blog.matchAll(/slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g)];
  for (const [, slug, title, category] of posts) {
    const card = await renderCard({
      eyebrow: `${category} · Gidev blog`,
      title,
      logoFile: "gidev-wordmark.svg",
      logoWidth: 200,
    });
    await card.clone().png({ compressionLevel: 9 }).toFile(join(ogDir, `${slug}.png`));
    await card.clone().webp({ quality: 80 }).toFile(join(ogDir, `${slug}.webp`));
  }
  console.log(`  og-image.png + ${posts.length} post cards`);
}

console.log("Optimising photos:");
await optimisePhotos();
console.log("Rendering title cards:");
await renderCards();
