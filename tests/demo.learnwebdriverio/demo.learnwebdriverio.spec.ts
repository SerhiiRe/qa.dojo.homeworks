import { test, expect } from '@playwright/test';

test.describe("authentication and profile management", () => { //test suite

  const webdriver = "https://demo.learnwebdriverio.com/";

  test('MQA-1140 sign up user',
    { tag: "@smoke" },
    async ({ page }) => {
      await page.goto(webdriver);
      await page.locator('a[href="/register"]').click();
      await page.locator('input[placeholder="Username"]').fill('Serhii');
      await page.locator('input[placeholder="Email"]').fill('test@gmail.com');
      await page.locator('input[placeholder="Password"]').fill('123456');
      await page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]').click();
      //await expect(page.getByRole('link', { name: 'serhii' })).toBeVisible();
    });

  test('MQA-1141 sign up using existing user data',
    { tag: "@sanity" },
    async ({ page }) => {
      await page.goto('https://demo.learnwebdriverio.com/');
      await page.locator('a[href="/register"]').click();
      await page.locator('input[placeholder="Username"]').fill('Serhii');
      await page.locator('input[placeholder="Email"]').fill('test@gmail.com');
      await page.locator('input[placeholder="Password"]').fill('123456');
      await page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]').click();
      await expect(page.locator('#app')).toContainText('username is already taken.');
      await expect(page.locator('#app')).toContainText('email is already taken.');
    });

  test('MQA-1142 sign in user',
    { tag: "@smoke" },
    async ({ page }) => {
      await page.goto('https://demo.learnwebdriverio.com/');
      await page.locator('a[href="/login"]').click();
      await page.locator('input[placeholder="Email"]').fill('test@gmail.com');
      await page.locator('input[placeholder="Password"]').fill('123456');
      await page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]').click();
      await expect(page.locator('#app')).toContainText('serhii');
    });

  test('MQA-1143 update user`s data',
    { tag: "@smoke" },
    async ({ page }) => {
      await page.goto('https://demo.learnwebdriverio.com/');
      await page.locator('a[href="/login"]').click();
      await page.locator('input[placeholder="Email"]').fill('test@gmail.com');
      await page.locator('input[placeholder="Password"]').fill('123456');
      await page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]').click();
      await page.locator('a[href="/@serhii/"]').click();
      await page.locator('a[href="/settings"][data-qa-id="follow-toggle"]').click();
      const inputField = page.locator('input[placeholder="Your username"]');
      await expect(inputField).toHaveValue('serhii');
      await inputField.clear();
      await expect(inputField).toHaveValue('');
    });
});