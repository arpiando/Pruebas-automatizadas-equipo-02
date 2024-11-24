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
    const link = await driver.$(this.selectors.pageMenuSelector);
    await link.waitForDisplayed({ timeout: 5000 });
    await link.click();
  },

  async createPage(driver, titulo, contenido) {

    // Crear pagina
    const newPageLink = await driver.$('//span[contains(text(), "New page")]');
    await newPageLink.waitForDisplayed({ timeout: 5000 });
    await newPageLink.click();

    // Establecer título
    const titleField = await driver.$(this.selectors.titleInput)
    await titleField.waitForDisplayed({ timeout: 5000 });
    await titleField.setValue(titulo);

    // Establecer contenido
    const contentField = await driver.$(this.selectors.contentInput);
    await contentField.waitForDisplayed({ timeout: 5000 });
    await contentField.click();
    await driver.pause(500); 
    await contentField.setValue(contenido);

    // Publicar la página
    const publishButton = await driver.$(this.selectors.publishButton);
    await publishButton.waitForDisplayed({ timeout: 5000 });
    await publishButton.click();

    // Confirmar publicación (revisión final)
    const continueButton = await driver.$(this.selectors.reviewButton || this.selectors.continueButton);
    await continueButton.waitForDisplayed({ timeout: 60000 });
    await continueButton.click();

    // Pausa antes de confirmar
    await driver.pause(500); 

    // Confirmar acción
    const confirmButton = await driver.$(this.selectors.confirmButton);
    await confirmButton.waitForDisplayed({ timeout: 60000 });
    await confirmButton.click();
},

  async isPageCreatedSuccessfully(driver) {
    const headerElement = await driver.$(this.selectors.header);
    await headerElement.waitForDisplayed({ timeout: 5000 }); 
    const successText = await headerElement.getText(); 
    return successText === this.selectors.successMessage; 
  },

  async closeHeaderPage(driver) {
    await driver.waitForDisplayed(this.selectors.headerCloseButton, { timeout: 5000 });
    await driver.click(this.selectors.headerCloseButton);
  },

  async editPage(driver, titulo, contenido) {
    // Esperar a que la página esté lista para editar
    const pageToEdit = await driver.$('.published');
    await pageToEdit.waitForDisplayed({ timeout: 5000 });
    await pageToEdit.click();

    // Establecer el nuevo título
    const titleField = await driver.$(this.selectors.titleInput);
    await titleField.waitForDisplayed({ timeout: 5000 });
    await titleField.clearValue();
    await titleField.setValue(titulo);

    // Establecer el nuevo contenido
    const contentField = await driver.$(this.selectors.contentInput);
    await contentField.waitForDisplayed({ timeout: 5000 });
    await contentField.click();
    await driver.pause(500);
    await contentField.setValue(contenido);

    // Esperar y hacer clic en el botón de actualizar
    const updateButton = await driver.$(this.selectors.updateButton);
    await updateButton.waitForDisplayed({ timeout: 5000 });
    await updateButton.click();
},

  async confirmPageIsUpdated(driver) {
    const updateWindow = await driver.$('.gh-notification-content');
    await updateWindow.waitForDisplayed({ timeout: 5000 });
    const text = await updateWindow.getText();
    return text;
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
},

 async selectPage(driver) {
  const link = await driver.$('a[href="#/pages/"]');
  await link.waitForDisplayed({ timeout: 5000 });
  await link.click();
  const table = await driver.$('.posts-list.gh-list');
  await table.waitForDisplayed({ timeout: 5000 });
  const firstRow = await driver.$('.gh-posts-list-item-group');
  await firstRow.waitForDisplayed({ timeout: 5000 });
  await firstRow.click();
},

async deletePage(driver) {

  const settingsButton = await driver.$('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon');
  await settingsButton.waitForClickable({ timeout: 5000 });
  await settingsButton.click();

  const deletePageButton = await driver.$('//span[contains(text(), "Delete")]');
  await deletePageButton.scrollIntoView();
  await deletePageButton.waitForClickable({ timeout: 5000 });
  await deletePageButton.click();

  const modal = await driver.$('.modal-content');
  await modal.waitForDisplayed({ timeout: 6000 });

  const confirmButton = await driver.$("//button[@data-test-button='delete-post-confirm']");
  await confirmButton.waitForClickable({ timeout: 5000 });
  await confirmButton.click();

},

async validatePageIsDeleted(driver) {
  const membersList = await driver.$('.posts-list.gh-list');
  await membersList.waitForDisplayed({ timeout: 10000 });
},

async createPageInvalid(driver, titulo, contenido) {
   // Esperar a que la página esté lista para editar
   const pageToEdit = await driver.$('.published');
   await pageToEdit.waitForDisplayed({ timeout: 5000 });
   await pageToEdit.click();

   // Establecer el nuevo título
   const titleField = await driver.$(this.selectors.titleInput);
   await titleField.waitForDisplayed({ timeout: 5000 });
   await titleField.clearValue();
   await titleField.setValue(titulo);

   // Establecer el nuevo contenido
   const contentField = await driver.$(this.selectors.contentInput);
   await contentField.waitForDisplayed({ timeout: 5000 });
   await contentField.click();
   await driver.pause(500);
   await contentField.setValue(contenido);

   // Esperar y hacer clic en el botón de actualizar
   const updateButton = await driver.$(this.selectors.updateButton);
   await updateButton.waitForDisplayed({ timeout: 5000 });
   await updateButton.click();
},

async NotSuccessful(driver) {
  const alertContainer = await driver.$('aside.gh-alerts');
  return await alertContainer.waitForDisplayed({ timeout: 5000 });
},
};

module.exports = pageCreate;


