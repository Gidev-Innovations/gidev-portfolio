# Raddito visual and motion reference analysis

**Observed:** 19 October 2026  
**Reference:** `https://raddito.agency`  
**Capture viewports:** 1440 × 1000 and 390 × 1000 CSS pixels  
**Method:** Playwright Chromium, full-page captures and browser-side measurements of rendered bounds, computed styles, active Web Animations, hover states and scroll states. The live pages and their loaded HTML/CSS/JS were inspected. No reference assets or source code were added to the project.

Full-page screenshots for both viewports were saved outside the repository during this analysis:

`/tmp/raddito-analysis/<page>-<width>.png`

Page keys are `home`, `about-us`, `services`, `web-design`, `portfolio`, `case-studies`, `testimonials`, `contact-us`, `white-label-solution` and `blog`. Captures include the complete page, including the shared contact CTA and footer where present.

## Page and section observations

All ten requested routes returned HTTP 200. Section names below describe the reference's content hierarchy and visual sequence; they are not suggested copy or assets for Gidev.

| Page | Section-by-section observations at 1440px and 390px |
|---|---|
| **Home** `/` | **Hero:** two-column editorial layout, left-aligned heading and intro with a video panel on the right; black contact pill and a 4.9 / 270+ review proof strip sit together below the copy. On mobile, columns stack and the heading/video occupy a longer single-column opening. **About:** team introduction and photography split across the desktop grid, stacked on mobile. **Testimonials:** quote cards with pagination controls. **Services:** nine numbered service cards, three columns on desktop and a single-column stack on mobile. **Selected work:** project showcase with image/card content and compact category tags. **Process:** an interactive seven-letter framework selector and explanatory panel. **Shared ending:** a light-gray, split contact form panel followed by a dark, high-contrast footer CTA and link columns. |
| **About** `/about-us/` | **Intro:** short positioning statement and heading. **Team:** portrait-led team grid; several rows on mobile. **Trust:** numbered proof points with supporting descriptions. **Commitment:** icon-led service principles in a long list. The same form/CTA and footer close the page. |
| **Services** `/services/` | **Intro:** headline, copy, contact CTA and a small chart graphic. **Service catalogue:** nine numbered cards. **Trust:** a featured numbered benefit with pagination/progress dots. **Testimonials:** quote cards. **Commitment:** stacked icon-and-copy reasons to choose the agency. Shared form and footer follow. |
| **Web design service** `/services/web-design/` | **Hero:** service-specific heading, description, CTA and project image. **Quick links:** compact “On this page” anchor strip. **Packages:** package chooser with feature details. **Capability list:** numbered, accordion-like features. **Work:** portfolio/project examples. **Results:** case-study cards. **Testimonials:** client quotes. **Commitment:** service principles. Shared contact form and footer. The desktop layout uses multi-column project and package panels; mobile turns these into a long, mostly single-column flow. |
| **Portfolio** `/portfolio/` | One main work/gallery section: title and introduction followed by a dense grid of website, template, brand and creative work. The grid stacks on mobile. The shared contact CTA/footer is below the gallery. |
| **Case studies** `/case-studies/` | **Intro:** headline and summary framing the results. **Case-study feature list:** large project panels with summaries and “view case study” actions. The shared contact CTA/footer follows. |
| **Testimonials** `/testimonials/` | **Intro/reviews:** large heading, client-quote carousel/cards and pagination. **Continuation callout:** a short transition noting the longer set of reviews. **Etsy reviews:** a second, denser collection of quote cards. On mobile, these become long stacked lists. Shared CTA/footer follows. |
| **Contact** `/contact-us/` | **Project inquiry:** headline, supporting copy and a large form; side-by-side on desktop and stacked on mobile. **Email contact:** separate email/collaboration panel. **Locations intro:** global-team context. **Locations:** two office/location blocks with contact details. Shared footer CTA and links close the page. |
| **White label** `/white-label-solution/` | **Hero:** agency-partner pitch and team image. **Services handled:** nine numbered service cards. **Testimonials:** quote cards. **Partner reliability:** explanatory copy alongside an icon-led list. **Audience:** agency/partner panels. **FAQ:** accordion list. **Engagement models:** numbered pricing/engagement options. **Final CTA:** project form panel. Dark footer follows. |
| **Blog** `/blog/` | One main section with a centered title and intro, search input, article-card list/grid and pagination. The layout becomes a long single-column feed on mobile. Shared contact CTA/footer follows. |

## Measured layout, type and visual system

### Header and page frame

- The desktop header is sticky, 128px tall at the top and 96px after scrolling; the mobile header measured 110px. The desktop header remained visible while scrolling down and back up; no hide-on-scroll behavior was observed.
- A narrow dark utility strip sits above the primary header on desktop; on mobile it condenses to the email link above the logo and hamburger.
- The header's outer computed background was transparent over the white page and its backdrop filter was `none`. Scrolling added a `scrolling` state and shrank the inner header; no blur or scroll-triggered background fill was observed.
- At 1440px, the main section side inset measured 28px (1384px available width). At 390px, the inset was 20px (350px available width). The home hero uses two approximately 672px columns and a 40px gap at desktop width.
- Common section padding measured about 64px vertically on desktop and 24px on mobile. Hero and CTA sections vary: hero top padding was 64–80px desktop and roughly 32–48px mobile. Dense page sections sometimes remove vertical padding to visually join adjacent content.
- Most desktop card groups use three columns. The nine-card service grid measured approximately 429 × 318px per card. Cards have a 12px radius and a fine gray border (`rgb(221, 222, 223)`); the default state has no shadow.
- Large contact panels use a two-column form-and-copy composition on desktop and stack on mobile. The global footer is a dark block with a large centered CTA, then compact multi-column navigation on desktop and stacked link groups on mobile.

### Typography

| Role | Observed computed style |
|---|---|
| Display/headings | Urbanist, normally 500 for H2/H3 and 700 for H1. Desktop H1/H2 samples were about 48.64px with 56–58.4px line-height. Most mobile H1/H2 samples were about 31.52px / 36–38px line-height; home and blog H1s were 28px / 32–34px. Mobile H3 samples were about 24.96px / 32.45px. |
| Body | Outfit Custom, 300 weight, 18px / 25.2px line-height, body color `rgb(66, 66, 66)` on white. |
| Eyebrows/labels | Small uppercase labels with generous tracking and a thin purple rule beneath or beside many section headings. |
| Heading treatment | Sentence/title case rather than all caps; measured letter spacing was `normal`. No per-word headline animation or typing treatment was detected. |

The visible palette is predominantly white, black and gray, with a vivid violet accent. The sampled primary CTA is black with white text; its hover state turns violet (`rgb(79, 69, 241)`, `#4f45f1`). Purple is also used for small rules, icons, active pagination and links. The shared footer is visually near-black, and the contact form panel is light gray. Main content sections are mostly transparent over white rather than alternating through many colored bands.

### Navigation and interaction states

- Desktop navigation is compact and horizontal, with a rounded black contact action. The Services item opens a dropdown on hover. Its content measured 264px wide in the sampled state.
- On mobile, a hamburger opens a separate right-side popup/drawer. Pressing Escape closes it and releases the body's scroll lock. The initial captures record the menu closed.
- Pressing Escape while the mobile drawer is open hid it by the next 50ms sample and released the body's scroll lock. A distinct exit animation was not detected.
- A sampled service card's hover state adds a soft layered shadow after a 200ms transition; no card lift or scale was measured.
- A sampled black CTA changes to violet on hover with a 300ms transition. A sampled portfolio image did not change transform or filter on hover.
- A keyboard focus on the skip link exposed a 3px browser outline. Focus styling for all other controls was not exhaustively verified.

## Motion measurements and limits

| Element/behavior | Measured or observed specification |
|---|---|
| Sticky header | Remains pinned; desktop outer height changes 128px → 96px in the scroll state. Header declares `background-color 0.2s, transform 0.4s`; the inner shrink state exposed a running 300ms CSS transition with `ease`. No background or blur change was visible in sampled scroll states. |
| Services dropdown | Opens on pointer hover; opacity, transform and visibility transition together over 200ms with `ease`, no delay. At 150ms it was near fully visible. Pointer-leave removed the open state immediately and the content was hidden at the next 30ms sample; the CSS visibility transition is declared as 200ms. |
| Mobile navigation popup | Hamburger opens a right-side popup using the `slideInRight` animation. The active animation reported 700ms, no delay; at 50ms the panel was still about 308px translated, and by 400ms it was nearly at rest. Pressing Escape hides the popup by the next 50ms sample and releases scroll lock; no distinct exit animation was detected. |
| Service card hover | Shadow-only emphasis; CSS transition is 0.2s. No translation or scale was detected. |
| CTA hover | Black to violet fill; CSS transition is 0.3s. The sampled pill uses a 32px radius and was about 57px tall. |
| Hero | The desktop home hero contains a 672 × 378px video element configured autoplay, muted and looping. The headline itself was static in the sampled render; no split-word, per-line entrance or hero text animation was detected. The 4.9 rating and “270+” review proof sit directly after the CTA. Mobile-specific video loading/reduced-motion behavior was not verified. |
| Scroll reveals / pinned content / counters | GSAP 3.14.1 and ScrollTrigger were present in the loaded asset list, but `ScrollTrigger.getAll()` returned no active triggers on the sampled home and portfolio pages. Repeated viewport scrolling exposed no active section reveal, pinned section or counter animation in the inspected pages. This is an observation of the sampled state, not proof that no other route/interaction ever animates. |
| Marquees / testimonials | Testimonial areas show pagination controls and quote cards. No active marquee or autoplay timing was measured. |
| Image motion | No scale/translate/filter change was detected on the sampled portfolio image. Other page-specific image interactions were not exhaustively sampled. |

The mobile drawer and dropdown are the only reliably measurable entrance/visibility animations in this pass. The site loads GSAP and ScrollTrigger, but their presence alone did not correspond to registered scroll triggers in the inspected pages. Treat the video, external scripts and review widgets as reference-specific assets, not implementation requirements.

## Patterns to adopt

| Pattern to adopt | How we will implement it with Framer Motion + Tailwind v4 | Effort | Performance risk |
|---|---|---:|---|
| Clear editorial hero with text, proof and one strong media panel | Static, server/prerender-visible heading and copy; responsive Tailwind grid; only a restrained `motion` treatment for supporting media if needed | Medium | Low if media is optimized and no heavy autoplay video is introduced |
| Sticky navigation that subtly compacts after scroll | Reuse the existing single Lenis integration; derive compact state from one scroll source and animate only transform/height with Framer Motion | Medium | Low; avoid adding another animation loop or Lenis instance |
| Hover-open service dropdown with a clear mobile drawer | Accessible button state and focus management; Framer Motion `AnimatePresence` for a short opacity/translate transition, with keyboard and reduced-motion support | Medium | Low |
| Small eyebrow + rule + large heading as a repeatable section signature | Tailwind v4 CSS `@theme` tokens and reusable utility classes for type, spacing and accent rule | Low | None |
| Numbered service cards with restrained hover affordance | CSS/Tailwind border and shadow transition; reserve Framer Motion for non-essential, transform-only emphasis | Low | Very low |
| Testimonial cards with explicit controls | Reuse Gidev's own review content; accessible previous/next controls and visible pagination, no assumed autoplay | Medium | Low |
| Split contact CTA/form before a strong dark footer | Responsive Tailwind grid, existing form behavior, high-contrast brand CTA and compact mobile link groups | Medium | Low |
| Select work as proof, rather than a continuously moving ticker | Use Gidev project records and optimized responsive images in a static grid; optional subtle hover, no perpetual animation | Low | Very low |
| Process steps presented as a short sequence | Use Gidev's own process and service data; reveal only when useful and keep all content visible without motion | Low | Low |

**Do not reproduce:** Raddito's logo, copy, images/video, proprietary framework name, page assets, or exact brand styling. The table recommends general interaction/layout patterns only; Gidev's teal and near-black brand and existing URLs remain authoritative.

## Not verified

- Exact hover/touch behavior for every control on all ten pages, and whether the drawer's visible close affordance has a separate exit animation.
- The hero video's mobile network/codec behavior, bandwidth cost and reduced-motion fallback.
- Testimonial carousel autoplay or all drag/swipe interactions.
- Whether all below-fold embeds, lazy images and third-party widgets complete in every visitor's browser; third-party resources can load asynchronously.
- One isolated Playwright page load emitted `jQuery is not defined` during initialization even though `window.jQuery` was present once the page settled. The capture completed; the timing/source of this transient error was not isolated.
- A full keyboard-only or assistive-technology audit and contrast-ratio audit.

**Stop point:** this document completes reference analysis only. No Phase 0 or application changes were made as part of this step. Waiting for review before proceeding.
