const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter {string} in the "email" field and {string} in the "password" field', async function (email, password) {
    const emailField = await this.driver.$('#identification');
    const passwordField = await this.driver.$('#password');
    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(email);
    await passwordField.waitForDisplayed({ timeout: 5000 });
    await passwordField.setValue(password);
});

When('I click on sign in', async function () {
    const signInButton = await this.driver.$('[data-test-button="sign-in"]');
    await signInButton.waitForClickable({ timeout: 5000 });
    await signInButton.click();
});

Then('I should see the dashboard page', async function () {
    const element = await this.driver.$('#ember16');
    try {
        await element.waitForDisplayed({ timeout: 5000 });
    } catch (error) {
        throw new Error('El elemento con id="ember16" no se mostró en la página del dashboard');
    }
    const isVisible = await element.isDisplayed();
    if (!isVisible) {
        throw new Error('El elemento con id="ember16" no es visible en la página del dashboard');
    }
});

When('I navigate to the "Pages" section', async function () {
    const link = await this.driver.$('a[href="#/pages/"]'); // Busca el enlace con href="#/pages/"
    try {
        // Espera hasta que el enlace sea visible
        await link.waitForDisplayed({ timeout: 5000 });
    } catch (error) {
        throw new Error('El enlace con href="#/pages/" no se mostró en la página');
    }

    const isVisible = await link.isDisplayed();
    if (!isVisible) {
        throw new Error('El enlace con href="#/pages/" no es visible en la página');
    }

    // Haz clic en el enlace una vez que sea visible
    await link.click();
});

When('I click on "New page"', async function () {
    const link = await this.driver.$('a[href="#/editor/page/"]'); // Busca el enlace con href="#/editor/page/"
    try {
        // Espera hasta que el enlace sea visible
        await link.waitForDisplayed({ timeout: 5000 });
    } catch (error) {
        throw new Error('El enlace con href="#/editor/page/" no se mostró en la página');
    }

    const isVisible = await link.isDisplayed();
    if (!isVisible) {
        throw new Error('El enlace con href="#/editor/page/" no es visible en la página');
    }

    // Haz clic en el enlace una vez que sea visible
    await link.click();
});

When('I enter {string} in the title field', async function (title) {
    const titleField = await this.driver.$('textarea'); 
    await titleField.waitForDisplayed({ timeout: 5000 });
    await titleField.setValue(title);
});

When('I enter {string} in the content field', async function (content) {
    const contentField = await this.driver.$('p[data-koenig-dnd-droppable="true"]'); // Selecciona el <p> con el atributo data-koenig-dnd-droppable="true"
    
    // Espera que el elemento esté visible
    await contentField.waitForDisplayed({ timeout: 5000 });

    // Hace clic en el elemento para habilitar la edición
    await contentField.click();

    // Espera un poco para asegurarse de que el campo esté listo para editar
    await this.driver.pause(500); // Pausa por medio segundo

    // Escribe el contenido dentro del campo
    await contentField.setValue(content);
});

When('I click on "Publish"', async function () {
    const publishButton = await this.driver.$('.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger');
    await publishButton.waitForDisplayed({ timeout: 5000 });
    await publishButton.click();
});


Then('I should see "Continue, final review" confirmation message and "Publish page, right now"', async function () {
    // Espera hasta que el botón que abre el modal sea visible
    const continueButton = await this.driver.$('.gh-btn.gh-btn-black.gh-btn-large');
    await continueButton.waitForDisplayed({ timeout: 5000 });
    
    // Hacemos clic en el botón para abrir el modal
    await continueButton.click();

    // Esperamos a que el contenedor del modal sea visible
    const modalContainer = await this.driver.$('.gh-publish-settings-container.fade-in');
    await modalContainer.waitForDisplayed({ timeout: 5000 });

    // Intentamos esperar hasta que el botón dentro del modal sea visible
    const confirmButton = await modalContainer.$('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
    await confirmButton.waitForDisplayed({ timeout: 5000 });

    // Verificamos si el botón está visible y hacemos clic en él
    const isVisible = await confirmButton.isDisplayed();
    if (!isVisible) {
        throw new Error('El botón "Continue, final review" no se mostró después de hacer clic.');
    }
    await confirmButton.click();
});












