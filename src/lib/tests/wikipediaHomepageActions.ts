import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP: Click the link to view the total number of articles in English */
    const totalArticlesLink = page.getByRole('listitem').filter({ hasText: 'articles in' }).getByRole('link').first();
    const totalArticlesText = await totalArticlesLink.textContent();
    const match = totalArticlesText?.replace(/,/g, '').match(/(\d+)/);
    const totalArticles = match ? parseInt(match[1], 10) : 0;
    await expect.soft(totalArticles).toBeLessThan(7000000);


    /** STEP: Get the default font */
    const contentSelector = '#mp-topbanner';
    const getFontSize = async () =>
        await page.$eval(contentSelector, el => window.getComputedStyle(el).fontSize);
    const defaultFontSize = await getFontSize();

    /** STEP: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
    await smallTextSizeOption.click();
    const smallFontSize = await getFontSize();
    await expect.soft(smallFontSize).not.toBe(defaultFontSize);

    /** STEP: Click the 'Large' text size option to change the display size */
    const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
    await largeTextSizeOption.click();
    const largeFontSize = await getFontSize();
    await expect.soft(largeFontSize).not.toBe(smallFontSize);
    await expect.soft(largeFontSize).not.toBe(defaultFontSize);

    /** STEP: Click the 'Standard' text size option in the appearance settings */
    const standardTextSizeButton = page.locator('#skin-client-pref-vector-feature-custom-font-size-value-1');
    await standardTextSizeButton.click();
    const resetFontSize = await getFontSize();
    await expect(resetFontSize).toBe(defaultFontSize);
}
