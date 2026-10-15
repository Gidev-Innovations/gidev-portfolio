# Local SEO checklist (Nairobi / Kenya)

For "software developers Nairobi"-type searches, the map pack and knowledge
panel come mostly from a **Google Business Profile** (GBP), not the website.
Everything here is TODO(human): it needs accounts, real details or decisions
the site can't make.

## 1. Google Business Profile

- [ ] Create or claim the profile at business.google.com as **Gidev Innovations**,
      exactly as on the site (`BUSINESS.legalName` in `src/data/site.ts`).
- [ ] **Category**: primary "Software company". Secondary: "Website designer",
      "Mobile app developer" (pick only ones that are true).
- [ ] **Address**: if there's no public office, choose *service-area business*,
      hide the address, and set service areas to Nairobi + Kenya. Don't use a
      virtual office or co-working address you can't receive verification at.
- [ ] **Hours**: set real hours, then put the same text in `BUSINESS.hours`
      (it's hidden while `null`) and add `openingHoursSpecification` in
      `src/seo/schema.ts`.
- [ ] **Phone**: GBP needs one. The site deliberately shows no phone yet. If
      you add one to GBP, decide whether it also goes on the site (Google
      prefers the name/address/phone to match everywhere).
- [ ] **Website**: `https://gidevtech.com/` (with UTM if you want to separate
      GBP traffic: `?utm_source=google&utm_medium=organic&utm_campaign=gbp`).
- [ ] **Services**: add the four services with the same names as the site:
      Web Applications, E-commerce, Mobile Apps, Business Websites.
- [ ] **Photos**: real ones only: team at work, screens of shipped projects,
      logo (`public/icon-512.png` from the logo kit).
- [ ] **Description**: reuse the home meta description; no keyword stuffing.
- [ ] Verify (video or postcard), then add the GBP URL to `BUSINESS.sameAs`.

## 2. Reviews

- [ ] Ask past clients for Google reviews with the GBP "Ask for reviews" link.
- [ ] Reply to every review.
- [ ] Don't copy reviews onto the site as testimonials without the client's
      written permission. Never add `Review`/`AggregateRating` schema for
      reviews about yourself on your own site (Google ignores it for
      LocalBusiness and may penalise it).

## 3. Consistent name/address/phone and citations

Use exactly the same name, locality and (if published) phone everywhere:

- [ ] LinkedIn company page → add to `BUSINESS.sameAs`
- [ ] GitHub org (if separate from `Josekariz`)
- [ ] Clutch.co / GoodFirms: software-agency directories that rank for
      "software development company Kenya"
- [ ] Kenyan directories: Yellow Pages Kenya, BrighterMonday company profile
- [ ] Bing Places (imports from GBP in one click)
- [ ] Apple Business Connect (Apple Maps)

## 4. On the site (already done in this branch)

- [x] One `ProfessionalService` entity with `@id`, Nairobi address region, `areaServed`
- [x] "Nairobi, Kenya" in home, services and contact titles
- [x] `en-KE` language and `en_KE` OpenGraph locale
- [x] Single source for the business details (`BUSINESS` in `src/data/site.ts`)

## 5. Search Console and Bing

- [ ] Verify `gidevtech.com` as a **Domain property** (DNS TXT in Cloudflare).
- [ ] Submit `https://gidevtech.com/sitemap.xml`.
- [ ] After the trailing-slash fix deploys, use URL Inspection on `/services`
      to confirm "URL is on Google" with the no-slash canonical.
- [ ] Bing Webmaster Tools: import from Search Console.
