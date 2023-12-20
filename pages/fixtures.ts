import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from './cart-page';

type MyFixtures = {
    loginPage: LoginPage,
    productsPage: ProductsPage,
    cartPage: CartPage
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    productsPage: async ({ page }, use) => use(new ProductsPage(page)),
    cartPage: async ({ page }, use) => use(new CartPage(page)),
});
