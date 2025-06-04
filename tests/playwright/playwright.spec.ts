import { test, expect } from '@playwright/test';

test('MQA-1129 Displayed Playwright title',
  { tag: "@sanity" },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.locator('[class="highlight_gXVj"]')).toContainText('Playwright');
  });

test('MQA-1130 Theme mode',
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('button[aria-label="Switch between dark and light mode (currently dark mode)"]').click();
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
    //:where([data-theme=dark])
  });

test('MQA-1131 Theme mode 2',
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('button[aria-label="Switch between dark and light mode (currently dark mode)"]').click();
    const html = page.locator('html');
    await expect(html).toHaveCSS('--ifm-background-color', '#1b1b1d');
  });


test('MQA-1132 search information',
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('button[class="DocSearch DocSearch-Button"][aria-label="Search (Ctrl+K)"]').click();
    await page.locator('input[class="DocSearch-Input"]').fill('install');
    await page.locator('[class="DocSearch-Hit DocSearch-Hit--Child"]>a[href="/docs/intro#installing-playwright"]').click();
    await expect(page.locator('#__docusaurus').filter({ hasText: 'npm init playwright@latest' })).toBeVisible();
  });


test('MQA-1133 language navigation',
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('a[href="#"][role="button"]').click();
    await expect(page.locator('a[href="/"][data-language-prefix="/"]')).toContainText('Node.js');
    await expect(page.locator('a[href="/python/"][data-language-prefix="/python/"]')).toContainText('Python');
    await expect(page.locator('a[href="/java/"][data-language-prefix="/java/"]')).toContainText('Java');
    await expect(page.locator('a[href="/dotnet/"][data-language-prefix="/dotnet/"]')).toContainText('.NET');
  });

test("MQA-1134 logo home button function ",
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.locator('a[class="navbar__item navbar__link"][href="/docs/intro"]').click();
    await expect(page.locator('#__docusaurus').filter({ hasText: 'Playwright enables reliable end-to-end testing for modern web apps.' })).toBeVisible();

  });


    // await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
    // await expect(page.locator('h1')).toContainText('Playwright enables reliable end-to-end testing for modern web apps.');





