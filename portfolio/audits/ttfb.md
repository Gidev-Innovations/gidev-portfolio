# Server response (TTFB) — live gidevtech.com

Measured 15 Oct 2026 with `curl` from a Kenyan connection (Cloudflare trace:
`loc=KE`). This is the **currently deployed** site, not this branch.

| URL | TTFB (warm, median of 2) | Notes |
| --- | --- | --- |
| `/` | ~0.58 s | `CF-Cache-Status: HIT`; first cold request 2.4 s (DNS 1.1 s + TLS) |
| `/services` | ~0.57 s | **307 → `/services/`** before any HTML |
| `/sitemap.xml` | ~0.05 s | |

## Findings

### 1. Every page redirects to a trailing-slash URL (fixed in this branch)

`/about`, `/blog`, `/services`, `/services/web-apps`… all return
`307 Temporary Redirect` to `/about/` etc. Canonicals, the sitemap and every
internal link use the no-slash form, so:

- every internal click and every search visit pays an extra round trip
  (~0.5 s on mobile in Kenya);
- Google sees canonical URLs that redirect, which weakens the canonical signal.

Cause: Cloudflare static assets default to `html_handling: "auto-trailing-slash"`,
which serves `folder/index.html` at `/folder/`.
Fix: `"html_handling": "drop-trailing-slash"` in `wrangler.jsonc`, so `/about` is served
directly and `/about/` redirects to `/about`.
**Verify after deploy:** `curl -sI https://gidevtech.com/about` must return `200`.

### 2. Kenyan visitors are sometimes served from Budapest

Five back-to-back requests to `gidevtech.com` were answered by `CF-RAY …-NBO`
(Nairobi) twice and `…-BUD` (Budapest) three times. Requests to
cloudflare.com from the same connection went to NBO. On Cloudflare's free plan,
traffic is sometimes routed to a farther data centre when the local one is
busy or the ISP's peering prefers it. That explains the 0.55 s TTFB for an
edge-cached HTML file: most of it is the round trip to Europe.

Options (TODO(human), these are account decisions):

- Nothing in the code can change this. A paid Cloudflare plan gets
  better local routing priority; worth checking only once traffic justifies it.
- Re-measure from Safaricom and Airtel mobile data: routing differs by ISP.
- Keep pages small, which is already the case (home HTML ~9 KB compressed live;
  this branch's HTML is pre-rendered and brotli'd).

### 3. HTML caching

Live HTML is served with `Cache-Control: public, max-age=0, must-revalidate`
and edge HIT. That's right for HTML (deploys show up at once). Hashed files in
`/assets/` are immutable by default on Workers static assets.

## Re-measure after deploy

```sh
for u in / /services /about /blog; do
  curl -s -o /dev/null -w "$u ttfb=%{time_starttransfer} code=%{http_code}\n" "https://gidevtech.com$u"
done
curl -sI https://gidevtech.com/ | grep -i cf-ray   # NBO = Nairobi
```
