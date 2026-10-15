# Responsive report

Run: `npm run test:responsive`. This builds, serves `build/client` with
`scripts/serve-build.mjs` on port 4173 (same trailing-slash and compression
behaviour as Cloudflare), then runs `tests/responsive.spec.ts` in Chromium.

**Result: 241 / 241 passing**:

- 22 routes × 10 widths = 220
- 6 landscape-phone checks
- 4 navigation checks
- 11 routing checks

Widths: 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920.
Landscape: 667×375 and 844×390 on `/`, `/contact`, `/services/web-apps`.
Routes: read from the built `sitemap.xml`, so every page is covered and new
pages are picked up automatically (21 today), plus the 404.

`tests/routing.spec.ts` checks three things:

- `/about`, `/services`, `/projects`, `/blog` and `/contact` return 200 with no redirect, and their canonical matches the URL.
- The trailing-slash form of each redirects (307) to it.
- No sitemap URL ends in `/`.

## What each test checks

| Check | Rule |
| --- | --- |
| Horizontal overflow | `scrollWidth` ≤ viewport + 1px. On failure, names the elements sticking out. |
| Headings | exactly one visible `<h1>`; at 390px it wraps to ≤ 3 lines |
| Images | every `<img>` has `alt` and is no wider than the viewport |
| Tap targets | every link, button and field ≥ 44×44px (WCAG 2.5.5). Links inside running text are exempt, as WCAG allows; visually hidden elements (the skip link before focus) are skipped. |
| Form fields | < 768px: font-size ≥ 16px, so iOS doesn't zoom on focus |
| Back-to-top button | the footer Contact link is not covered by it at any width |
| Console | no errors or uncaught exceptions (third-party requests such as Calendly are blocked on purpose) |
| Mobile menu | < 1024px: opens, contains Contact, closes on Escape, closes on route change; in landscape Contact is reachable |
| Desktop nav | ≥ 1024px: menu button hidden, Contact link visible |

## Failures found and fixed

| Page | Widths | Cause | Fix |
| --- | --- | --- | --- |
| `/about` | 320–1024 | Banner had `aspect-[21/9]` + `min-h-[280px]` / `md:min-h-[55vh]`. With an aspect ratio, a minimum height also forces a minimum width (280 × 21/9 ≈ 653px), so the page scrolled sideways to 677px at 375px. | `aspect-[4/3] md:aspect-[21/9]`, no min-height (`src/about/About.tsx`) |
| `/services` | 320–375 | Same pattern on the image grid: `aspect-[16/10]` + `min-h-[220px]` gave a 352px minimum width. | `aspect-[4/3] sm:aspect-[16/10] md:min-h-[380px]` (`src/services/Services.tsx`) |
| `/services` | 390 | H1 wrapped to 4 lines at 36px | `text-[30px] sm:text-4xl` (3 lines) |
| `/services/ecommerce` | 390 | H1 wrapped to 5 lines at 34px | service H1 `clamp(32px, 5vw, 62px)` (3 lines; tablet/desktop unchanged) |
| all | < 768 | Header logo link 92×40 | `min-h-11` on the link (`Navbar.tsx`) |
| all | all | Footer "Blog"/"About"/"Home" 32–43px wide; "Sitemap" 59×29 | `min-w-11` on footer links; Sitemap link later removed (`Footer.tsx`) |
| 404 | 1280×720, 1440×768 | The "404" digits started 30–50px under the 128px fixed navbar (vertically centred in a short window). Missed because desktop tests used 900px-tall windows. | Top padding below the navbar (`NotFound.tsx`); new "short laptop screens" test checks every route at both sizes. |
| `/services/*` | all | Breadcrumb "Home" 35px wide | `min-w-11` (`ServiceDetail.tsx`) |
| `/projects/*` | all | "View live" / "GitHub" buttons 40–42px tall | `inline-flex min-h-11` (`ProjectDetails.tsx`) |
| `/blog/*` | all | Author byline link ~20px tall | `inline-flex min-h-11` (`Blogpost.tsx`) |
| `/blog/custom-web-apps-vs-instagram-shops-african-smes-2026` | 390 | H1 wrapped to 4 lines at 34px (found once all posts were tested) | post H1 `text-[28px] sm:text-[34px]` (all posts 2–3 lines) |
| `/projects` | ≥ 768 | Header left-aligned while every other hub page opens centred | Same centred header as `/blog` (`Projects.tsx`) |

## Screenshots

Full-page captures at 360, 768 and 1440px for `/`, `/services/web-apps`,
`/projects`, `/blog` and `/contact` are in `audits/screenshots/`. The test scrolls through the page
before capturing, so scroll-triggered reveals are shown.

There are no "before" screenshots: the suite was written after the Phase 1–2
fixes. The original problems (invisible reveal content, overlapping back-to-top
button, see-through mobile menu, ~10,000px home page) are in the brief's live
audit and `audits/00-discovery.md`.

## Not covered by automation

- **Calendly iframe at 390px**: third-party requests are blocked in tests, so
  check `/contact` on a real phone after deploy.
- **Safari / real devices**: Chromium only. Do one manual pass on an iPhone
  and a mid-range Android before launch.
- **Focus trap in the mobile menu**: implemented, not asserted.
- **CLS**: measured by Lighthouse instead (0–0.001 on all audited pages; see
  `audits/lighthouse/README.md`).
