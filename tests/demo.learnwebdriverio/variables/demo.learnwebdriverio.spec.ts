import { test, expect } from '@playwright/test';
import { sign } from 'crypto';

test.describe("authentication and profile management", () => { //test suite

  const webdriver = "https://demo.learnwebdriverio.com/";

  function getSignupLocators(page) {
    return {
      register: page.locator('a[href="/register"]'),
      fillUsername: page.locator('input[placeholder="Username"]'),
      fillEmail: page.locator('input[placeholder="Email"]'),
      fillPassword: page.locator('input[placeholder="Password"]'),
      signUpButton: page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]'),
    };
  }

  function getSignInLocators(page) {
    return {
      logIn: page.locator('a[href="/login"]'),
      fillEmail: page.locator('input[placeholder="Email"]'),
      fillPassword: page.locator('input[placeholder="Password"]'),
      signInButton: page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]'),
    };
  }


  test('MQA-1140 sign up user',
    { tag: "@smoke" },
    async ({ page }) => {
      const { register, fillUsername, fillEmail, fillPassword, signUpButton } = getSignupLocators(page);

      await page.goto(webdriver);
      await register.click();
      await fillUsername.fill('Serhii');
      await fillEmail.fill('test@gmail.com');
      await fillPassword.fill('123456');
      await signUpButton.click();
      //await expect(page.getByRole('link', { name: 'serhii' })).toBeVisible();
    });

  test('MQA-1141 sign up using existing user data',
    { tag: "@sanity" },
    async ({ page }) => {
      const { register, fillUsername, fillEmail, fillPassword, signUpButton } = getSignupLocators(page);

      await page.goto(webdriver);
      await register.click();
      await fillUsername.fill('Serhii');
      await fillEmail.fill('test@gmail.com');
      await fillPassword.fill('123456');
      await signUpButton.click();
      await expect(page.locator('#app')).toContainText('username is already taken.');
      await expect(page.locator('#app')).toContainText('email is already taken.');
    });

  test('MQA-1142 sign in user',
    { tag: "@smoke" },
    async ({ page }) => {
      const { logIn, fillEmail, fillPassword, signInButton } = getSignInLocators(page);

      await page.goto(webdriver);
      await logIn.click();
      await fillEmail.fill('test@gmail.com');
      await fillPassword('input[placeholder="Password"]').fill('123456');
      await signInButton.click();
      await expect(page.locator('#app')).toContainText('serhii');
    });

  test('MQA-1143 update user`s data',
    { tag: "@smoke" },
    async ({ page }) => {
      const { logIn, fillEmail, fillPassword, signInButton } = getSignInLocators(page);
      const userNameLocator = page.locator('a[href="/@serhii/"]');
      const editProfileSettingsButton = page.locator('a[href="/settings"][data-qa-id="follow-toggle"]');

      await page.goto(webdriver);
      await logIn.click();
      await fillEmail.fill('test@gmail.com');
      await fillPassword.fill('123456');
      await signInButton.click();
      await userNameLocator.click();
      await editProfileSettingsButton.click();

      const inputField = page.locator('input[placeholder="Your username"]');
      await expect(inputField).toHaveValue('serhii');
      await inputField.clear();
      await expect(inputField).toHaveValue('');
    });
});