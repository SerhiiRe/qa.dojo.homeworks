import { test, expect } from '@playwright/test';

test.describe("Text Box form input and result validation", () => { //test suite

    const baseURL = "https://demoqa.com/text-box";

    function getTextBoxLocators(page) {
        return {
            fullName: page.locator('//input[@id="userName"]'),
            email: page.locator('//input[@placeholder="name@example.com"]'),
            currentAddress: page.locator('//textarea[@placeholder="Current Address"]'),
            permanentAddress: page.locator('//textarea[@id="permanentAddress"]'),
            submitButton: page.locator('//*[@id="submit"]'),
        };
    }

    test('MQA-1300 interractions with text box',
        { tag: "@smoke" },
        async ({ page }) => {
            const { fullName, email, currentAddress, permanentAddress, submitButton } = getTextBoxLocators(page);

            await page.goto(baseURL);
            await fullName.fill('serhii');
            await expect(fullName).toHaveValue('serhii');
            await email.fill('qa@ukr.net');
            await expect(email).toHaveValue('qa@ukr.net');
            await currentAddress.fill('3000 BRONX PARK');
            await expect(currentAddress).toHaveValue('3000 BRONX PARK');
            await permanentAddress.fill('99-122 KALALOA ST');
            await expect(permanentAddress).toHaveValue('99-122 KALALOA ST');
            await submitButton.click();

            await expect(page.locator("//*[@id='output']//*[@id='name']")).toHaveText("Name:serhii");
            await expect(page.locator("//*[@id='email']")).toHaveText("Email:qa@ukr.net");
            await expect(page.locator("//*[@id='output']//*[@id='currentAddress']")).toHaveText('Current Address :3000 BRONX PARK');
            await expect(page.locator("//*[@id='output']//*[@id='permanentAddress']")).toHaveText("Permananet Address :99-122 KALALOA ST");
        });  
});