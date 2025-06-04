import { test, expect } from '@playwright/test';

const playwright = "https://playwright.dev/";

test.describe("General UI Elements", () => {
  test('MQA-1129 Displayed Playwright title',
    { tag: "@sanity" },
    async ({ page }) => {
      await page.goto(playwright);
      await expect(page.locator('[class="highlight_gXVj"]')).toContainText('Playwright');
    });

  test("MQA-1134 logo home button function ",
    { tag: "@smoke" },
    async ({ page }) => {
      const homeButton = page.locator('a[class="navbar__item navbar__link"][href="/docs/intro"]');

      await page.goto(playwright);
      await homeButton.click();
      await expect(page.locator('#__docusaurus').filter({ hasText: 'Playwright enables reliable end-to-end testing for modern web apps.' })).toBeVisible();
      // await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
      // await expect(page.locator('h1')).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');
    });
});

test.describe("Theme Switching", () => {
  test('MQA-1130 Theme mode',
    { tag: "@smoke" },
    async ({ page }) => {
      const themeModeButton = page.locator('button[aria-label="Switch between dark and light mode (currently dark mode)"]');
      await page.goto(playwright);
      await themeModeButton.click();
      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'dark');
      //:where([data-theme=dark])
    });

  test('MQA-1131 Theme mode 2',
    { tag: "@smoke" },
    async ({ page }) => {
      const themeModeButton = page.locator('button[aria-label="Switch between dark and light mode (currently dark mode)"]');

      await page.goto(playwright);
      await themeModeButton.click();
      const html = page.locator('html');
      await expect(html).toHaveCSS('--ifm-background-color', '#1b1b1d');
    });
});

test.describe("Search Functionality", () => {
  test('MQA-1132 search information',
    { tag: ["@smoke", "@regression"] },
    async ({ page }) => {
      const searchButton = page.locator('button[class="DocSearch DocSearch-Button"][aria-label="Search (Ctrl+K)"]');
      const searchInput = page.locator('input[class="DocSearch-Input"]');
      const searchResult = page.locator('[class="DocSearch-Hit DocSearch-Hit--Child"]>a[href="/docs/intro#installing-playwright"]');

      await page.goto(playwright);
      await searchButton.click();
      await searchInput.fill('install');
      await searchResult.click();
      await expect(page.locator('#__docusaurus').filter({ hasText: 'npm init playwright@latest' })).toBeVisible();
    });
});

test.describe("Language Selector Navigation", () => {
  test('MQA-1133 language navigation',
    { tag: "@smoke" },
    async ({ page }) => {
      const languagePrefix = page.locator('a[href="#"][role="button"]');
      const languageNodeJs = page.locator('a[href="/"][data-language-prefix="/"]');
      const languagePython = page.locator('a[href="/python/"][data-language-prefix="/python/"]');
      const languageJava = page.locator('a[href="/java/"][data-language-prefix="/java/"]');
      const languageDotNet = page.locator('a[href="/dotnet/"][data-language-prefix="/dotnet/"]');

      await page.goto(playwright);
      await languagePrefix.click();
      await expect(languageNodeJs).toContainText('Node.js');
      await expect(languagePython).toContainText('Python');
      await expect(languageJava).toContainText('Java');
      await expect(languageDotNet).toContainText('.NET');
    });
});






