import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm start', // Adjust this command to match your app's start command
    port: 3000,
    timeout: 120 * 1000, // Increase timeout if necessary
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ['html', { outputFolder: 'test-results-output/playwright-report', open: 'always' }], // Save HTML report
    ['json', { outputFile: 'test-results-output/test-results.json' }], // Save JSON report
    ['junit', { outputFile: 'test-results-output/test-results.xml' }], // Save JUnit XML report
  ],
});
