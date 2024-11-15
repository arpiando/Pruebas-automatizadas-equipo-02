const login = require('../pages/login');
const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter the credentials in the login fields', async function () {
    await login.enterCredentials(this.driver);
});

When('I click on sign in', async function () {
    await login.clickSignIn(this.driver);
});

Then('I should see the dashboard page', async function () {
    const isAdminVisible = await login.isLoginSuccessful(this.driver);
});