import { expect } from '@playwright/test';
import { Then, When } from '../pages/fixtures';

Then('the cart item badge must show correct count of {int}', async ({ header }, count: number) => {
    const cartItemCount = await header.getCartItemCount();
    expect(cartItemCount).toEqual(count);
});

Then('the cart item badge must not be displayed', async ({ header }) => {
    await expect(header.cartItemCount).toHaveCount(0);
});

When('the user clicks Log out from hamburger menu', async ({ header }) => {
    await header.doLogout();
});

When('the user clicks on the cart icon from the header', async ({ header }) => {
    await header.cartLink.click();
});

Then('the item count badge must not be displayed on cart icon in header', async ({ header }) => {
    await expect(header.cartItemCount).toHaveCount(0);
});
