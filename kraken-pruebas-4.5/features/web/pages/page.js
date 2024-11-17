const pageCreate = {
  selectors: {
    pageMenuSelector: '[data-test-nav="pages"]',
    newPageButton: 'a[href="#/editor/page/"]',
    titleInput: '.gh-editor-title',
    contentInput: 'p[data-koenig-dnd-droppable="true"]',
    publishButton: '.gh-btn.gh-btn-editor.gh-publish-trigger',
    reviewButton: '[data-test-button="continue"]',
    confirmButton: '[data-test-button="confirm-publish"]',
    header: 'header.modal-header h1[data-test-complete-title] span',
    successMessage: 'Boom! It\'s out there.',
    headerCloseButton: '[data-test-button="close-publish-flow"]',
    post: '.gh-posts-list-item-group',
    updateButton: '[data-test-button="publish-save"]',
    updateWindow: '.gh-notification-content',
    buttonPageBackToMenu: '[data-test-link="pages"]',
    draftSelector: '.gh-content-entry-status .draft',
    pagePublishedToEdit: 'li[data-test-post-id][class*="gh-post-list-plain-status"] >> text="Published"',
    unpublishedButton: '[data-test-button="update-flow"]',
    reverteToDraftButton: '[data-test-button="revert-to-draft"]',
    unpublishedNotification: '[data-test-text="notification-content"]',
    previewButton: '[data-test-button="publish-preview"]',
    previewTitlePost: '.gh-browserpreview-browser',
  },

  async navigateToCreatePage(driver) {
    const link = await driver.$('a[href="#/pages/"]');
    await link.waitForDisplayed({ timeout: 5000 });
    await link.click();
  },

  async createPage(driver) {

    // Crear página
    const newPageLink = await driver.$('a[href="#/editor/page/"]');
    await newPageLink.waitForClickable({ timeout: 5000 });
    await newPageLink.click();

    // Establecer título
    const titleField = await driver.$(this.selectors.titleInput);
    await titleField.waitForDisplayed({ timeout: 5000 });
    await titleField.setValue('tituloooo');

    // Establecer contenido
    const contentField = await driver.$(this.selectors.contentInput);
    await contentField.waitForDisplayed({ timeout: 5000 });
    await contentField.click();
    await driver.pause(500);
    await contentField.setValue('Nuevoocontenidoooo');

    // Publicar la página
    const publishButton = await driver.$('//span[text()="Publish"]');
    await publishButton.waitForClickable({ timeout: 5000 });
    await publishButton.click();

    // Esperar el dropdown
    const dropdown = await driver.$('#ember-basic-dropdown-wormhole');
    await dropdown.waitForDisplayed({ timeout: 5000 });

    // Seleccionar opción de publicar
    const publishOption = await dropdown.$('//span[text()="Publish"]');
    await publishOption.waitForClickable({ timeout: 5000 });
    await publishOption.click();
},

  async isPageCreatedSuccessfully(driver) {
    await driver.refresh();
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async closeHeaderPage(driver) {
    await driver.waitForDisplayed(this.selectors.headerCloseButton, { timeout: 5000 });
    await driver.click(this.selectors.headerCloseButton);
  },

  async editPage(driver) {
    // Esperar a que la página esté lista para editar
    const pageToEdit = await driver.$('//span[text()="Update"]');
    await pageToEdit.waitForDisplayed({ timeout: 5000 });
    await pageToEdit.click();

       // Establecer título
       const titleField = await driver.$(this.selectors.titleInput);
       await titleField.waitForDisplayed({ timeout: 5000 });
       await titleField.setValue('tituloooo2');
   
       // Establecer contenido
       const contentField = await driver.$(this.selectors.contentInput);
       await contentField.waitForDisplayed({ timeout: 5000 });
       await contentField.click();
       await driver.pause(500);
       await contentField.setValue('Nuevoocontenidoooo2');

    // Publicar la página
    const publishButton = await driver.$('//span[text()="Update"]');
    await publishButton.waitForClickable({ timeout: 5000 });
    await publishButton.click();

    // Esperar el dropdown
    const dropdown = await driver.$('#ember-basic-dropdown-wormhole');
    await dropdown.waitForDisplayed({ timeout: 5000 });

    // Seleccionar opción de publicar
    const publishOption = await dropdown.$('//span[text()="Update"]');
    await publishOption.waitForClickable({ timeout: 5000 });
    await publishOption.click();
},

  async confirmPageIsUpdated(driver) {
    await driver.refresh();
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async createPageAsDraft(driver, title, content) {
    await driver.setValue(this.selectors.titleInput, title);
    await driver.setValue(this.selectors.contentInput, content);
    await driver.waitForTimeout(500);
    await driver.click(this.selectors.buttonPageBackToMenu);
  },

  async isDraftSavedSuccessfully(driver) {
    await driver.waitForDisplayed(this.selectors.draftSelector, { timeout: 5000 });
    return await driver.getText(this.selectors.draftSelector);
  },

  async unpublishedPage(driver) {
    await driver.waitForDisplayed(this.selectors.pagePublishedToEdit, { timeout: 5000 });
    await driver.click(this.selectors.pagePublishedToEdit);

    await driver.waitForDisplayed(this.selectors.titleInput, { timeout: 5000 });
    await driver.click(this.selectors.unpublishedButton);

    await driver.waitForDisplayed(this.selectors.reverteToDraftButton, { timeout: 5000 });
    await driver.click(this.selectors.reverteToDraftButton);
  },

  async isRevertToDraftSuccess(driver) {
    await driver.waitForDisplayed(this.selectors.unpublishedNotification, { timeout: 5000 });
    return await driver.getText(this.selectors.unpublishedNotification);
  },

  async isPreviewSuccessful(driver) {
    return await driver.waitForDisplayed(this.selectors.previewTitlePost, { timeout: 5000 }) !== null;
  },

  async reloadPage(driver) {
    await driver.refresh();
    await new Promise(resolve => setTimeout(resolve, 1000));
}
};

module.exports = pageCreate;


