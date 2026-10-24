import { expect, test, type Page } from "@playwright/test";

/**
 * Behaviour checks for the navbar, mobile menu, reduced motion and the
 * no-JavaScript fallback. Complements responsive.spec.ts (layout per width).
 */

async function blockThirdParty(page: Page) {
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
}

const noOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

test.describe("desktop navbar", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("links, active route and services dropdown", async ({ page }) => {
    await blockThirdParty(page);
    await page.goto("/about", { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Main" });

    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");

    const toggle = nav.getByRole("button", { name: "Services" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.focus();
    await page.keyboard.press("ArrowDown");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const dropdown = page.locator("#services-dropdown");
    await expect(dropdown.getByText("Build", { exact: true })).toBeVisible();
    await expect(dropdown.getByText("Grow & Support", { exact: true })).toBeVisible();
    await expect(dropdown.locator('a[href^="/services/"]')).toHaveCount(9);

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(dropdown).toHaveCount(0);
    await expect(toggle, "focus returns to the toggle without reopening").toBeFocused();
  });

  test("nav hides on scroll down and returns on scroll up", async ({ page }) => {
    await blockThirdParty(page);
    await page.goto("/", { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Main" });
    const top = () => nav.evaluate((el) => Math.round(el.getBoundingClientRect().bottom));

    await page.mouse.move(640, 400);
    for (let i = 0; i < 3; i++) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(400);
    }
    await expect.poll(top).toBeLessThanOrEqual(0);
    await page.mouse.wheel(0, -300);
    await expect.poll(top).toBeGreaterThan(0);
  });
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test("opens, traps focus, locks scroll, closes on Escape and on navigation", async ({ page }) => {
    await blockThirdParty(page);
    await page.goto("/", { waitUntil: "networkidle" });

    const open = page.getByRole("button", { name: "Open menu" });
    await open.click();
    const menu = page.getByRole("dialog", { name: "Site menu" });
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(await noOverflow(page), "no horizontal scroll with menu open").toBe(true);

    const locked = await page.evaluate(() => {
      const { overflow } = getComputedStyle(document.body);
      return overflow === "hidden" || getComputedStyle(document.documentElement).overflow === "hidden";
    });
    expect(locked, "body scroll is locked").toBe(true);

    for (let i = 0; i < 25; i++) await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => {
        const active = document.activeElement;
        const dialog = document.querySelector("#mobile-menu");
        const header = document.querySelector("header");
        return !!active && (!!dialog?.contains(active) || !!header?.contains(active));
      }),
      "focus stays inside the menu",
    ).toBe(true);

    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);

    await open.click();
    await page.getByRole("dialog", { name: "Site menu" }).getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveCount(0);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1280, height: 800 } });

  test("headline, content and marquee are static and visible", async ({ page }) => {
    await blockThirdParty(page);
    await page.goto("/", { waitUntil: "networkidle" });

    const animated = await page.evaluate(() => {
      const words = [...document.querySelectorAll(".split-word-inner")];
      return {
        words: words.length,
        running: words.filter((el) => getComputedStyle(el).animationName !== "none").length,
        hidden: [...document.querySelectorAll("main h1, main h2")].filter((h) => Number(getComputedStyle(h).opacity) < 1).length,
        marquee: getComputedStyle(document.querySelector(".marquee-track")!).animationName,
        pause: [...document.querySelectorAll("button")].some((b) => /Pause animation/.test(b.textContent ?? "") && b.offsetParent !== null),
      };
    });
    expect(animated.words).toBeGreaterThan(0);
    expect(animated.running, "headline words are not animated").toBe(0);
    expect(animated.hidden, "no heading is faded out").toBe(0);
    expect(animated.marquee).toBe("none");
    expect(animated.pause, "no pause control needed when nothing moves").toBe(false);
  });
});

test.describe("JavaScript disabled", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 800 } });

  for (const path of ["/", "/services", "/services/seo", "/services/ai-services", "/about", "/contact"]) {
    test(`${path} renders its content`, async ({ page }) => {
      await blockThirdParty(page);
      await page.goto(path, { waitUntil: "load" });

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      expect(await noOverflow(page), "no horizontal scroll").toBe(true);

      const hiddenSections = await page.evaluate(() =>
        [...document.querySelectorAll("main section")].filter((s) => {
          const r = s.getBoundingClientRect();
          return r.height > 40 && Number(getComputedStyle(s).opacity) === 0;
        }).length,
      );
      expect(hiddenSections, "no section is stuck invisible").toBe(0);
      await expect(page.locator("footer a[href='/contact#book']").first()).toBeVisible();
    });
  }

  test("home keeps FAQ answers and the technology list in the HTML", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).toContain("M-Pesa");
    await expect(page.locator("#home-faq-heading")).toBeVisible();
    expect(await page.locator("section[aria-labelledby=home-faq-heading] button").count()).toBeGreaterThan(5);
  });
});
