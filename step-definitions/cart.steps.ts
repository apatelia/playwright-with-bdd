import { expect } from '@playwright/test';
import { Given, Then, When } from '../pages/fixtures';


Given('is on the cart page', async ({ page, header }) => {
    await header.cartLink.click();
    await expect(page).toHaveURL(/.*cart.html$/);
});

Then('price of the {string} in cart must match {string}', async ({ cartPage }, productName: string, productPrice: string) => {
    expect(await cartPage.getProductPrice(productName)).toEqual(productPrice);
});

Then('quantity of the {string} in cart must match {int}', async ({ cartPage }, productName: string, productQuantity: number) => {
    expect(await cartPage.getProductQuantity(productName)).toEqual(productQuantity);
});

Then('the user removes {string} from the cart', async ({ cartPage }, productName: string) => {
    await cartPage.removeProductFromCart(productName);
});

When('the user clicks on the `Continue Shopping` button', async ({ cartPage }) => {
    await cartPage.doContinueShopping();
});

When('the user clicks on the `Checkout` button', async ({ cartPage }) => {
    await cartPage.doCheckout();
});

Then('the User should be on Your Information page', async ({ page }) => {
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
});
