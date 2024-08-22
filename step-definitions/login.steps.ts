import { expect } from '@playwright/test';
import { Given, Then, When } from '../pages/fixtures';

Given('the User is on login page', async ({ loginPage }) => {
    await loginPage.goto();
});

When('the User tries to login with {string} as username and {string} as password', async ({ loginPage }, username: string, password: string,) => {
    await loginPage.doLogin(username, password);
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
