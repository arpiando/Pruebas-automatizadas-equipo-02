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
        // Buscar el span que contiene el texto "Sign in"
        const signInButton = await driver.$("//span[text()='Sign in →']");
        await signInButton.waitForClickable({ timeout: 5000 });
        await signInButton.click();
    },

    async isLoginSuccessful(driver) {
        const adminMenu = await driver.$('.gh-nav-body');
        await adminMenu.waitForDisplayed({ timeout: 5000 });
        return await adminMenu.isDisplayed();
    }
};

module.exports = login;
