# 00 — Discovery (Phase 0)

Audit date: 15 Oct 2026. No source files were changed to produce this report.

## 1. Stack and architecture

| Concern | What the repo actually does |
|---|---|
| Framework | React Router v7.18 framework mode (`@react-router/dev`), Vite 7, React 19, Tailwind v4 (`@tailwindcss/vite`) |
| App dir | `portfolio/src` (`appDirectory: "src"` in `react-router.config.ts`) |
| Rendering | **Static pre-render, not SSR.** `ssr: false` + `prerender: [...]`. Every route is emitted as an HTML file at build time; there is no Worker code running per request. |
| Hosting | Cloudflare Workers static assets (`wrangler.jsonc` → `assets.directory: ./build/client`, `not_found_handling: 404-page`). No `main` script, so **no server-side code can run** (affects form backend choice, Phase 1.2). |
| Routes | `src/routes.ts` → thin wrappers in `src/routes/*.tsx` that export `meta` and render a page component |
| Meta | `src/seo/meta.ts#buildMeta(path, overrides)` reads `src/data/site.ts#siteRoutes`; detail pages pass overrides from their data files |
| Schema | `src/seo/OrganizationSchema.tsx`, rendered only by `routes/home.tsx`. No other JSON-LD anywhere. |
| Sitemap/robots | `scripts/generate-seo-files.mjs` runs after build; discovers `index.html` files; `lastmod` is always **build date** for every URL (not real modification date) |
| Smooth scroll | Lenis singleton in `src/lib/lenis.ts`, started in `entry.client.tsx` |
| Animations | framer-motion everywhere (`initial`/`animate` + `useInView`, or `whileInView`) — no shared reveal hook |
| Calendly | `src/contact/Contact.tsx` injects `widget.js` in `useEffect`; inline div with `data-url="https://calendly.com/gidevtech/30min?primary_color=2ec4c7"` |
| Dead code | `src/chatbot/chatpage.tsx` (not routed), `src/assets/react.svg`, `public/vite.svg` |

## 2. Route → component → data → meta

| Route | Route module | Page component | Data source | Meta source |
|---|---|---|---|---|
| `/` | `routes/home.tsx` | `home/Homepage.tsx` (+ `ShowcaseTicker`, `Process`, `HomeServices`→`ParallaxGallery`, `Features`, `HomeProjects`, `Testimonials`, `HomeFaq`) | `data/imagery.ts`, `data/services.ts`, `data/faqs.ts`, `projects/projects.data.ts`; testimonials/features/process copy are **hard-coded inside the components** | `siteRoutes["/"]` + `OrganizationSchema` |
| `/services` | `routes/services.tsx` | `services/Services.tsx` (+ `Faqs`, `FaqsItem`) | `data/services.ts`, `data/imagery.ts`, `data/faqs.ts` | `siteRoutes["/services"]` |
| `/services/:slug` | `routes/service-detail.tsx` | `services/ServiceDetail.tsx` | `data/services.ts` (`intro`, `includes[]`, `bestFor` — this is the whole page body) | `service.metaTitle/metaDescription` |
| `/projects` | `routes/projects.tsx` | `projects/Projects.tsx` + `ProjectCard.tsx` | `projects/projects.data.ts` | `siteRoutes["/projects"]` |
| `/projects/:slug` | `routes/project-detail.tsx` | `projects/ProjectDetails.tsx` | `projects/projects.data.ts` | overrides per project |
| `/about` | `routes/about.tsx` | `about/About.tsx` | `data/imagery.ts`, `data/services.ts` | `siteRoutes["/about"]` |
| `/contact` | `routes/contact.tsx` | `contact/Contact.tsx` | — (Calendly URL inline) | `siteRoutes["/contact"]` |
| `/blog` | `routes/blog.tsx` | `blog/Blog.tsx` | `blog/blogData.ts` | `siteRoutes["/blog"]` |
| `/blog/:slug` | `routes/blog-post.tsx` | `blog/Blogpost.tsx` | `blog/blogData.ts` | `post.title` + `post.excerpt` |
| `*` | `routes/not-found.tsx` | `not-found/NotFound.tsx` | — | `buildMeta("/404")` |

Layout (`src/root.tsx`): `Navbar` → `<main>` → `Footer` → scroll-to-top button.

## 3. Root causes behind the live-audit findings

These change *how* some findings should be fixed, so they are worth reading before Phase 1.

- **#4 invisible content — confirmed, and worse than "observer didn't fire".** framer-motion serialises `initial={{ opacity: 0 }}` into the pre-rendered HTML as inline `style="opacity:0"`. The built `index.html` contains **20** `opacity:0` inline styles; `/services/web-apps` contains 4. Without JS (crawlers that don't execute it, slow Android before hydration) that content is invisible. Affected: `Homepage` hero (6 elements), `Process`, `Features`, `Testimonials`, `HomeProjects`, `About` (7 `whileInView`), `Services` (9), `ServiceDetail` (3), `Faqs`/`FaqsItem`, `Blogpost` (3). Fix must stop rendering `opacity:0` in HTML, not just tune `rootMargin`.
- **#5 "empty src" images — they aren't empty.** `ParallaxGallery` renders **all three layouts** (desktop 4-col, tablet 3-col, mobile 2-col) into the DOM and hides two with CSS. The hidden copies are `loading="lazy"` inside `display:none`, so they never load (`naturalWidth 0`). That is also why images appear 3–5×: e.g. `city-skyline.jpg` = 2 copies in the ticker (track is doubled for the loop) + 3 copies in the gallery.
- **#6 mood grid height.** `ParallaxGallery` is a fixed `1800px` scroll-jacked sticky section driven by Lenis, placed inside `HomeServices` — it is the "mood grid", not a separate component.
- **#7 scroll-to-top overlaps footer.** The button in `root.tsx` is `absolute bottom-4 right-4` on the root wrapper, so it sits on top of the footer link row. It is also `animate-bounce` forever.
- **#11 mobile menu.** `Navbar` animates `height: 0→auto` + `opacity: 0→1` (the see-through effect) and each item from `opacity: 0` with staggered delay. `links` array has no Contact; only a "Book A Call" button. No Escape handling, no focus trap, doesn't close on route change (only on link click).
- **#3 Calendly mismatch.** The URL is the `30min` event. Copy says 15 min in **7 places**: `Contact.tsx` (×3), `Homepage.tsx`, `Process.tsx` (×2), `Footer.tsx`, `site.ts` contact title + description. The "Sejo Kariz" name is the Calendly account display name — it is not in the repo and must be changed in Calendly.
- **#14 FAQ toggles** (`HomeFaq`, `FaqsItem`) are clickable `<div>`s, not `<button>`s: not keyboard-operable, no `aria-expanded`. Answers are unmounted when closed, so FAQPage schema must be generated from `data/faqs.ts`, not the DOM.
- **OG image is missing.** `SITE.ogImage = "/og-image.png"` but no such file exists in `public/` or the build. Every page's `og:image`/`twitter:image` points at a 404 (bad WhatsApp/LinkedIn previews).
- **TTFB 1.5 s** cannot be cold SSR — pages are static files. Likely causes to check in Phase 4: Cloudflare cache rules / HTML not cached at edge, or the measurement included a redirect. Needs a `curl -w` check against production.
- **Unsplash hot-links.** Three images (`urbanDusk`, `checkout`, `serverRack`) plus `serviceEcommerce` and one blog image load from `images.unsplash.com` at runtime — third-party connection on the critical path and no licence record.

## 4. Grep results for flagged strings

| String | Hits |
|---|---|
| `Placeholder` | `src/home/Testimonials.tsx:21,27,33,39` (quotes), `:89` (visible "Placeholder cards" note) |
| `Sejo Kariz` | none (comes from the Calendly account) |
| `30 Minute` / `30min` | `src/contact/Contact.tsx:51` (`calendly.com/gidevtech/30min`) |
| `city-skyline` | `src/data/imagery.ts:30` (`nairobiStreet` — the alt and key both claim Nairobi; the photo is not) |
| `Blog page` | `src/blog/Blog.tsx:94` (the `<h1>`), comment at `:26` |
| `tel:` / `mailto:` / `wa.me` | **none anywhere** — confirms #2 |

## 5. Image inventory

Sizes are on-disk bytes. "Refs" counts code references; "Home DOM copies" counts rendered `<img>` instances on `/`.

### `public/mood/` (served as-is, no processing)

| File | Dimensions | Bytes | Referenced as | Used on | Home DOM copies | Notes |
|---|---|---|---|---|---|---|
| `city-skyline.jpg` | 1200×800 | 203,020 | `imagery.nairobiStreet` | Home ticker + gallery, Services | 5 | NYC skyline labelled Nairobi — replace |
| `laptop-ui.jpg` | 1200×1500 | 289,606 | `imagery.laptopWork`, `imagery.productUi` (same file, two keys) | Home ticker + gallery, Services, blog post 1 | 5 | generic |
| `african-woman-portrait.jpg` | 1200×1804 | 274,307 | `imagery.africanProfessional` | Home ticker + gallery, About hero | 5 | heaviest mood file |
| `code-screen.jpg` | 1200×800 | 97,818 | `imagery.codeOnScreen` | Home ticker + gallery, blog post 3 | 5 | generic |
| `phone-desk.jpg` | 1200×800 | 115,592 | `imagery.smartphone` | Home ticker + gallery | 5 | generic iPhone |
| `design-board.jpg` | 1200×1500 | 243,848 | `imagery.planning`, `imagery.designBoard` | Home gallery, Services, blog post 4 | 3 | |
| `african-man-outdoors.jpg` | 1200×800 | 138,722 | `imagery.collaboration` | Home gallery, Services | 3 | alt claims "collaboration" key; image is a single portrait |
| `african-man-portrait.jpg` | 1200×800 | 152,044 | — | **unused** | 0 | |
| `african-woman-smile.jpg` | 1200×800 | 78,606 | — | **unused** | 0 | |
| `avatars/ceo.jpg` | 400×400 | 26,342 | Testimonials "Amina Otieno" | Home | 2 | stock face, fake name |
| `avatars/pm.jpg` | 400×400 | 32,424 | Testimonials "Kwame Asante" | Home | 2 | stock face, fake name |
| `avatars/founder.jpg` | 400×400 | 24,876 | Testimonials "Wanjiru Kamau" | Home | 2 | the non-African stock face |
| `avatars/cto.jpg` | 400×400 | 18,868 | Testimonials "Chinedu Okonkwo" | Home | 2 | stock face, fake name |

### Remote (Unsplash hot-links, no local copy, no licence record)

| Key | Used on |
|---|---|
| `imagery.urbanDusk` | Home gallery, blog post 7 |
| `imagery.checkout` (card payment — not mobile money) | Home gallery, blog post 2 (the M-Pesa post) |
| `imagery.serverRack` | Home gallery, blog post 6 |
| `imagery.serviceEcommerce` | `/services`, `/services/ecommerce`, About |
| inline URL in `blogData.ts:192` | blog post 5 |

### `src/projects/images/` and `src/services/images/` (Vite-hashed into `build/client/assets`)

| File | Dimensions | Bytes | Referenced as | Notes |
|---|---|---|---|---|
| `m2.jpg` | 6568×4791 | 646,255 | `imagery.serviceWebsites` | camera-original, ~10× oversized |
| `custom.jpg` | 6112×4075 | 642,143 | `imagery.serviceMobile` | camera-original |
| `m3.jpg` | 4627×3201 | 388,552 | `imagery.serviceWebApps` | camera-original |
| `kibandaski.jpg` | 1402×1122 | 397,646 | Kibandaski project | |
| `R-Flex.png` | 1536×1024 | 188,217 | R-Flex project | PNG photo |
| `sticky-day.webp` | 1466×973 | 66,090 | Sticky Day project | only already-modern format |
| `m4.jpg` | 6016×4016 | 368,496 | — | **unused** |
| `services/images/service2.png` | 540×487 | 107,412 | — | **unused** |
| `src/assets/logo.png` | 384×384 | 28,383 | Navbar | rendered at h-20/h-40 |

No `srcset`, `sizes`, `<picture>`, AVIF or WebP pipeline exists. Only `ShowcaseTicker` sets `width`/`height`.

## 6. Build baseline (`npm run build`, before any change)

- Build OK, 20 URLs pre-rendered + SPA fallback + `404.html`.
- Client JS: **577 KB raw / 185 KB gzip** total. Largest chunks: `entry.client` 190 KB, `chunk-62JRHF6Z` 128 KB (react-router), `proxy` 119 KB (framer-motion), `home` 29 KB, `lenis` 17 KB.
- CSS: 45 KB.
- Fonts: **19 `.woff` files, 1.79 MB** emitted (no `woff2`). Outfit is the only family visibly used; PT Sans, Urbanist and Changa One are declared in `index.css` — need to confirm which are actually applied before removing.
- Pre-rendered `/index.html`: 61 KB, containing 20 inline `opacity:0` styles.
- `og-image.png`: **missing** from build output.

## 7. Decisions needed from the owner before Phase 1

Recorded in the chat; repeated here so the file is self-contained.

1. Business phone / WhatsApp number and public email (NAP must match Google Business Profile exactly).
2. Form backend — the site has no server runtime, so options are a third-party endpoint (Formspree / Web3Forms) or adding a Worker `main` script + Resend.
3. Calendly: change the event to 15 min, or change the site copy to 30 min. The "Sejo Kariz" display name must be changed in the Calendly account.
4. Address detail to publish (city only vs street), business hours, social profile URLs.
5. Permission to delete dead files listed above (`chatpage.tsx`, unused images, unused fonts).
