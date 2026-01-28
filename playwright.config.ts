import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: process.env.CI 
    ? [['blob'], ['html', { open: 'never' }]]
    : 'html',
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on', // Always capture traces
    screenshot: 'only-on-failure',
    video: 'on', // Always capture videos
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
