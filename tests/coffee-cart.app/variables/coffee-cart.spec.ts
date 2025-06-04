import { test, expect, Page } from '@playwright/test';

const mainURL = "https://coffee-cart.app/";
const espresso = (page:Page)=>page.locator('[data-test="Espresso"]');

function getCheckoutLocators(page) {
  return {
    checkout: page.locator('[data-test="checkout"]'),
    fillName: page.locator('input[name="name"]'),
    fillEmail: page.locator('input[name="email"]'),
    checkbox: page.locator('input[type="checkbox"]'),
    submitButton: page.locator('#submit-payment'),
  };
}
 //or use many actions inside one function
async function submitOrder(
  page: Page,
  name: string,
  email: string,
  check?: boolean  //? optional parameter
) {
  await page.locator('input[name="name"]').fill(name);
  await page.locator('input[name="email"]').fill(email);
  if (check) {
    await page.locator('input[type="checkbox"]').check();
  }
  await page.locator('#submit-payment').click();
}


test.describe("Checkout Flow", () => {

  // test('MQA-1134 complete checkout',
  //   { tag: "@smoke" },
  //   async ({ page }) => {
      
  //     const { checkout, fillName, fillEmail, checkbox, submitButton } = getCheckoutLocators(page);

  //     await page.goto(mainURL);
  //     await espresso.click();
  //     await checkout.click();
  //     await fillName.fill('Serhii');
  //     await fillEmail.fill('test@gmail.com');
  //     await checkbox.check();
  //     await submitButton.click();
  //     await expect(page.locator('#app div').filter({ hasText: 'Thanks for your purchase. Please check your email for payment.' })).toBeVisible();
  //   });

  test('MQA-1135 complete checkout 2',
    { tag: "@smoke" },
    async ({ page }) => {
      const espresso = page.locator('[data-test="Espresso"]');
      const { checkout, fillName, fillEmail, checkbox, submitButton } = getCheckoutLocators(page);

      await page.goto(mainURL);
      await espresso.click();
      await checkout.click();
      await submitOrder(page,'Serhii', 'test@gmail.com')
      await expect(page.locator('#app div').filter({ hasText: 'Thanks for your purchase. Please check your email for payment.' })).toBeVisible();
    });




  test('MQA-1136 checkout default values',
    { tag: "@sanity" },
    async ({ page }) => {
      const { checkout, fillName, fillEmail, checkbox } = getCheckoutLocators(page);

      await page.goto(mainURL);
      await checkout.click();
      await expect(fillName).toBeEmpty();
      await expect(fillEmail).toBeEmpty();
      await expect(checkbox).not.toBeChecked();
    });
});

test.describe("Product Discounts", () => {
  test('MQA-1137 discount Mocha',
    { tag: "@smoke" },
    async ({ page }) => {
      const espresso = page.locator('[data-test="Espresso"]');
      const espressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
      const mocha = page.locator('[data-test="Mocha"]');
      const yesOfCourseButton = page.getByRole('button', { name: 'Yes, of course!' });
      const cartPage = page.getByRole('link', { name: 'Cart page' });

      await page.goto(mainURL);
      await espresso.click();
      await espressoMacchiato.click();
      await mocha.click();
      await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
      await yesOfCourseButton.click();
      await cartPage.click();
      await expect(page.locator('#app')).toContainText('(Discounted) Mocha$4.00 x 1+-$4.00x');
    });
});

test.describe("Cart Behavior", () => {
  test('MQA-1138 remove item from basket',
    { tag: "@sanity" },
    async ({ page }) => {
      const espresso = page.locator('[data-test="Espresso"]');
      const cart = page.locator('[href="/cart"][aria-label="Cart page"]');
      const cartPage = page.locator('[href="/cart"][aria-label="Cart page"]');
      const deleteButton = page.locator('button[class="delete"][type="button"]');

      await page.goto(mainURL);
      await espresso.click();
      await expect(cart).toContainText('cart (1)');
      await cartPage.click();
      await deleteButton.click();
      await expect(page.locator('p[data-v-8965af83]')).toContainText('No coffee, go add some.');
    });
});

test.describe("Navigation & External Links", () => {
  test('MQA-1139 redirect to Github page',
    { tag: "@sanity" },
    async ({ page }) => {
      const gitHub = page.locator('[href="/github"][aria-label="GitHub page"]');

      await page.goto(mainURL);
      await gitHub.click();
      await expect(page.locator('#app div').filter({ hasText: 'Star our repository jecfish/' })).toBeVisible();
    });
});
