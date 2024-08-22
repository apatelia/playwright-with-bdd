import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from './cart-page';
import { Header } from './header';
import { Footer } from './footer';

type MyFixtures = {
    loginPage: LoginPage,
    productsPage: ProductsPage,
    cartPage: CartPage,
    header: Header,
    footer: Footer
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => use(new LoginPage(page)),
    productsPage: async ({ page }, use) => use(new ProductsPage(page)),
    cartPage: async ({ page }, use) => use(new CartPage(page)),
    header: async ({ page }, use) => use(new Header(page)),
    footer: async ({ page }, use) => use(new Footer(page)),
});

export const { Given, When, Then } = createBdd(test);
