import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia
 * 2. Go to the "Artificial intelligence" page
 * 3. Click "View history"
 * 4. Assert that the latest edit was made by the user "Alenoach"
 *
 * Instructions:
 * - Run the test and ensure it performs all steps described above
 * - Add assertions to the test to ensure it validates the expected
 *   behavior:
 *   - If the latest edit was not made by "Alenoach" update the steps above accordingly
 *   - Write your assertion to provide clear diagnostic feedback if it fails
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    
    /** STEP: Navigate to URL */
    await page.goto('https://www.wikipedia.org/', { waitUntil: 'domcontentloaded' })

    /** STEP: Enter text 'artificial' into the search input field */
    const searchInputField = page.getByRole('searchbox', {
        name: 'Search Wikipedia',
    });

    
    await searchInputField.fill('artificial');
    
    /** STEP: Click the 'Artificial intelligence' link in the search suggestions */
    const artificialIntelligenceLink = page.getByRole('link', {
        name: 'Artificial intelligence Intelligence of machines',
    });
    await artificialIntelligenceLink.click();
    await page.waitForLoadState('domcontentloaded');

    /** STEP: Click "View history" */
    const viewHistoryTab = page.getByRole('link', { name: 'View history' });
    await viewHistoryTab.click();
    await page.waitForLoadState('domcontentloaded');

    /** STEP: Assert that the latest edit was made by the user "Alenoach" */

    const latestEditor = page.locator('.mw-contributions-list .mw-userlink').first();
    const latestEditorName = (await latestEditor.textContent())?.trim();

    const expectedUsername = 'Alenoach'; // Updated since it was changed from "Worstbull"
    expect(latestEditorName).toBe(expectedUsername);
}
