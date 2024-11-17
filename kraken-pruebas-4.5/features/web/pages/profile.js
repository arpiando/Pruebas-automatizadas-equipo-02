const { faker } = require('@faker-js/faker');

const profile = {
  selectors: {
    ProfileSelector:'svg.w3.mr1.fill-darkgrey',
    ProfileButton: '[data-test-nav="user-profile"]',
    InputName: 'input#\\:r16\\:',
    InputEmail: 'input#\\:r18\\:',
    SaveButton: 'button:has-text("Save")',
    ProfileName: 'h1.text-white.md\\:text-4xl',
    ButtonFailure: 'button:has-text("Retry")',
  },

  async navigateToProfile(driver) {
    const profileButton = await driver.$(this.selectors.ProfileButton);
    await profileButton.waitForDisplayed({ timeout: 5000 });
    await profileButton.click();
  },

  async editProfileName(driver, name) {
    // Esperar y llenar el campo de nombre
    const nameField = await driver.$(this.selectors.InputName);
    await nameField.waitForDisplayed({ timeout: 5000 });
    await nameField.setValue(name);

    // Guardar el perfil
    const saveButton = await driver.$(this.selectors.SaveButton);
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();
  },

  async isProfileModified(driver) {
    const profileName = await driver.$(this.selectors.ProfileName);
    await profileName.waitForDisplayed({ timeout: 5000 });
    const profileText = await profileName.getText();
    return profileText;
  },

  async editProfileEmail(driver, email) {
    // Esperar y llenar el campo de correo electrónico
    const emailField = await driver.$(this.selectors.InputEmail);
    await emailField.waitForDisplayed({ timeout: 5000 });
    await emailField.setValue(email);

    // Guardar el perfil
    const saveButton = await driver.$(this.selectors.SaveButton);
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();
  },

  async validateEmailIsInvalid(driver) {
    const failureButton = await driver.$(this.selectors.ButtonFailure);
    await failureButton.waitForDisplayed({ timeout: 5000 });
    const failureText = await failureButton.getText();
    return failureText;
  },

  async createNewProfile(driver) {
    // Crear un perfil nuevo con datos aleatorios
    const randomName = faker.name.firstName() + ' ' + faker.name.lastName();
    const randomEmail = faker.internet.email();

    // Llamar a los métodos para editar nombre y email
    await this.editProfileName(driver, randomName);
    await this.editProfileEmail(driver, randomEmail);
  },
};

module.exports = profile;
