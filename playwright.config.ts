import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 10000 },
  use: { baseURL: "http://localhost:3102", reducedMotion: "reduce", screenshot: "only-on-failure", trace: "retain-on-failure", ...(process.platform === "darwin" ? { channel: "chrome" } : {}) },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: "bun run dev -- --webpack --port 3102",
    url: "http://localhost:3102",
    reuseExistingServer: false,
    timeout: 120000,
    env: { DATABASE_URL: "", DATABASE_URL_UNPOOLED: "", ADMIN_ACCESS_KEY: "", AUTH_SECRET: "", CHECKOUT_ENABLED: "false" },
  },
});
