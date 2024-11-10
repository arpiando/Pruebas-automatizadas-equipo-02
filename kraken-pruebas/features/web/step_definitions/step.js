require('dotenv').config();
const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter the credentials in the login fields', async function () {
    const email = process.env.GHOST_EMAIL;
    const password = process.env.GHOST_PASSWORD;

    const emailField = await this.driver.$('#ember7');  // Actualizado al nuevo ID
    const passwordField = await this.driver.$('#ember9');  // Actualizado al nuevo ID

    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(email);

    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);
});


When('I click on sign in', async function () {
    const signInButton = await this.driver.$('#ember11');  // Actualizado al nuevo ID del botón
    await signInButton.waitForClickable({ timeout: 5000 });
    await signInButton.click();
});

Then('I should see the dashboard page', async function () {
    const element = await this.driver.$('#ember19');
    try {
        await element.waitForDisplayed({ timeout: 5000 });
    } catch (error) {
        throw new Error('El elemento con id="ember19" no se mostró en la página del dashboard');
    }
    const isVisible = await element.isDisplayed();
    if (!isVisible) {
        throw new Error('El elemento con id="ember19" no es visible en la página del dashboard');
    }
});

When('I navigate to the "Pages" section', async function () {
    const link = await this.driver.$('a[href="#/pages/"]'); 
    try {
        await link.waitForDisplayed({ timeout: 5000 });
    } catch (error) {
        throw new Error('El enlace con href="#/pages/" no se mostró en la página');
    }

    const isVisible = await link.isDisplayed();
    if (!isVisible) {
        throw new Error('El enlace con href="#/pages/" no es visible en la página');
    }
    await link.click();
});

When('I click on "New page"', async function () {
    const link = await this.driver.$('a[href="#/editor/page/"]'); 
    try {

        await link.waitForDisplayed({ timeout: 5000 });
    } catch (error) {
        throw new Error('El enlace con href="#/editor/page/" no se mostró en la página');
    }

    const isVisible = await link.isDisplayed();
    if (!isVisible) {
        throw new Error('El enlace con href="#/editor/page/" no es visible en la página');
    }

    await link.click();
});

When('I enter {string} in the title field', async function (title) {
    const titleField = await this.driver.$('textarea'); 
    await titleField.waitForDisplayed({ timeout: 5000 });
    await titleField.setValue(title);
});

When('I enter {string} in the content field', async function (content) {
    const contentField = await this.driver.$('p[data-koenig-dnd-droppable="true"]');

    await contentField.waitForDisplayed({ timeout: 5000 });

    await contentField.click();

    await this.driver.pause(500); 
    await contentField.setValue(content);
});

When('I click on "Publish", and is finished', async function () {
    const publishButton = await this.driver.$('.gh-btn.gh-btn-editor.gh-publishmenu-trigger');
    await publishButton.waitForDisplayed({ timeout: 5000 });
    await publishButton.click();
    const confirmButton = await this.driver.$('.gh-btn.gh-btn-black.gh-publishmenu-button');
    await confirmButton.waitForDisplayed({ timeout: 5000 });
    await confirmButton.click();

});


// Then('I should see "Continue, final review" confirmation message and "Publish page, right now"', async function () {
//
//     const continueButton = await this.driver.$('.gh-btn.gh-btn-black.gh-btn-large');
//     await continueButton.waitForDisplayed({ timeout: 5000 });
//     await continueButton.click();
//
//     const modalContainer = await this.driver.$('.gh-publish-settings-container.fade-in');
//     await modalContainer.waitForDisplayed({ timeout: 5000 });
//
//     const confirmButton = await modalContainer.$('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
//     await confirmButton.waitForDisplayed({ timeout: 5000 });
//
//     const isVisible = await confirmButton.isDisplayed();
//     if (!isVisible) {
//         throw new Error('El botón "Continue, final review" no se mostró después de hacer clic.');
//     }
//     await confirmButton.click();
// });

When('I enter incorrect credentials in the login fields', async function () {
    const emailField = await this.driver.$('#ember7');
    const passwordField = await this.driver.$('#ember9');
    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue('incorrect@example.com');
    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue('wrongpassword');
});
Then('I should see an error message', async function () {
    const errorMessage = await this.driver.$('p.main-error');
    await errorMessage.waitForDisplayed({ timeout: 5000 });
    const messageText = await errorMessage.getText();
    if (!messageText.includes("There is no user with that email address")) {
        throw new Error('El mensaje de error esperado no se mostró.');
    }
});

When('I click on the dark mode button', async function () {
    const darkModeButton = await this.driver.$('.nightshift-toggle ');
    await darkModeButton.waitForDisplayed({ timeout: 5000 });
    await darkModeButton.click();
});

Then('I should see the dark mode theme', async function () {
    const darkModeButton = await this.driver.$('.nightshift-toggle.on');
    await darkModeButton.waitForDisplayed({ timeout: 5000 });
    const isVisible = await darkModeButton.isDisplayed();
    if (!isVisible) {
        throw new Error('El botón de dark mode no se activó correctamente');
    }
});

When('I click on the light mode button', async function () {
    const lightModeButton = await this.driver.$('.nightshift-toggle ');
    await lightModeButton.waitForDisplayed({ timeout: 5000 });
    await lightModeButton.click();
});

Then('I should see the light mode theme', async function () {
    const lightModeButton = await this.driver.$('.nightshift-toggle');
    await lightModeButton.waitForDisplayed({ timeout: 5000 });
    const isVisible = await lightModeButton.isDisplayed();
    if (!isVisible) {
        throw new Error('El botón de light mode no se activó correctamente');
    }
});



