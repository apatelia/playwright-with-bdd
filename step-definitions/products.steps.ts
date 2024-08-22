import { expect } from '@playwright/test';
import { Then, When } from '../pages/fixtures';

When('the user adds {string} to the cart', async ({ productsPage }, productName: string) => {
    await productsPage.addProductToCart(productName);
});

Then('the User should be on Products page', async ({ page, productsPage }) => {
    await expect(page).toHaveURL(/.*inventory.html/);

    await expect(productsPage.productHeading).toBeVisible();
});

Then('the user should be able to remove {string} from the cart, using the `Remove` button', async ({ productsPage }, productName: string) => {
    await productsPage.removeProductFromCart(productName);
});

Then('the user must be logged out', async ({ loginPage }) => {
    await expect(loginPage.loginButton).toBeVisible();
});
