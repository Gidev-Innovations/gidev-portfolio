# gidevtech.com

Marketing site for Gidev Innovations. React Router 7 (framework mode, `ssr: false`)
pre-renders every route to static HTML; Cloudflare Workers serves `build/client`
as static assets (`wrangler.jsonc`).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR. |
| `npm run build` | Type-check, pre-render all routes, write `sitemap.xml`, `robots.txt` and `404.html`. |
| `npm run preview` | Serve `build/client` on port 4173 the way Cloudflare does (trailing-slash redirect, compression). |
| `npm run lint` | ESLint. |
| `npm run validate:seo` | Check titles, descriptions, canonicals and JSON-LD in the built HTML. |
| `npm run test:responsive` | Build, then run the Playwright suite in `tests/` (layout at 320–1920px, routing). |
| `npm run images` | Regenerate `public/img/` and the OG cards from `images-src/` and the logo kit. |
| `npm run fonts` | Rebuild the subset `.woff2` fonts from the `.woff` sources in `src/assets/fonts/`. |
| `npm run deploy` | Upload a new Worker version (needs `wrangler`). |

## Where things live

- Content: `src/data/` (site, services, FAQs, images), `src/blog/blogData.ts`, `src/projects/projects.data.ts`.
- SEO helpers: `src/seo/`.
- Brand assets: `src/assets/gidev-logo-kit/` (see its README).
- Audit record: `audits/` (start with `audits/CHANGELOG.md`) and `seo/`.
- Open items: search for `TODO(human)`.
