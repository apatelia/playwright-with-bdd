import { Locator, Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productHeading: Locator;
    readonly allProducts: Locator;
    readonly productSortOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productHeading = page.getByText('Products');
        this.allProducts = page.locator('div.inventory_item');
        this.productSortOptions = page.locator('select.product_sort_container');
    }

    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    async addProductToCart(productName: string): Promise<void> {
        const product: Locator = this.allProducts.filter({ hasText: productName });

        const addToCartButton = product.locator('button');
        await addToCartButton.click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product: Locator = this.allProducts.filter({ hasText: productName });

        const removeButton = product.locator('button');
        await removeButton.click();
    }
}
