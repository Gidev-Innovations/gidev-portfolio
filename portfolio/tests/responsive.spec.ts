import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

/**
 * Responsive QA across 320–1920px for every route in the built sitemap,
 * plus the 404 page.
 *
 * Per route and width:
 *   - no horizontal scroll
 *   - exactly one visible <h1>
 *   - every <img> has an alt attribute and fits the viewport
 *   - interactive targets are at least 44×44px (WCAG 2.5.5). Links inside
 *     running text are exempt, as WCAG allows.
 *   - at 390px the h1 wraps to at most 3 lines
 *   - below 768px, form fields use ≥16px text (iOS zooms in otherwise)
 *   - the footer Contact link is not covered by the back-to-top button
 *   - no console errors
 */

const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920];

const sitemap = readFileSync("build/client/sitemap.xml", "utf8");
const ROUTES = [
  ...[...sitemap.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map(([, path]) => path || "/"),
  "/this-page-does-not-exist",
];

const SCREENSHOT_ROUTES = new Set(["/", "/services", "/services/web-apps", "/projects", "/blog", "/contact"]);
const SCREENSHOT_WIDTHS = new Set([360, 768, 1440]);

type Target = { tag: string; text: string; width: number; height: number };

async function blockThirdParty(page: Page) {
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
}

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // Third-party requests are aborted on purpose (Calendly etc.).
    if (/net::ERR_|Failed to load resource/.test(text)) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

async function measureTargets(page: Page): Promise<Target[]> {
  return page.evaluate(() => {
    const selector = "a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button]";
    const isInlineTextLink = (el: Element) => {
      if (el.tagName !== "A") return false;
      if (getComputedStyle(el).display !== "inline") return false;
      const block = el.closest("p, li, dd, td, figcaption, address");
      if (!block) return false;
      const own = (el.textContent ?? "").trim().length;
      return (block.textContent ?? "").trim().length > own + 10;
    };
    const out: { tag: string; text: string; width: number; height: number }[] = [];
    for (const el of document.querySelectorAll(selector)) {
      if (el.closest("[aria-hidden=true], [inert]")) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") continue;
      const r = el.getBoundingClientRect();
      // Visually hidden until focused (e.g. the skip link).
      if (r.width <= 1 || r.height <= 1) continue;
      if (isInlineTextLink(el)) continue;
      out.push({
        tag: el.tagName.toLowerCase(),
        text: ((el as HTMLElement).innerText || el.getAttribute("aria-label") || el.getAttribute("name") || "")
          .trim()
          .slice(0, 50),
        width: Math.round(r.width),
        height: Math.round(r.height),
      });
    }
    return out;
  });
}

for (const route of ROUTES) {
  test.describe(route, () => {
    for (const width of WIDTHS) {
      test(`${width}px`, async ({ page }) => {
        await blockThirdParty(page);
        const errors = collectConsoleErrors(page);
        await page.setViewportSize({ width, height: width < 768 ? 800 : 900 });
        await page.goto(route, { waitUntil: "networkidle" });

        const overflow = await page.evaluate(() => {
          const viewport = window.innerWidth;
          const offenders = [...document.querySelectorAll("body *")]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.right > viewport + 1 && !el.closest("[aria-hidden=true]");
            })
            .slice(0, 3)
            .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
          return { scroll: document.documentElement.scrollWidth, viewport, offenders };
        });
        expect(
          overflow.scroll,
          `horizontal overflow; widest: ${overflow.offenders.join(" | ")}`,
        ).toBeLessThanOrEqual(overflow.viewport + 1);

        const h1s = page.locator("h1");
        await expect(h1s, "exactly one h1").toHaveCount(1);
        await expect(h1s.first()).toBeVisible();

        const images = await page.evaluate(() =>
          [...document.images].map((img) => ({
            src: img.currentSrc || img.src,
            hasAlt: img.hasAttribute("alt"),
            width: img.getBoundingClientRect().width,
          })),
        );
        for (const img of images) {
          expect(img.hasAlt, `alt on ${img.src}`).toBe(true);
          expect(img.width, `image fits viewport: ${img.src}`).toBeLessThanOrEqual(width + 1);
        }

        const targets = await measureTargets(page);
        expect(
          targets
            .filter((t) => t.width < 44 || t.height < 44)
            .map((t) => `${t.tag} "${t.text}" ${t.width}×${t.height}`),
          "targets under 44px",
        ).toEqual([]);

        if (width === 390) {
          const lines = await h1s.first().evaluate((h1) => {
            const lineHeight = parseFloat(getComputedStyle(h1).lineHeight);
            return Math.round(h1.getBoundingClientRect().height / lineHeight);
          });
          expect(lines, "h1 lines at 390px").toBeLessThanOrEqual(3);
        }

        if (width < 768) {
          const smallFields = await page.evaluate(() =>
            [...document.querySelectorAll("input:not([type=hidden]), select, textarea")]
              .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 16)
              .map((el) => el.getAttribute("name") ?? el.tagName),
          );
          expect(smallFields, "form fields under 16px").toEqual([]);
        }

        const footerContact = page.locator('footer nav[aria-label="Company"] a[href="/contact"]').first();
        await footerContact.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        const covered = await footerContact.evaluate((link) => {
          const r = link.getBoundingClientRect();
          const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          return hit !== null && !link.contains(hit);
        });
        expect(covered, "footer Contact link covered").toBe(false);

        if (SCREENSHOT_ROUTES.has(route) && SCREENSHOT_WIDTHS.has(width)) {
          // Scroll-triggered reveals only run in view; a full-page capture never scrolls.
          await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 120));
            }
            window.scrollTo(0, 0);
          });
          await page.waitForTimeout(800);
          const name = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
          await page.screenshot({ path: `audits/screenshots/${name}-${width}.png`, fullPage: true });
        }

        expect(errors, "console errors").toEqual([]);
      });
    }
  });
}

test.describe("short laptop screens: nothing starts under the fixed navbar", () => {
  for (const [width, height] of [
    [1280, 720],
    [1440, 768],
  ]) {
    for (const route of ROUTES) {
      test(`${route} ${width}×${height}`, async ({ page }) => {
        await blockThirdParty(page);
        await page.setViewportSize({ width, height });
        await page.goto(route, { waitUntil: "networkidle" });
        const hidden = await page.evaluate(() => {
          const navBottom = document.querySelector("nav[aria-label=Main]")!.getBoundingClientRect().bottom;
          return [...document.querySelectorAll("#main *")]
            .filter((el) => {
              const hasText = [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim());
              if (!hasText) return false;
              const r = el.getBoundingClientRect();
              return r.height > 0 && r.top < navBottom - 1 && r.bottom > 0;
            })
            .map((el) => `${el.tagName.toLowerCase()} "${el.textContent!.trim().slice(0, 30)}"`);
        });
        expect(hidden, "text behind the navbar").toEqual([]);
      });
    }
  }
});

test.describe("landscape phones", () => {
  for (const [width, height] of [
    [667, 375],
    [844, 390],
  ]) {
    for (const route of ["/", "/contact", "/services/web-apps"]) {
      test(`${route} ${width}×${height}`, async ({ page }) => {
        await blockThirdParty(page);
        await page.setViewportSize({ width, height });
        await page.goto(route, { waitUntil: "networkidle" });
        const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scroll, "horizontal overflow").toBeLessThanOrEqual(width + 1);

        const toggle = page.getByRole("button", { name: /open menu/i });
        await toggle.click();
        const menu = page.locator("#mobile-menu");
        await expect(menu).toBeVisible();
        const contact = menu.getByRole("link", { name: "Contact", exact: true });
        await contact.scrollIntoViewIfNeeded();
        await expect(contact).toBeInViewport();
      });
    }
  }
});

test.describe("navigation", () => {
  for (const width of [360, 768, 1024, 1440]) {
    test(`menu at ${width}px`, async ({ page }) => {
      await blockThirdParty(page);
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/", { waitUntil: "networkidle" });
      const toggle = page.getByRole("button", { name: /open menu/i });

      if (width < 1024) {
        await expect(toggle).toBeVisible();
        await toggle.click();
        const menu = page.locator("#mobile-menu");
        await expect(menu).toBeVisible();
        await expect(menu.getByRole("link", { name: "Contact", exact: true })).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();

        await toggle.click();
        await menu.getByRole("link", { name: "Contact", exact: true }).click();
        await expect(page).toHaveURL(/\/contact$/);
        await expect(menu).toBeHidden();
      } else {
        await expect(toggle).toBeHidden();
        await expect(page.getByRole("navigation").getByRole("link", { name: "Contact", exact: true }).first()).toBeVisible();
      }
    });
  }
});
