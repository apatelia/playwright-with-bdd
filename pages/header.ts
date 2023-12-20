import { Locator, Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly appLogo: Locator;
    readonly hamburgerMenuButton: Locator;
    readonly logoutMenuEntry: Locator;
    readonly hamburgerMenuCloseButton: Locator;
    readonly cartLink: Locator;
    readonly cartItemCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appLogo = page.locator('div.app_logo');
        this.hamburgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutMenuEntry = page.getByRole('link', { name: 'Logout' });
        this.hamburgerMenuCloseButton = page.getByRole('button', { name: 'Close Menu' });
        this.cartLink = page.locator('a.shopping_cart_link');
        this.cartItemCount = page.locator('span.shopping_cart_badge');
    }

    async doLogout(): Promise<void> {
        await this.hamburgerMenuButton.click();
        await this.logoutMenuEntry.click();
    }

    async closeMenu(): Promise<void> {
        await this.hamburgerMenuCloseButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async getCartItemCount(): Promise<number> {
        const itemCount = await this.cartItemCount.textContent();

        return +itemCount!;
    }
}
