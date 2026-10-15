# Phase 5 — suggestions, challenged

The brief listed these as ideas to challenge, not decisions. For each:
the verdict, why, and what's done or still needed.

## From the brief

### "Taking on new partners" pill → concrete availability line
**Agree, needs you.** "2 project slots open for November" is more credible
and creates honest urgency, but only if it's true and kept up to date; a
stale month is worse than a vague line. The pill is now teal (palette work)
and has a `TODO(human)` in `src/home/Homepage.tsx`. If you won't update it
monthly, use a timeless line instead, e.g. "Replies within one working day"
(also needs to be true).

### Pricing / engagement page with ranges
**Agree: the highest-value page not yet built.** "How much does an app cost
in Kenya" is the most commercial query in the keyword map and no page answers
it. Starting prices (KES only) are now on each service page, from
`data/services.ts`, so a page or post can reuse them. Brief #1 in `seo/blog-briefs.md` covers the
blog version; a `/pricing` page could reuse the same numbers. Ask before adding
the route.

### Founder/team section with real photos on About
**Agree.** About still uses stock imagery (`woman-city-dusk`,
`business-dashboard-laptop`) and the image credits are TODO in
`images-src/CREDITS.md`. One real photo of Joseph with a short "who you'll
work with" paragraph would do more for trust than any other change here.
Needs: photo(s), and permission for anyone else pictured.

### M-Pesa / Airtel Money / Flutterwave / Paystack trust block
**Done.** `src/home/PaymentsBlock.tsx` ("Checkout the way Kenyan customers
actually pay") is on the home page. It claims only what the stack supports,
with no client names. Next step: link it to the M-Pesa integration post once
brief #2 is written.

### Swahili microcopy ("Karibu", "Tuongee")
**Hold.** The brief tied this to the WhatsApp CTA, which you've decided
against for now. In the contact form it's a brand-voice call only you can
make. If you want it, keep it to greetings and headings ("Karibu" on
`/contact`); don't put it in form labels or errors, which must stay clear.

### security.txt, humans.txt, 404 with contact CTA, privacy policy
**Done.** `public/.well-known/security.txt` (contact form, no email),
`public/humans.txt`, a 404 page with a `/contact` link, and `/privacy`.
The privacy policy still needs a legal read (TODO(human) in the file), and must be
updated when analytics are added.

## New suggestions from this audit

| # | Suggestion | Why | Effort |
| --- | --- | --- | --- |
| 1 | **Deploy the `wrangler.jsonc` trailing-slash fix first** | Every page on the live site 307-redirects; canonicals point at redirects. See `audits/ttfb.md`. | done in code; deploy |
| 2 | **Expand the blog posts** | All 7 posts are 270–310 words. That's thin for ranking on informational queries; 900–1,500 words with examples is typical for page 1. They also can't contain inline links (the content model has no link type). | content: you; code: add a `link` span to `BlogContent` (small) |
| 3 | **Give every post a call-to-action** | `startup-studio-thinking-for-african-founders-2026` matches no service's `relatedPosts`, so it renders no service box and no contact link. Either add it to a service or render a default contact box. | small |
| 4 | ~~Verify two pre-existing client claims~~ **done** | "Many Gidev clients keep Instagram…" (blog) and "Many of our clients retain us after launch…" (FAQ) are removed; both paragraphs are rewritten as advice/offer with no client-count claim. | — |
| 5 | **Turn on Cloudflare Web Analytics now**, Plausible later | Free and cookieless; the site can't currently tell whether any of this works. `audits/analytics.md`. | 5 min |
| 6 | **Track CTA clicks by section** | The brief asked for it; only form submit and Calendly booking are tracked. Do it once a provider is chosen, e.g. `track("cta_click", { section: "hero" })`. | small |
| 7 | **Metric-matched fallback font** | Mobile LCP on home is the hero H1 waiting on Outfit Bold (~1.2 s render delay). A `size-adjust`ed Arial fallback lets text paint immediately without layout shift. | small–medium |
| 8 | **Replace framer-motion's simple fades with CSS** | ~45 KiB of unused JS on mobile; most motion is fade/slide that `reveal.ts` + CSS already handles. | medium |
| 9 | **Recompress `kibandaski` AVIF** | 83 KB at 768w, 3–4× the other images. Lower its AVIF quality in `scripts/optimize-images.mjs`. | tiny |
| 10 | **Footer / teal CTA logo** | The logo kit's on-teal logo isn't used yet; the teal CTA block has no logo. Optional brand touch. | tiny |
| 11 | ~~About tab labels contrast~~ **done** | Inactive tab labels were `gray-400` on white (~2.6:1), below AA even for large text (3:1). Now the `muted` token (4.8:1). | — |
| 12 | **Run the responsive suite in CI** | `npm run test:responsive` and `npm run validate:seo` both exit non-zero on failure; adding them to Cloudflare Builds or a GitHub Action keeps regressions out. | small |

## Rejected

- **City doorway pages** (Mombasa, Kisumu, Kampala, Kigali…): without a real
  presence or projects there they're thin duplicates that Google demotes.
  `areaServed` in the schema already says East Africa.
- **Review/AggregateRating schema**: self-serving reviews aren't eligible for
  stars and can trigger a manual action. Use the Google Business Profile.
- **`WebSite` SearchAction**: the site has no search, so the markup would be false.
