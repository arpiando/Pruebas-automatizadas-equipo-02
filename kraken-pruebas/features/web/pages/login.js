require('dotenv').config();

const login = {
    async enterCredentials(driver) {
        const email = process.env.GHOST_EMAIL;
        const password = process.env.GHOST_PASSWORD;

        const emailField = await driver.$('.gh-input.email');
        const passwordField = await driver.$('.gh-input.password');

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue(email);

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue(password);
    },

    async clickSignIn(driver) {
        const signInButton = await driver.$('[data-test-button="sign-in"]');
        await signInButton.waitForClickable({ timeout: 5000 });
        await signInButton.click();
    },

    async isLoginSuccessful(driver) {
        const adminMenu = await driver.$('.gh-nav-body');
        await adminMenu.waitForDisplayed({ timeout: 5000 });
        return await adminMenu.isDisplayed();
    },

    async enterInvalidCredentials(driver,email, password) {

        const emailField = await driver.$('.gh-input.email');
        const passwordField = await driver.$('.gh-input.password');

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue(email);

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue(password);
    },

    async loginNotSuccessful(driver) {
        const errorElement = await driver.$('.main-error'); 
        await errorElement.waitForDisplayed({ timeout: 5000 }); 
        return await errorElement.isDisplayed();
    },

    async logout(driver) {
        const menuButton = await driver.$('.pe-all');
        await menuButton.waitForClickable({ timeout: 5000 });
        await menuButton.click();

        const logoutLink = await driver.$('a[href="#/signout/"]');
        await logoutLink.waitForClickable({ timeout: 5000 });
        await logoutLink.click();

    }

};

module.exports = login;
