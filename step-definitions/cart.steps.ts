import { expect } from '@playwright/test';
import { Given, Then, When } from '../pages/fixtures';


Given('the user has added {string} to the cart', async ({ page, loginPage, productsPage }, productName: string) => {
    await loginPage.goto();
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(productsPage.productHeading).toBeVisible();
    await productsPage.addProductToCart(productName);
});

Given('is on the cart page', async ({ page, productsPage }) => {
    await productsPage.header.cartLink.click();
    await expect(page).toHaveURL(/.*cart.html$/);
});

When('the user clicks on the cart icon from the header', async ({ productsPage }) => {
    await productsPage.header.cartLink.click();
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

Then('the item count badge must not be displayed on cart icon in header', async ({ cartPage }) => {
    await expect(cartPage.header.cartItemCount).toHaveCount(0);
});

When('the user clicks on the `Continue Shopping` button', async ({ cartPage }) => {
    await cartPage.doContinueShopping();
});

Then('the user must be taken to Products page', async ({ page, productsPage }) => {
    await expect(page).toHaveURL(/.*inventory.html/);

    await expect(productsPage.productHeading).toBeVisible();
});

When('the user clicks on the `Checkout` button', async ({ cartPage }) => {
    await cartPage.doCheckout();
});

Then('the User should be on Your Information page', async ({ page }) => {
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
});

When('the user clicks Log out from menu', async ({ cartPage }) => {
    await cartPage.header.doLogout();
});

Then('the user is logged out', async ({ loginPage }) => {
    await expect(loginPage.loginButton).toBeVisible();
});

Then('{string} link is visible in footer', async ({ cartPage }, link: string) => {
    switch (link) {
        case 'Twitter':
            await expect(cartPage.footer.twitterLink).toBeEnabled();
            break;
        case 'Facebook':
            await expect(cartPage.footer.facebookLink).toBeEnabled();
            break;
        case 'LinkedIn':
            await expect(cartPage.footer.linkedInLink).toBeEnabled();
            break;
        default:
            break;
    }
});

When('the user clicks {string} link from footer, correct {string} is opened in a new tab', async ({ page, cartPage }, socialMedia: string, url: string) => {
    const newPagePromise = page.context().waitForEvent('page');

    switch (socialMedia) {
        case 'Twitter':
            await cartPage.footer.clickTwitterLink();
            break;
        case 'Facebook':
            await cartPage.footer.clickFacebookLink();
            break;
        case 'LinkedIn':
            await cartPage.footer.clickLinkedInLink();
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

Then('copyright text is visible in footer', async ({ cartPage }) => {
    await expect(cartPage.footer.copyrightText).toBeVisible();
});

Then('the copyright text contents are correct', async ({ cartPage }) => {
    const textContent = await cartPage.footer.getCopyrightTextContent();
    expect(textContent).toEqual('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
});
