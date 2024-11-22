const member = {
    selectors: {
      ButtonMember: '[data-test-nav="members"]',
      ButtonNewMember: '[data-test-new-member-button="true"]',
      InputName: '[data-test-input="member-name"]',
      InputEmail: '[data-test-input="member-email"]',
      ButtonSaveMember: '[data-test-button="save"]',
      CreatedtextSelector: '.gh-member-details-attribution p',
      MemberSelector: '.gh-members-list-name-container',
      memberNameSelector: '.gh-members-list-name-container .gh-members-list-name',
      ButtonFailure: '[data-test-button="save"] span[data-test-task-button-state="failure"]',
    },
  
    async navigateToCreateMember(driver) {
        const newMemberButton = await driver.$(this.selectors.ButtonMember);
        await newMemberButton.waitForDisplayed({ timeout: 5000 });
        await newMemberButton.click();
      },
  
      async createNewMember(driver, name, email) {
      const newMemberButton = await driver.$(this.selectors.ButtonNewMember);
      await newMemberButton.waitForDisplayed({ timeout: 5000 });
      await newMemberButton.click();

      const nameField = await driver.$(this.selectors.InputName);
      await nameField.waitForDisplayed({ timeout: 5000 });
      await nameField.setValue(name);
  
      // Esperar y llenar el campo de correo electrónico
      const emailField = await driver.$(this.selectors.InputEmail);
      await emailField.waitForDisplayed({ timeout: 5000 });
      await emailField.setValue(email);
  
      // Guardar el miembro
      const saveButton = await driver.$(this.selectors.ButtonSaveMember);
      await saveButton.waitForDisplayed({ timeout: 5000 });
      await saveButton.click();
  
    },
    
  
    async validateMemberIsCreated(driver) {
        const confirmationElement = await driver.$(this.selectors.CreatedtextSelector);
        await confirmationElement.waitForDisplayed({ timeout: 5000 });
        const confirmationText = await confirmationElement.getText();
        return confirmationText === this.selectors.expectedSuccessMessage;
    },
    
  
    async editMember(driver, name) {

      // Esperar y llenar el campo de nombre
      const nameField = await driver.$(this.selectors.InputName);
      await nameField.waitForDisplayed({ timeout: 5000 });
      await nameField.setValue(name);

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

    async deleteMember(driver) {

      const dropdownButton = await driver.$('.dropdown');
      await dropdownButton.waitForClickable({ timeout: 5000 });
      await dropdownButton.click();
  
      const deleteButton = await driver.$('[data-test-button="delete-member"]');
      await deleteButton.waitForClickable({ timeout: 5000 });
      await deleteButton.click();

      const modal = await driver.$('[data-test-modal="delete-member"]');
      await modal.waitForDisplayed({ timeout: 5000 });

      const confirmButton = await driver.$('[data-test-button="confirm"]');
      await confirmButton.waitForClickable({ timeout: 5000 });
      await confirmButton.click();

    },

    async memberSelection(driver) {

      const newMemberButton = await driver.$(this.selectors.ButtonMember);
      await newMemberButton.waitForDisplayed({ timeout: 5000 });
      await newMemberButton.click();

      const table = await driver.$('.gh-list');
      await table.waitForDisplayed({ timeout: 5000 });

      const firstRow = await driver.$('table.gh-list tbody tr[data-test-list="members-list-item"]');
      await firstRow.waitForDisplayed({ timeout: 5000 });
      await firstRow.click();
    },

    async validateMemberIsDeleted(driver) {
      const membersList = await driver.$('table.gh-list tbody');
      await membersList.waitForDisplayed({ timeout: 5000 });
    },

    async errorMember(driver) {
      const buttonWithErrorState = await driver.$('button span[data-test-task-button-state="failure"]');
      await buttonWithErrorState.waitForDisplayed({ timeout: 5000 });
      return await buttonWithErrorState.isDisplayed();
    },

  };
  
  module.exports = member;