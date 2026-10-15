# Lighthouse

Lighthouse 13.5, headless Chromium, against the production build served by
`scripts/serve-build.mjs` (brotli, the same as Cloudflare). Mobile = default
Moto G Power / slow 4G simulation; desktop = `--preset=desktop`.
Open the `.report.html` files in a browser for full details.

Reproduce:

```sh
npm run build
node scripts/serve-build.mjs 4173 &
npx lighthouse http://localhost:4173/ --output=html --output-path=audits/lighthouse/home-mobile
```

## Scores

| Page | Device | Perf | A11y | Best pr. | SEO | FCP | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | mobile | 88 | 100 | 100 | 100 | 2.5 s | 3.4 s | 0 | 0 ms |
| `/services/web-apps` | mobile | 89 | 100 | 100 | 100 | 2.5 s | 2.8 s | 0 | 10 ms |
| `/contact` | mobile | 99 | 100 | 100 | 100 | 1.5 s | 1.8 s | 0.001 | 0 ms |
| `/blog/designing-checkout-…` | mobile | 90 | 100 | 100 | 100 | 2.4 s | 2.9 s | 0 | 10 ms |
| `/` | desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.3 s | 0 | 0 ms |
| `/blog/designing-checkout-…` | desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.7 s | 0 | 0 ms |

## Before → after (mobile performance)

The first run used an uncompressed local server and WOFF fonts:

| Page | Before | After | What changed |
| --- | --- | --- | --- |
| `/` | 66 | 88 | compression, woff2 subset fonts |
| `/services/web-apps` | 67 | 89 | same |
| `/contact` | 71 | 99 | same |
| blog post | 56 (CLS 0.226) | 90 (CLS 0) | same + SemiBold preload: the late SemiBold title reflowed and pushed the cover down |

Compression is not a site change (Cloudflare already does it), but measuring
without it made every score look 20+ points worse than production will be.

## Remaining opportunities

- **LCP on mobile home (3.4 s)** is the hero `<h1>` text; ~1.2 s is render
  delay waiting on the Bold font and the JS bundle. Options: inline critical
  CSS, or a metric-matched fallback font (`size-adjust`) so text paints at once.
- **Unused JS ~45 KiB** (framer-motion, Lenis, React Router). Replacing
  framer-motion's simple fades with CSS would cut the most.
- **Main-thread work 3.2 s** on simulated slow CPU, mostly hydration.
- **`kibandaski` AVIF (83 KB at 768w)** is a detailed screenshot; a lower AVIF
  quality for that one source, or a 640w variant, would save ~60 KB.
