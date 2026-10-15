# Analytics

**State:** no analytics script is installed. The site already calls
`track()` (`src/lib/track.ts`) at the two conversion points, so events start
flowing as soon as a provider is loaded. Until then the call does nothing.

| Event | Fired from | Props |
| --- | --- | --- |
| `contact_form_submit` | `src/contact/ContactForm.tsx`, after a successful Web3Forms submit | `budget` |
| `calendly_booking` | `src/contact/Contact.tsx`, on Calendly's `event_scheduled` message | — |

## Choosing a provider — TODO(human)

| Option | Cost | Cookies / consent | Custom events | Notes |
| --- | --- | --- | --- | --- |
| **Cloudflare Web Analytics** | free | none | no | One toggle in the Cloudflare dashboard, no code. Page views and Core Web Vitals only, so it **won't** record the two events above. |
| **Plausible** | paid (~$9/mo) | none | yes | `track()` already supports it. Add its `<script>` in `root.tsx`. |
| **GA4** | free | sets cookies | yes | `track()` already supports `gtag`. Needs a consent notice under the Kenya Data Protection Act 2019 and an update to `/privacy`. Feeds Google Ads if you run ads later. |

Recommendation: turn on **Cloudflare Web Analytics** now (free, no code, no
consent banner) for traffic and Web Vitals. Add **Plausible** when you need
conversion numbers. Pick GA4 only if you plan to run Google Ads.

Whichever you pick:

1. Add the script tag in `src/root.tsx` `<head>` (Plausible/GA4 only).
2. Update `src/privacy/Privacy.tsx`: it currently says no analytics are used.
3. Mark `contact_form_submit` and `calendly_booking` as conversions/goals.
4. In Search Console, link the property (GA4) or just use Search Console for queries.

## What to watch monthly

- Organic sessions to the four `/services/*` pages (the money pages)
- `contact_form_submit` + `calendly_booking` per 100 organic sessions
- Search Console: queries with impressions but CTR < 2%: rewrite those titles/descriptions
- Core Web Vitals (Cloudflare or Search Console): LCP on mobile < 2.5 s
