import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartHeading: Locator;
    readonly allProductsInCart: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartHeading = page.getByText('Your Cart');
        this.allProductsInCart = page.locator('div.cart_item');
        this.continueShoppingButton = page.getByRole('button', { name: 'Go back CONTINUE SHOPPING' });
        this.checkoutButton = page.getByRole('button', { name: 'CHECKOUT' });
    }

    async goto() : Promise<void> {
        await this.page.goto('/cart.html');
    }

    async doContinueShopping() : Promise<void> {
        await this.continueShoppingButton.click();
    }

    async doCheckout() : Promise<void> {
        await this.checkoutButton.click();
    }

    async removeProductFromCart(productName: string) : Promise<void> {
        const product: Locator = this.allProductsInCart.filter({ hasText: productName });

        const removeButton = product.locator('button');
        await removeButton.click();
    }

    async getProductPrice(productName: string) : Promise<string> {
        const product: Locator = this.allProductsInCart.filter({ hasText: productName });

        return `${await product.locator('div.inventory_item_price').textContent()}`;
    }

    async getProductQuantity(productName: string) : Promise<number> {
        const product: Locator = this.allProductsInCart.filter({ hasText: productName });

        const quantity = `${await product.locator('div.cart_quantity').textContent()}`;

        return (quantity === '') ? 0 : +quantity;
    }
}
