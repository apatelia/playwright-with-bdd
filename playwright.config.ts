import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    importTestFrom: './pages/fixtures.ts',
    paths: ['feature/*.feature'],
    require: ['step-definitions/**/*.ts'],
});

export default defineConfig({
    // Test directory value is automatically handled by playwright-bdd.
    testDir,

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: 'html',

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        // baseURL: 'http://127.0.0.1:3000',

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry',

        // Capture screenshot when a test fails.
        screenshot: 'only-on-failure'
    },

    // Configure projects for major browsers.
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },

        /* Test against mobile viewports. */
        // {
        //     name: 'Mobile Chrome',
        //     use: { ...devices['Pixel 5'] },
        // },
        // {
        //     name: 'Mobile Safari',
        //     use: { ...devices['iPhone 14 Pro Max'] },
        // },
    ],
});
