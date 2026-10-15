# Blog briefs

Three posts that fill gaps in `seo/keyword-map.md`. Each targets a query with
hiring intent that no current page answers, and ends at a service page and
`/contact`. Anything that needs real numbers or client facts is marked
TODO(human); don't publish with guesses.

House style (matches the existing posts): plain English, short paragraphs,
Kenyan context (KES, M-Pesa, mid-range Android, Safaricom data costs), no
filler intros, one author byline (Joseph Macharia), `date` in "D Month, YYYY".

---

## 1. How much does it cost to build an app or website in Kenya? (2026)

- **Slug**: `cost-to-build-app-or-website-kenya-2026`
- **Primary query**: how much does an app cost in Kenya
- **Secondary**: website design cost Kenya, mobile app development cost Kenya, e-commerce website price Kenya
- **Intent**: commercial; the reader is budgeting and close to contacting someone
- **Category**: Founders · **Service box**: `/services/web-apps` (add slug to its `relatedPosts`)
- **Length**: 1,400–1,800 words

Outline:

1. Short answer up top: ranges in KES for business website / e-commerce / web app / mobile app. **TODO(human): real Gidev ranges.** No made-up market averages.
2. What drives the price: number of user roles, payments (M-Pesa Daraja, card), integrations, admin dashboard, offline needs, design depth.
3. Website vs web app vs mobile app: link to *business-website-or-web-application-how-to-choose*.
4. Ongoing costs people forget: hosting, domain (.co.ke), M-Pesa paybill/till fees, app store fees (Google $25 once, Apple $99/yr), maintenance.
5. Fixed price vs time-and-materials: when each is fair.
6. How to cut cost without cutting quality: phase 1 scope, use Shopify/WooCommerce when custom isn't needed (honest advice builds trust).
7. Call to action: "Send us your idea and we'll reply with a range" → `/contact`.

Schema: BlogPosting (automatic). Consider adding the ranges as a simple HTML table so they can appear as a snippet.

---

## 2. M-Pesa Daraja API integration: a guide for business owners

- **Slug**: `mpesa-daraja-integration-guide-for-businesses`
- **Primary query**: M-Pesa API integration
- **Secondary**: Daraja API STK push, M-Pesa paybill integration website, lipa na M-Pesa online
- **Intent**: commercial/informational; owners and PMs about to hire a developer
- **Category**: E-commerce · **Service box**: `/services/ecommerce`
- **Length**: 1,200–1,500 words

Outline:

1. What Daraja is, in one paragraph, and what you need first: paybill or till, Safaricom business account, go-live approval.
2. The three common flows: STK Push (customer gets a prompt), C2B (customer pays paybill and you get a callback), B2C (payouts/refunds).
3. What can go wrong: callbacks that never arrive, duplicate payments, timeouts, reconciling against the statement. How a good build handles each (idempotency, a status query, a reconciliation report).
4. Timeline: sandbox → go-live approval. **TODO(human): typical time from your own projects.**
5. Security: never put consumer keys in the app; callback URL validation.
6. Checklist to give your developer.
7. Link to *designing-checkout-for-mpesa-and-mobile-money-2026*; call to action → `/services/ecommerce`.

---

## 3. Hiring a software development company in Nairobi: a checklist

- **Slug**: `hiring-software-development-company-nairobi-checklist`
- **Primary query**: software development company Nairobi
- **Secondary**: how to choose an app developer in Kenya, freelance vs agency Kenya
- **Intent**: commercial; comparing vendors
- **Category**: Founders · **Service box**: `/services/web-apps`
- **Length**: 1,000–1,300 words

Outline:

1. Freelancer vs studio vs big agency: honest trade-offs (cost, continuity, accountability).
2. Red flags: no shipped work you can click, no written scope, ownership of code/accounts not stated, all payment upfront.
3. What to ask for: live links, the repo or a code sample, who will actually work on it, the support terms after launch.
4. Contracts: IP ownership, Kenyan Data Protection Act 2019 obligations if user data is involved, payment milestones.
5. Link to *questions-to-ask-a-software-studio-before-you-sign* (this post is the shorter, search-focused entry point; that one is the deep dive).
6. Call to action: "See how we work" → `/projects`, then `/contact`.

Watch for overlap with *questions-to-ask-a-software-studio-before-you-sign*:
keep this one about *choosing a vendor* and that one about *the conversation
before signing*. Link both ways.

---

## Publishing checklist (each post)

- [ ] Add to `src/blog/blogData.ts` (slug, title ≤ 60 chars, excerpt ≤ 155 chars, ISO-parsable date)
- [ ] Add the slug to the right service's `relatedPosts` in `src/data/services.ts` (otherwise the post has no service box or contact call-to-action)
- [ ] `npm run images` to generate the OG cover
- [ ] `npm run build && npm run validate:seo`
- [ ] Request indexing in Search Console
