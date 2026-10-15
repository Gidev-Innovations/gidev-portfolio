import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against the production build (pre-rendered HTML), served the way
 * Cloudflare serves it. `npm run test:responsive` builds first.
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  workers: 4,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/responsive.json" }]],
  use: {
    baseURL: "http://localhost:4173",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "node scripts/serve-build.mjs 4173",
    url: "http://localhost:4173",
    reuseExistingServer: true,
  },
});
