import { test, expect, Page } from '@playwright/test';

const baseURL = "https://coffee-cart.app/";

test('MQA-1135 complete checkout',
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('input[name="name"]').fill('Serhii');
    await page.locator('input[name="email"]').fill('test@gmail.com');
    await page.locator('input[type="checkbox"]').check();
    await page.locator('#submit-payment').click();
    await expect(page.locator('#app div').filter({ hasText: 'Thanks for your purchase. Please check your email for payment.' })).toBeVisible();
  });

test('MQA-1136 checkout default values',
  { tag: "@sanity" },
  async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('input[name="name"]')).toBeEmpty();
    await expect(page.locator('input[name="email"]')).toBeEmpty();
    await expect(page.locator('input[type="checkbox"]')).not.toBeChecked();
  });

test('MQA-1137 discount Mocha',
  { tag: "@smoke" },
  async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Mocha"]').click();
    await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
    await page.getByRole('button', { name: 'Yes, of course!' }).click();
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.locator('#app')).toContainText('(Discounted) Mocha$4.00 x 1+-$4.00x');
  });


test('MQA-1138 remove item from basket',
  { tag: "@sanity" },
  async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('[href="/cart"][aria-label="Cart page"]')).toContainText('cart (1)');
    await page.locator('[href="/cart"][aria-label="Cart page"]').click();
    await page.locator('button[class="delete"][type="button"]').click();
    await expect(page.locator('p[data-v-8965af83]')).toContainText('No coffee, go add some.');
  });

test('MQA-1139 redirect to Github page',
  { tag: "@sanity" },
  async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.locator('[href="/github"][aria-label="GitHub page"]').click();
    await expect(page.locator('#app div').filter({ hasText: 'Star our repository jecfish/' })).toBeVisible();
  });

// Проклікати 10 разів
async function clickOnEspresso(page: Page, orderCount = 1) {
  for (let i = 1; i <= orderCount; i++) {
    await page.locator('[data-test="Espresso"]').click();
  }

}

test('LS-089 click 10 times on the object', async ({ page }) => {
  await page.goto(baseURL);
  await clickOnEspresso(page, 10);
});


test('LS-090 order every coffee drink', async ({ page }) => {
  await page.goto(baseURL);
  for (let i = 0; i < 8; i++) {
    await page.locator(".cup-body:not(.disabled-hover)").nth(i).click(); //we use class 'disabled-hover' to exclude discount
  }

});

test("LS-091 close pop-up while test is running", async ({ page }) => {
  page.on("popup", async (popupPage) => {  //'page.on' - listener react to event on the page
    await popupPage.locator(".close").click();
  });
});




