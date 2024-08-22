import { Locator, Page } from '@playwright/test';

export class Footer {
    readonly page: Page;
    readonly twitterLink: Locator;
    readonly facebookLink: Locator;
    readonly linkedInLink: Locator;
    readonly copyrightText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.twitterLink = page.getByRole('link', { name: 'Twitter' });
        this.facebookLink = page.getByRole('link', { name: 'Facebook' });
        this.linkedInLink = page.getByRole('link', { name: 'LinkedIn' });
        this.copyrightText = page.locator('div.footer_copy');
    }

    async clickTwitterLink() : Promise<void> {
        await this.twitterLink.click();
    }

    async clickFacebookLink() : Promise<void> {
        await this.facebookLink.click();
    }

    async clickLinkedInLink() : Promise<void> {
        await this.linkedInLink.click();
    }

    async getCopyrightTextContent() : Promise<string> {
        return `${await this.copyrightText.textContent()}`;
    }
}
