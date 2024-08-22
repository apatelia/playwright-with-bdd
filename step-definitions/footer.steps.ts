import { expect } from '@playwright/test';
import { Then, When } from '../pages/fixtures';

Then('{string} link in footer should be visible', async ({ footer }, link: string) => {
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

When('the user clicks {string} link from footer, it should open correct {string} in a new tab', async ({ page, footer }, socialMedia: string, url: string) => {
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

    const newPage = await newPagePromise;
    await newPage.waitForLoadState();

    const regexPattern = `.*${url}.*`;
    const regex = new RegExp(regexPattern);
    await expect(newPage).toHaveURL(regex);
});

Then('copyright text in footer should be visible', async ({ footer }) => {
    await expect(footer.copyrightText).toBeVisible();
});

Then('the copyright text contents should be correct', async ({ footer }) => {
    const textContent = await footer.getCopyrightTextContent();
    expect(textContent).toEqual('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
});
