import { expect, Page } from '@playwright/test';
import { Given, Then, When } from '../pages/fixtures';

let newPage: Page;

Given('that {string} link in footer is visible', async ({ footer }, link: string) => {
    switch (link) {
        case 'Twitter/X':
            await expect(footer.twitterLink).toBeEnabled();
            break;
        case 'Facebook':
            await expect(footer.facebookLink).toBeEnabled();
            break;
        case 'LinkedIn':
            await expect(footer.linkedInLink).toBeEnabled();
            break;
        default:
            break;
    }
});

When('the user clicks {string} link from footer', async ({ page, footer }, socialMedia: string) => {
    const newPagePromise = page.context().waitForEvent('page');

    switch (socialMedia) {
        case 'Twitter/X':
            await footer.clickTwitterLink();
            break;
        case 'Facebook':
            await footer.clickFacebookLink();
            break;
        case 'LinkedIn':
            await footer.clickLinkedInLink();
            break;
        default:
            break;
    }

    newPage = await newPagePromise;
    await newPage.waitForLoadState();
});

Then('it should open correct {string} in a new tab', async ({ }, url: string) => {
    const regexPattern = `.*${url}.*`;
    const regex = new RegExp(regexPattern);
    await expect(newPage).toHaveURL(regex);
});

Then('copyright text in footer should be visible', async ({ footer }) => {
    await expect(footer.copyrightText).toBeVisible();
});

Then('the copyright text contents should be correct', async ({ footer }) => {
    const textContent = await footer.getCopyrightTextContent();

    const currentYear = new Date().getFullYear();
    expect(textContent).toEqual(`© ${currentYear} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`);
});
