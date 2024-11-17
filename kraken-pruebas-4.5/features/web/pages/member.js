const { faker } = require('@faker-js/faker');

const member = {
    selectors: {
      ButtonMember: '[data-test-nav="members"]',
      ButtonNewMember: '[data-test-new-member-button="true"]',
      InputName: '#member-name',
      InputEmail: '#member-email',
      ButtonSaveMember: "//span[text()='Save']",
      CreatedtextSelector: '.gh-btn gh-btn-primary gh-btn-icon gh-btn-green ember-view',
      MemberSelector: '.gh-members-list-name-container',
      memberNameSelector: '.gh-members-list-name-container .gh-members-list-name',
      ButtonFailure: '[data-test-button="save"] span[data-test-task-button-state="failure"]',
    },
  
    async navigateToCreateMember(driver) {
        const newMemberButton = await driver.$("a[href='#/members/']");
        await newMemberButton.waitForDisplayed({ timeout: 5000 });
        await newMemberButton.click();
      },
  
      async createNewMember(driver) {
      // Click en el botón para nuevo miembro
      const newMemberButton = await driver.$("a[href='#/members/new/']");
      await newMemberButton.waitForDisplayed({ timeout: 5000 });
      await newMemberButton.click();

      const randomName = faker.name.firstName() + ' ' + faker.name.lastName();
      const randomEmail = faker.internet.email();
  
      // Esperar y llenar el campo de nombre
      const nameField = await driver.$(this.selectors.InputName);
      await nameField.waitForDisplayed({ timeout: 5000 });
      await nameField.setValue(randomName);
  
      // Esperar y llenar el campo de correo electrónico
      const emailField = await driver.$(this.selectors.InputEmail);
      await emailField.waitForDisplayed({ timeout: 5000 });
      await emailField.setValue(randomEmail);
  
      // Guardar el miembro
      const saveButton = await driver.$(this.selectors.ButtonSaveMember);
      await saveButton.waitForDisplayed({ timeout: 5000 });
      await saveButton.click();
    },
    
  
    async validateMemberIsCreated(driver) {
      await driver.refresh();
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    
  
    async editMember(driver) {

      const randomName = faker.name.firstName() + ' ' + faker.name.lastName();

      // Esperar y llenar el campo de nombre
      const nameField = await driver.$(this.selectors.InputName);
      await nameField.waitForDisplayed({ timeout: 5000 });
      await nameField.setValue(randomName);

      // Guardar el miembro
      const saveButton = await driver.$(this.selectors.ButtonSaveMember);
      await saveButton.waitForDisplayed({ timeout: 5000 });
      await saveButton.click();
    },
  
    async validateMemberIsModified(page) {
      await this.navigateToCreateMember(page);
  
      return await page.locator(this.selectors.memberNameSelector).first().textContent();
    },
  
    async validateMemberIsInvalid(page) {
      await this.navigateToCreateMember(page);
  
      return await page.locator(this.selectors.ButtonFailure).textContent();
    },
  
    async createMemberInvalid(page, name, email) {
      await page.click(this.selectors.ButtonNewMember);
  
      await page.waitForSelector(this.selectors.InputName, { state: 'visible' });
      await page.fill(this.selectors.InputName, name);
      await page.fill(this.selectors.InputEmail, email);
  
      await page.click(this.selectors.ButtonSaveMember);
    },
  };
  
  module.exports = member;