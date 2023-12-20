import { expect } from "@playwright/test";
import { createBdd } from 'playwright-bdd';
import { test } from '../pages/fixtures';

const { Given, When, Then } = createBdd(test);

Given('the User is on login page', async ({ loginPage }) => {
    await loginPage.goto();
});

When('the User tries to login with {string} as username and {string} as password', async ({ loginPage }, username: string, password: string,) => {
    await loginPage.doLogin(username, password);
});

Then('the User should be on Products page', async ({ page, productsPage }) => {
    await expect(page).toHaveURL(/.*inventory.html/);

    await expect(productsPage.productHeading).toBeVisible();
});

Then('the User should see a locked out error message', async ({ loginPage }) => {
    await expect(loginPage.errorMessage).toBeVisible();

    const errorText = await loginPage.errorMessage.textContent();
    expect(errorText).toEqual('Epic sadface: Sorry, this user has been locked out.');
});

Then('the User should see invalid credentials error message', async ({ loginPage }) => {
    await expect(loginPage.errorMessage).toBeVisible();

    const errorText = await loginPage.errorMessage.textContent();
    expect(errorText).toEqual('Epic sadface: Username and password do not match any user in this service');
});
