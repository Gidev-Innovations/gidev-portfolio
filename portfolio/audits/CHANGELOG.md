# CHANGELOG — gidevtech.com audit & conversion overhaul

All work is uncommitted on `main`, for review. Finding numbers (#1–#15)
are from the live audit in the brief; Phase 0 root causes are in
`audits/00-discovery.md`.

**Verification at hand-off:**

- `npm run build` passes (tsc + pre-render of 21 URLs).
- `npm run test:responsive`: 241/241 (every sitemap route at 10 widths, plus landscape, navigation and routing checks).
- `npm run validate:seo`: 21/21.
- Lighthouse mobile: 88–99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; desktop 100 in every category.

---

## 1. Findings from the live audit

| # | Finding | Status | What changed |
| --- | --- | --- | --- |
| 1 | Placeholder testimonials with invented names and stock faces | **Fixed** | `Testimonials.tsx` and the four stock avatars deleted. No replacement "who we've built for" strip: there are no client logos you've cleared to show. |
| 2 | No phone, email or WhatsApp | **Changed by decision** | You chose a contact form only, for now. `/contact` has a Web3Forms form (name, contact, what you're building, budget) above the Calendly embed; Contact is in the desktop nav, mobile menu and footer. No `tel:`, `mailto:` or `wa.me` anywhere, on purpose. |
| 3 | Calendly says 15 min, event is 30 min; personal name | **Fixed in copy** | All 7 mentions now say 30 minutes (`BUSINESS.callLength`). Calendly lazy-loads with a skeleton. Event name and the "Sejo Kariz" display name must be changed in Calendly (human). |
| 4 | Scroll-reveal leaves content invisible | **Fixed** | New progressive-enhancement reveal (`src/lib/reveal.ts`, `components/Reveal.tsx`): pre-rendered HTML has 0 `opacity:0` (was 20 on home), only below-the-fold elements hide, skipped elements are revealed, `prefers-reduced-motion` disables it. |
| 5 | Non-African / repeated stock imagery, empty-src images | **Fixed (photos still needed)** | NYC skyline, Starbucks, server racks, iPhone and Unsplash hot-links removed. Mood grid (`ParallaxGallery`) deleted; no image repeats. Hidden duplicate layouts gone, so no more 0×0 images. Remaining stock photos are African subjects; licences are TODO in `images-src/CREDITS.md`. |
| 6 | Mood grid performance; no AVIF/WebP/srcset; TTFB 1.5 s | **Fixed** | `scripts/optimize-images.mjs`: AVIF/WebP/JPG at 480/768/1200/1600 + `ResponsiveImage` with `sizes`, width/height, lazy except hero. TTFB: see #16 below. |
| 7 | Thin footer; back-to-top covers Contact | **Fixed** | Footer: name, Nairobi/Kenya, service areas, service and company link columns, privacy. (A footer "Sitemap" link to the raw XML was later removed: it served search engines, which find it via robots.txt, and 404'd on the dev server.) Back-to-top button no longer overlaps (asserted at all widths). Hours and socials are hidden until set (human). |
| 8 | Thin service pages | **Fixed** | Each service page is now 860–990 words: who it's for, problems, what's included, process, stack, timelines, pricing, FAQ (+ FAQPage schema), related projects and posts, CTA, one image. Pricing (KES only): business websites from KES 50,000, e-commerce from KES 120,000, mobile apps from KES 200,000 (MVP; payments or a custom backend quoted separately), web apps from KES 250,000, each followed by "Every quote follows a free 30-minute scoping call." |
| 9 | Projects page promised write-ups that didn't exist | **Fixed** | Page renamed "Work" (title "Our Work \| Gidev Innovations, Nairobi"). Cards carry honest tags: R-Flex "Client project", Kibandaski Finder "Open-source studio project", Sticky Day "Studio project". R-Flex links to `/projects/r-flex` (Client, The problem, What we built, Stack, Result, quote, CTA; Article meta + BreadcrumbList); unconfirmed sections stay hidden until filled. The two studio cards open their live sites in a new tab and show a "Why we built it" line. The "Work we've shipped" home section was removed (`HomeProjects.tsx` deleted). |
| 10 | Blog H1 "Blog page" | **Fixed** | H1 "Software & digital business blog"; posts have BlogPosting schema, author box, reading time, related posts, OG cover, related-service box. |
| 11 | See-through mobile menu, missing Contact | **Fixed** | Opaque, full-height, items fully visible at once, Contact included, Escape and route change close it, focus trap. |
| 12 | Organization-only schema | **Fixed** | ProfessionalService, WebSite, Service, FAQPage, BreadcrumbList, BlogPosting; one shared `@id`. See `seo/schema-validation.md`. |
| 13 | Hero/nav don't say what you do | **Fixed** | H1 "Web & Mobile App Development Studio in Nairobi"; CTA "Book a free call"; Contact in nav. The proof line under the CTAs is TODO(human): needs true numbers. |
| 14 | Tap targets < 40px | **Fixed** | Every target ≥ 44×44px at all widths (asserted). FAQ toggles are now `<button aria-expanded>`. |
| 15 | Things that already worked | **Kept** | robots.txt, sitemap, canonical/OG/Twitter, `lang`, `en_KE`, pre-rendered HTML. |

## 2. Found during this work

| # | Finding | Status / change |
| --- | --- | --- |
| 16 | **Live site 307-redirects every page to a trailing-slash URL**, while canonicals and sitemap use no slash. This also accounts for part of the measured TTFB. | `wrangler.jsonc`: `"html_handling": "drop-trailing-slash"`. **Check after deploy** (`audits/ttfb.md`). |
| 17 | Kenyan requests sometimes served from Cloudflare Budapest instead of Nairobi | Documented in `audits/ttfb.md`; plan/ISP-level, no code fix. |
| 18 | Hydration mismatch: Lenis added a class to `<html>` before hydration | Lenis now starts after hydration (`ScrollToTop` effect). |
| 19 | Horizontal overflow on `/about` (677px at 375) and `/services` (aspect-ratio + min-height) | Fixed; `audits/responsive-report.md`. |
| 20 | H1 over 3 lines at 390px on `/services` and `/services/ecommerce` | Mobile font size reduced; desktop unchanged. |
| 21 | `/about` H1 read "productsand each other" (JSX dropped the space before `<br />`) | Explicit space. |
| 22 | Mobile Lighthouse 56–71: uncompressed test server, 19 WOFF files (1.79 MB), late SemiBold causing CLS 0.23 on posts | Unused font families deleted; Outfit converted to Latin-subset WOFF2 (~13 KB each, `scripts/build-fonts.mjs`); Light/SemiBold/Bold preloaded. Now 88–99, CLS 0. |
| 23 | Sitemap `lastmod` = build date on every URL | Posts use their real dates, `/blog` uses the newest post, other pages omit it. |
| 24 | Titles/descriptions over 60/155 chars on 7 pages | Fixed; `seoTitle` option on posts. |
| 25 | Missing OG image (every share preview 404'd) | `og-image.png` + 7 blog covers generated from the logo kit. |
| 26 | About inactive tab labels 2.6:1 contrast | Now `muted` (4.8:1). |
| 26b | Unverified client-count claims: "Many Gidev clients keep Instagram…" (blog) and "Many of our clients retain us…" (FAQ + FAQPage schema) | Removed; paragraphs rewritten as advice/offer. |
| 26c | Form key and failed sends | The site is a static-assets-only Worker with no build or runtime variables, so the public Web3Forms access key is a constant in `src/contact/ContactForm.tsx`. Honeypot (`botcheck`) and `from_name: "gidevtech.com"` kept. If a send fails, "Form temporarily unavailable" + WhatsApp link (or booking link while no number is set) appears under the form, which keeps what the visitor typed. |
| 27 | One blog post (startup-studio) has no service box / contact CTA | **Open**: `audits/05-suggestions.md` #3. |
| 28 | Blog posts are 270–310 words | **Open**: content task; suggestions #2. |

## 3. Your design rounds

- **Heading weight**: headings lightened from black to bold/semibold/medium. Outfit is now one family with real weights, so the browser no longer fakes bold.
- **Palette**: one token block in `src/index.css` (`brand #18aeb4`, `brand-dark #0e7a7f`, `brand-light #eef9fa`, `brand-border`, `ink`, `muted`, `surface`). Orange, red, yellow, cream and gradients are removed, including the generated images. Teal text uses `brand-dark` (5.1:1). The full replacement list is in the saved commit message draft.
- **Services hub layout**: centred header like the other hub pages with the photo grid below it; section gaps cut from up to 256px to 96–128px, card gaps from 128px to 24–32px, one shared width and heading style for every section (`Services.tsx`).
- **Footer banner**: logo teal (`brand`) with ink text (7:1) instead of `brand-dark` with white.
- **Footer links**: column headings are near-black semibold; links are `brand-dark` teal (5.1:1) with a teal underline on hover/focus, so they no longer look like the grey body text.
- **Blog author**: all posts are by "Gidev Innovations team" (`blogData.ts`); the author box shows the logo mark and a studio bio instead of initials and "Founder of…"; BlogPosting `author` is now the Organization (`@id` `/#organization`) instead of a Person. The founder name stays in the Organization schema and `humans.txt`.
- **Logo kit**: header uses `gidev-wordmark.svg` (mobile) and `gidev-logo.svg` (≥768px); favicons, manifest and schema logo come from the kit; the old `logo.png` and favicons are deleted. The on-teal and on-dark logos are unused (no logo placement existed there).

## 4. Phase deliverables

| Deliverable | File |
| --- | --- |
| Discovery | `audits/00-discovery.md` |
| Responsive QA | `tests/responsive.spec.ts`, `playwright.config.ts`, `audits/responsive-report.md`, `audits/screenshots/` |
| Lighthouse | `audits/lighthouse/*.report.html`, `audits/lighthouse/README.md` (before/after) |
| Keyword map | `seo/keyword-map.md` |
| Schema validation | `seo/schema-validation.md`, `scripts/validate-seo.mjs` |
| Local SEO | `seo/local-seo-checklist.md` |
| Blog briefs | `seo/blog-briefs.md` |
| TTFB | `audits/ttfb.md` |
| Analytics | `audits/analytics.md` |
| Suggestions | `audits/05-suggestions.md` |
| security.txt / humans.txt | `public/.well-known/security.txt`, `public/humans.txt` |
| Privacy policy | `/privacy` (`src/privacy/Privacy.tsx`) |

New npm scripts: `images`, `fonts`, `validate:seo`, `test:responsive`.
New dev dependencies: `@playwright/test`, `subset-font`.

## 5. Deleted files (approved: "delete dead files: yes")

- **Code**: `src/chatbot/chatpage.tsx`, `src/components/ParallaxGallery.tsx`, `src/home/Testimonials.tsx`, `src/home/HomeProjects.tsx`, `src/seo/OrganizationSchema.tsx`.
- **Images**:
  - Stock avatars ×4.
  - `public/mood/` unused/non-African photos.
  - `src/projects/images/{custom,m4}.jpg`, `src/services/images/service2.png`.
  - `src/assets/react.svg`, `public/vite.svg`, `src/assets/logo.png`.
- **Old favicons**: `favicon-16x16.png`, `favicon-32x32.png`, `android-chrome-{192,512}.png`.
- **Fonts**: PT Sans, Urbanist and Changa One (12 WOFF files, none applied).
- **No routes were deleted.** `/privacy` was added.

### Repo cleanup pass

- **Files**:
  - `src/App.css` (empty).
  - `tailwind.config.js` (Tailwind v3 config; v4 reads `@theme` in `index.css`).
  - `public/robots.txt` (the build writes its own).
  - `public/favicon-16.png`, `public/favicon-32.png` (not linked).
  - `src/assets/gidev-logo-kit/_contact-sheet.png` and `gidev-logo-on-{dark,teal}-preview.{png,svg}` (review-only, not imported).
  - `src/assets/fonts/OUTFITEXTRALIGHT.{woff,woff2}`, `OUTFITEXTRABOLD.{woff,woff2}` (weights 200/800 unused).
- **Dependencies**: `dompurify`, `uuid`, `@vitejs/plugin-react`.
- **Code/config**:
  - Unused CSS removed: `fadeIn` keyframes, `text-heading-1*` tokens, `.gidev-texture-hatch`, `.logo-track`/`.marquee-track` rule.
  - `ORG_ID`, `ServicePricing` and `ProjectKind` are no longer exported.
  - `start` script removed; `preview` now runs `scripts/serve-build.mjs`.
  - Stale `dist`/`.env` entries removed from `.gitignore` and ESLint ignores; `.react-router/`, `test-results/`, `playwright-report/`, `audits/screenshots/` and `audits/lighthouse/*.report.html` are ignored (regenerate them locally).
  - README rewritten.

## 6. Needs you (TODO(human))

In rough order of impact:

1. **Web3Forms dashboard**: restrict the access key to `gidevtech.com`, then send one test enquiry from the live `/contact` page and confirm it arrives.
2. **WhatsApp number** (`BUSINESS.whatsappNumber`, international format): used only in the failed-send fallback ("— WhatsApp us at …"). While it's `null`, the fallback links to the booking calendar instead.
3. **Deploy, then verify** `curl -sI https://gidevtech.com/about` returns 200, not 307.
4. **Calendly**: rename the event to "Gidev Innovations — Intro call" and change the "Sejo Kariz" display name.
5. **Google Business Profile + Search Console**: `seo/local-seo-checklist.md`.
6. **R-Flex page** (`projects/projects.data.ts`): naming consent, how they sold before, confirmed features, live-site screenshots, one real result, approved client quote.
7. **Real photos**: founder/team for About; replace the stock set (`data/imagery.ts`, `Services.tsx`).
8. **Image licences**: fill `images-src/CREDITS.md` (source + licence for every stock file; R-Flex logo permission).
9. **Hero proof line** (`Homepage.tsx`): years, projects shipped or reply time. Only true numbers.
10. **Availability pill** (`Homepage.tsx`): a concrete line you'll keep current, or a timeless one.
11. **Reply time** on `/contact` (`Contact.tsx`).
12. **Business hours** (`BUSINESS.hours`) and **social profiles** (`BUSINESS.sameAs`); then add hours/phone/email to schema (`seo/schema.ts`) if published.
13. **Payment rails** (`PaymentsBlock.tsx`): confirm every provider listed is one you've shipped or will support.
14. **Privacy policy**: legal review against the Kenya Data Protection Act 2019; update when analytics are added.
15. **Analytics**: pick a provider (`audits/analytics.md`).
16. **Blog**: expand posts; write the three briefs in `seo/blog-briefs.md`.
17. **Manual checks after deploy**:
    - Google Rich Results Test and Schema Markup Validator.
    - Calendly at 390px on a real phone.
    - One pass on iPhone Safari and a mid-range Android.
