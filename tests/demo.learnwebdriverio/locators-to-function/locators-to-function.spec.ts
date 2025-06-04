import { test, expect, Page } from '@playwright/test';

test.describe("authentication and profile management", () => {
    const mainURL = "https://demo.learnwebdriverio.com/";

    function generateUserData() {
        const randomID = Math.floor(Math.random() * 100000);
        return {
            userName: `user${randomID}`,
            email: `user${randomID}@test.com`,
            password: `Test${randomID}Pass!`
        };
    }

    /*or use arrow function
    const goToHome = async (page: Page) => {
        await page.goto("https://demo.learnwebdriverio.com/");

    };*/

    function getLocators(page) {
        return {
            registerLink: page.locator('a[href="/register"]'),
            loginLink: page.locator('a[href="/login"]'),
            usernameInput: page.locator('input[placeholder="Username"]'),
            emailInput: page.locator('input[placeholder="Email"]'),
            passwordInput: page.locator('input[placeholder="Password"]'),
            submitButton: page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]'),
            appRoot: page.locator('#app'),
            profileLink: page.locator('a[href="/@serhii/"]'),
            settingsLink: page.locator('a[href="/settings"][data-qa-id="follow-toggle"]'),
            usernameSettingsInput: page.locator('input[placeholder="Your username"]'),
        };
    }
    async function signIn(
        page: Page,
        email: string,
        password: string,
    ) {
        await page.locator('input[placeholder="Email"]').fill(email);
        await page.locator('input[placeholder="Password"]').fill(password);
        await page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]').click();
    }

    async function signUP(
        page: Page,
        userName: string,
        email: string,
        password: string,
    ) {
        await page.locator('input[placeholder="Username"]').fill(userName);
        await page.locator('input[placeholder="Email"]').fill(email);
        await page.locator('input[placeholder="Password"]').fill(password);
        await page.locator('button[class*="btn btn-lg btn-primary pull-xs-right"]').click();
    }





    test('MQA-1140 sign up user',
        { tag: "@smoke" },
        async ({ page }) => {
            const { userName, email, password } = generateUserData();

            await page.goto(mainURL);
            await page.locator('a[href="/register"]').click();
            await signUP(page, userName, email, password);
            await expect(page.locator('#app')).toContainText(userName);

        });

    test('MQA-1141 sign up using existing user data',
        { tag: "@sanity" },
        async ({ page }) => {
            await page.goto(mainURL);
            await page.locator('a[href="/register"]').click();

            await signUP(page, "Serhii", "test@gmail.com", "123456");
            await expect(page.locator('#app')).toContainText('username is already taken.');
            await expect(page.locator('#app')).toContainText('email is already taken.');
        });

    test('MQA-1142 sign in user',
        { tag: "@smoke" },
        async ({ page }) => {
            await page.goto(mainURL);
            await page.locator('a[href="/login"]').click();
            
            await signIn(page, "test@gmail.com", "123456");
            await expect(page.locator('#app')).toContainText('serhii');
        });

    test('MQA-1143 update user`s data',
        { tag: "@smoke" },
        async ({ page }) => {
            const locators = getLocators(page);
            await page.goto("https://demo.learnwebdriverio.com/login");
            await signIn(page,'test@gmail.com','123456')
            
           
            await locators.profileLink.click();
            await locators.settingsLink.click();
            await expect(locators.usernameSettingsInput).toHaveValue('serhii');
            await locators.usernameSettingsInput.clear();
            await expect(locators.usernameSettingsInput).toHaveValue('');
        });
});





