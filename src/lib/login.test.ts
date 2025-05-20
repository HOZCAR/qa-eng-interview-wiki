import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const wikipediaUsername = process.env.WIKIPEDIA_USERNAME;
const wikipediaPassword = process.env.WIKIPEDIA_PASSWORD;

const authFile = 'src/auth/login.json';

// Inline Page Object for the Wikipedia Login Page
const WikipediaLoginPage = {
    async goto(page) {
        await page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogin');
    },
    async fillUsername(page, username: string) {
        await page.fill('input[name="wpName"]', username);
    },
    async fillPassword(page, password: string) {
        await page.fill('input[name="wpPassword"]', password);
    },
    async submit(page) {
        await page.click('button#wpLoginAttempt');
    },
    async isLoggedIn(page) {
        await page.waitForURL('https://en.wikipedia.org/wiki/Main_Page', { timeout: 10000 });
    }
};

/**
 * Manually create a Wikipedia account and then finish this test
 * so that it signs into Wikipedia and captures the logged-in
 * session to src/auth/login.json, so that the tests in all.test.ts
 * run as a signed in user.
 */
test('Sign in to Wikipedia', async ({ page }) => {
    if (!wikipediaUsername || !wikipediaPassword) {
        throw new Error(`Need a username and password to sign in!`);
    }

    await WikipediaLoginPage.goto(page);
    await WikipediaLoginPage.fillUsername(page, wikipediaUsername!);
    await WikipediaLoginPage.fillPassword(page, wikipediaPassword!);
    await WikipediaLoginPage.submit(page);
    await WikipediaLoginPage.isLoggedIn(page);

    await page.context().storageState({ path: authFile });
});
