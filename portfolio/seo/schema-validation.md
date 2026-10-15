# Structured data validation

Checked against the **built** HTML (what crawlers get), not the source:

```sh
npm run build && npm run validate:seo
```

`scripts/validate-seo.mjs` parses every JSON-LD block on every pre-rendered
page and checks the properties Google requires for each type, plus title
(≤ 60 chars), meta description (≤ 155), canonical, and a single `<h1>`.
It exits non-zero on any failure, so it can run in CI.

**Result: 21 / 21 pages pass.**

## Types per page

| Page | JSON-LD |
| --- | --- |
| `/` | ProfessionalService, WebSite, FAQPage |
| `/services` | BreadcrumbList |
| `/services/{web-apps, ecommerce, mobile-apps, business-websites}` | Service, BreadcrumbList, FAQPage |
| `/projects` | BreadcrumbList |
| `/projects/{r-flex, kibandaski-finder, sticky-day}` | BreadcrumbList |
| `/blog` | BreadcrumbList |
| `/blog/*` (7 posts) | BlogPosting, BreadcrumbList |
| `/about`, `/contact`, `/privacy` | none (not needed) |

All business references use one `@id` (`https://gidevtech.com/#organization`),
so Service, WebSite and BlogPosting `publisher`/`provider` resolve to the
same entity.

## Fixed during validation

| Issue | Fix |
| --- | --- |
| Home title 66 chars, description 177 | Title "Web & Mobile App Development in Nairobi, Kenya \| Gidev" (54); description trimmed to 147 |
| `/about` description 164 | Reworded to 154 |
| `/projects/sticky-day` description 166 (it's the project summary) | Summary tightened to 154 |
| `/services` 157, `/blog` 158 descriptions | Trimmed to ≤ 155 |
| Blog titles over 60: "Custom Web Apps vs Instagram Shops: What African SMEs Need in 2026" (66), "Practical AI… \| Gidev Innovations" (62) | Optional `seoTitle` on posts; the brand suffix is only added when the result stays ≤ 60 |
| `/about` H1 read "productsand each other" to crawlers and screen readers (JSX dropped the space before `<br />`) | Explicit `{" "}` |
| Hubs had no breadcrumbs | BreadcrumbList on `/services`, `/projects`, `/blog` |
| Schema logo pointed at the old PNG | `https://gidevtech.com/icon-512.png` from the logo kit |

## What to expect in Google

- **Breadcrumbs**: eligible on all pages that have them.
- **Article (BlogPosting)**: eligible; has headline, image (1200×630 OG card), ISO dates, author with URL.
- **FAQPage**: valid, but since Aug 2023 Google only shows FAQ rich results for
  well-known government and health sites. The markup is harmless and still
  helps other engines and AI answers; don't expect FAQ dropdowns in Google.
- **ProfessionalService**: feeds the knowledge panel together with a Google
  Business Profile (see `seo/local-seo-checklist.md`). It's missing
  `telephone`, `email`, `openingHoursSpecification`, `geo` and `priceRange`.
  These are TODO(human) in `src/seo/schema.ts`. Add them only once they're
  published on the site, so the two stay consistent.

## Manual checks still to do (need the live URL)

TODO(human), after deploy:

1. [Rich Results Test](https://search.google.com/test/rich-results): `/`, `/services/ecommerce`, one blog post.
2. [Schema Markup Validator](https://validator.schema.org/): `/`.
3. Search Console → Enhancements: confirm Breadcrumbs and Articles are detected with 0 errors after the first crawl.
