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

// //Cambiar el tema de la pagina Ghost
//
// When('I click on config button', async function () {
//     const themeDropdown = await this.driver.$('#ember1072');
//     await themeDropdown.waitForDisplayed({ timeout: 5000 });
//     await themeDropdown.click();
// });
//
When('I select the theme config', async function (theme) {
    // ember1438
    const themeOption = await this.driver.$(`#ember1438`);
    await themeOption.waitForDisplayed({ timeout: 5000 });
    await themeOption.click();
});

// When I click on the theme dropdown
//the id is ember1472

When('I click on the theme dropdown', async function () {
    //use the ember1472
    const themeDropdown = await this.driver.$('#ember1472');
    await themeDropdown.waitForDisplayed({ timeout: 5000 });
    await themeDropdown.click();
});

//
// When('I click on the save button', async function () {
//     const saveButton = await this.driver.$('.ember-view td-item td-item-labs');
//     await saveButton.waitForDisplayed({ timeout: 5000 });
//     await saveButton.click();
// });
//
// Then('I should see the theme {string} in the theme dropdown', async function (theme) {
//     const themeDropdown = await this.driver.$('.gh-setting-first.gh-setting-action.ember-view');
//     await themeDropdown.waitForDisplayed({ timeout: 5000 });
//     const themeText = await themeDropdown.getText();
//     if (!themeText.includes(theme)) {
//         throw new Error('El tema seleccionado no se mostró en el dropdown');
//     }
// });


//Crear un nuevo miembro exitosamente
When('I click on the "Team" section', async function () {
    const teamLink = await this.driver.$('.active.ember-view');
    await teamLink.waitForDisplayed({ timeout: 5000 });
    await teamLink.click();
});

When('I click on the "New member" button', async function () {
    const newMemberButton = await this.driver.$('.ember-view.gh-btn.gh-btn-primary');
    await newMemberButton.waitForDisplayed({ timeout: 5000 });
    await newMemberButton.click();
});

When('I enter the member details', async function () {
    const nameField = await this.driver.$('.form-group max-width ember-view');
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue('New Member');

    const emailField = await this.driver.$('.gh-cp-member-email-name');
    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue('newmember@example.com');
});

When('I click on the "Save" button', async function () {
    const saveButton = await this.driver.$('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();
});

//Crear un miembro con datos invalidos
When('I enter invalid member details', async function () {
    const nameField = await this.driver.$('.form-group max-width ember-view');
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue('New Member');

    const emailField = await this.driver.$('..gh-cp-member-email-name');
    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue('invalidemail');
});

Then('I should see an error message for the member', async function () {
    const errorMessage = await this.driver.$('.gh-alert.gh-alert-red');
    await errorMessage.waitForDisplayed({ timeout: 5000 });
    const messageText = await errorMessage.getText();
    if (!messageText.includes("Invalid email")) {
        throw new Error('El mensaje de error esperado no se mostró.');
    }
});

// Modificar la información de un usuario existente
When('I click on the "Team" section', async function () {
    const teamLink = await this.driver.$('.active.ember-view');
    await teamLink.waitForDisplayed({ timeout: 5000 });
    await teamLink.click();
});

When('I click on the "Edit" button for the user', async function () {
    const editButton = await this.driver.$('.active.ember-view');
    await editButton.waitForDisplayed({ timeout: 5000 });
    await editButton.click();
});

When('I change the user details', async function () {
    const nameField = await this.driver.$('.form-group .max-width .ember-view');
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue('Updated Member');

    const emailField = await this.driver.$('.gh-cp-member-email-name');
    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue('Updated Member');
});

// Crear y modificar etiquetas (tags)
When('I click on the "Tags" section', async function () {
    const tagsLink = await this.driver.$('.ember-view');
    await tagsLink.waitForDisplayed({ timeout: 5000 });
    await tagsLink.click();
});

When('I click on the "New tag" button', async function () {
    const newTagButton = await this.driver.$('.ember-view.gh-btn.gh-btn-primary');
    await newTagButton.waitForDisplayed({ timeout: 5000 });
    await newTagButton.click();
});

When('I enter the tag details', async function () {
    const nameField = await this.driver.$('.form-group .max-width .ember-view');
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue('New Tag');
});

When('I click on the "Save" button', async function () {
    const saveButton = await this.driver.$('.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();
});

When('I click on the "Edit" button for the tag', async function () {
    const editButton = await this.driver.$('.gh-list-row .gh-tags-list-item');
    await editButton.waitForDisplayed({ timeout: 5000 });
    await editButton.click();
});

When('I change the tag details', async function () {
    const nameField = await this.driver.$('.form-group .max-width .ember-view');
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue('Updated Tag');
});

Then('I should see the updated tag in the list', async function () {
    const tag = await this.driver.$('.gh-list-row .gh-tags-list-item');
    await tag.waitForDisplayed({ timeout: 5000 });
    const tagText = await tag.getText();
    if (!tagText.includes('Updated Tag')) {
        throw new Error('La etiqueta actualizada no se mostró en la lista');
    }
});


//crear un miembro en la aplicacion
When('I click on the "Team" section', async function () {
    const teamLink = await this.driver.$('.active.ember-view');
    await teamLink.waitForDisplayed({ timeout: 5000 });
    await teamLink.click();
});

When('I click on the "New member" button', async function () {
    const newMemberButton = await this.driver.$('.ember-view.gh-btn.gh-btn-primary');
    await newMemberButton.waitForDisplayed({ timeout: 5000 });
    await newMemberButton.click();
});

When('I enter the member details', async function () {
    const nameField = await this.driver.$('.form-group max-width ember-view');
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue('New Member');
});

// //Modificar la informacion de un miembro existente
//
// When('I click on the "Team" section', async function () {
//     const teamLink = await this.driver.$('.active.ember-view');
//     await teamLink.waitForDisplayed({ timeout: 5000 });
//     await teamLink.click();
// });
//
//     When('I click on the "Edit" button for the user', async function () {
//         const editButton = await this.driver.$('.active.ember-view');
//         await editButton.waitForDisplayed({ timeout: 5000 });
//         await editButton.click();
//     });
//
//     When('I change the user details', async function () {
//         const nameField = await this.driver.$('.form-group .max-width .ember-view');
//         await nameField.waitForDisplayed({ timeout: 5000 });
//         await nameField.setValue('Updated Member');
//     });
