# Keyword map

One primary query per page so pages don't compete with each other. Search
volumes are **not** included: no keyword tool was available while writing
this. TODO(human): check volumes and difficulty in Google Keyword Planner
(location: Kenya) or Search Console after 4–6 weeks of data, and re-rank.

Intent: **C** = commercial (hiring), **I** = informational (researching).

## Money pages

| Page | Primary query | Secondary queries | Intent | Title / H1 carry it? |
| --- | --- | --- | --- | --- |
| `/` | web and mobile app development Nairobi | software development company Kenya, app developers Nairobi, software studio Nairobi | C | title ✓, H1 ✓ |
| `/services` | software development services Kenya | custom software development Kenya, software development company Nairobi | C | title ✓, H1 ✓ |
| `/services/web-apps` | web application development Nairobi | web app development company Kenya, custom web app Kenya, SaaS developers Kenya | C | title ✓, H1 ✓ |
| `/services/ecommerce` | e-commerce website development Kenya | M-Pesa e-commerce website, online shop with M-Pesa checkout, Shopify alternative Kenya | C | title ✓, H1 ✓ |
| `/services/mobile-apps` | mobile app development Kenya | Android app developers Nairobi, iOS app development Kenya, React Native Kenya | C | title ✓, H1 ✓ |
| `/services/business-websites` | business website design Nairobi | website design Kenya, company website developers Nairobi | C | title ✓, H1 ✓ |
| `/contact` | hire software developers Nairobi | contact app developers Kenya | C | title ✓ (H1 is conversational on purpose) |

## Trust pages

| Page | Primary query | Notes |
| --- | --- | --- |
| `/about` | Gidev Innovations | Brand query. H1 is brand voice; title and description carry "software studio Nairobi". |
| `/projects` | software development portfolio Kenya | Brand-adjacent; mainly supports money pages via internal links. |
| `/projects/*` | project name (R-Flex, Kibandaski Finder, Sticky Day) | Each links back to the matching service page. |

## Blog (informational → service page)

| Post | Primary query | Links to |
| --- | --- | --- |
| custom-web-apps-vs-instagram-shops-african-smes-2026 | custom web app vs Instagram shop | `/services/ecommerce` |
| designing-checkout-for-mpesa-and-mobile-money-2026 | M-Pesa checkout design | `/services/ecommerce` |
| practical-ai-for-kenyan-businesses-in-2026 | AI for businesses in Kenya | `/services/web-apps` |
| business-website-or-web-application-how-to-choose | website vs web application | `/services/web-apps` |
| mobile-apps-for-mid-range-android-east-africa-2026 | mobile app performance on Android Kenya | `/services/mobile-apps` |
| questions-to-ask-a-software-studio-before-you-sign | questions to ask a software developer before hiring | `/services/web-apps` |
| startup-studio-thinking-for-african-founders-2026 | startup studio Africa | **none** |

"Links to" is the related-service box at the end of each post (service page +
`/contact`), chosen by `serviceForPost` from each service's `relatedPosts`.
The startup-studio post isn't in any service's `relatedPosts`, so it has no
service box and no contact call-to-action. Add it to `web-apps.relatedPosts`
(or give posts a default box) to close that gap.

## Gaps (no page targets these yet)

| Query | Suggested page | Priority |
| --- | --- | --- |
| how much does an app cost in Kenya | blog post or pricing page (starting prices now on each service page) | high, strong commercial intent |
| M-Pesa API integration (Daraja) developer | `/services/mpesa-integration` or a section on `/services/ecommerce` | high |
| school management system Kenya / POS system Kenya | only if Gidev wants that work; vertical landing pages | medium |
| software developers Mombasa / Kisumu / Kampala / Kigali | **don't** create city doorway pages without a real presence there | — |

See `seo/blog-briefs.md` for three briefs that fill the first gaps.
