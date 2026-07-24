import {defineConfig, devices} from '@playwright/test';

const port = 3101;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  reporter: 'line',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run start -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'mobile-chromium',
      use: {...devices['Pixel 5']},
    },
  ],
});
