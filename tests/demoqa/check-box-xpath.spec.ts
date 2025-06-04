import { test, expect } from '@playwright/test';

test.describe("checkbox interactions", () => { //test suite

    const baseURL = "https://demoqa.com/checkbox";

    function getCheckBoxLocators(page) {
        return {
            Home: page.locator("//*[text()='Home']"),
            Desktop: page.locator("//*[text()='Desktop']"),
            Notes: page.locator("//*[text()='Notes']"),
            Commands: page.locator("//*[text()='Commands']"),
            //checkbox: page.locator("//label[@for='tree-node-home']//span[@class='rct-checkbox']"),

        };
    }
    test('MQA-1742 checkbox',
        { tag: "@smoke" },
        async ({ page }) => {
            const list = page.locator("//button[@aria-label='Toggle']");
            const { Home, Desktop, } = getCheckBoxLocators(page);

            await page.goto(baseURL);
            await list.click();
            await Desktop.click();
            await expect(page.locator("//label[@for='tree-node-desktop']//span[@class='rct-checkbox']")).toBeChecked();
        });
});