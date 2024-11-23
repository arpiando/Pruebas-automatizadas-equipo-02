const postCreate = {
    selectors: {
      postSelector: '.gh-nav-new-post',
      titleInput: '.gh-editor-title',
      contentInput: 'p[data-koenig-dnd-droppable="true"]',
      publishButton: '.gh-btn.gh-btn-editor.gh-publish-trigger',
      reviewButton: '[data-test-button="continue"]',
      confirmButton: '[data-test-button="confirm-publish"]',
      header: 'header.modal-header h1[data-test-complete-title] span',
      successMessage: 'Boom! It\'s out there.',
      headerCloseButton: '[data-test-button="close-publish-flow"]',
      updateButton: '[data-test-button="publish-save"]',
      updateWindow: '.gh-notification-content',
      buttonPostBackToMenu: '[data-test-link="posts"]',
      draftSelector: '.gh-content-entry-status .draft',
      postPublishedToEdit: 'li[data-test-post-id][class*="gh-post-list-plain-status"] >> text="Published"',
      unpublishedButton: '[data-test-button="update-flow"]',
      revertToDraftButton: '[data-test-button="revert-to-draft"]',
      unpublishedNotification: '[data-test-text="notification-content"]',
      previewButton: '[data-test-button="publish-preview"]',
      previewTitlePost: '.gh-browserpreview-browser',
    },

    async navigateToCreatePost(driver) {
        const link = await driver.$(this.selectors.postSelector);
        await link.waitForDisplayed({ timeout: 5000 });
        await link.click();
      },
  
    async createPost(driver) {

        // Establecer título
        const titleField = await driver.$(this.selectors.titleInput);
        await titleField.waitForDisplayed({ timeout: 5000 });
        await titleField.setValue('tituloooo');

        // Establecer contenido
        const contentField = await driver.$(this.selectors.contentInput);
        await contentField.waitForDisplayed({ timeout: 5000 });
        await contentField.click();
        await driver.pause(500); // Breve pausa
        await contentField.setValue('contenidoooo');

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
  
    async closeHeaderPost(page) {
      await page.waitForSelector(this.selectors.headerCloseButton, { state: 'visible' });
      await page.click(this.selectors.headerCloseButton);
    },
  
    async editPost(page, title, content) {
      await page.click(this.selectors.postPublishedToEdit);
  
      await page.fill(this.selectors.titleInput, '');
      await page.fill(this.selectors.titleInput, title);
  
      await page.fill(this.selectors.contentInput, '');
      await page.fill(this.selectors.contentInput, content);
  
      await page.isVisible(this.selectors.updateButton);
      await page.click(this.selectors.updateButton);
    },
  
    async confirmPostIsUpdated(page) {
      await page.waitForSelector(this.selectors.updateWindow, { state: 'visible' });
      return await page.locator(this.selectors.updateWindow).textContent();
    },
  
    async createPostAsDraft(page, title, content) {
      await page.fill(this.selectors.titleInput, title);
      await page.fill(this.selectors.contentInput, content);
      await page.waitForTimeout(500);
      await page.click(this.selectors.buttonPostBackToMenu);
    },
  
    async isDraftSavedSuccessfully(page) {
      await page.waitForSelector(this.selectors.draftSelector, { state: 'visible' });
      return await page.textContent(this.selectors.draftSelector);
    },
  
    async unpublishedPost(page) {
      await page.click(this.selectors.postPublishedToEdit);
  
      await page.waitForSelector(this.selectors.titleInput, { state: 'visible' });
      await page.click(this.selectors.unpublishedButton);
  
      await page.waitForSelector(this.selectors.revertToDraftButton, { state: 'visible' });
      await page.click(this.selectors.revertToDraftButton);
      await page.waitForSelector(this.selectors.unpublishedNotification, { state: 'visible' });
    },
  
    async isRevertToDraftSuccess(page) {
      await page.waitForSelector(this.selectors.unpublishedNotification, { state: 'visible' });
      return await page.textContent(this.selectors.unpublishedNotification);
    },
  
    async previewPost(page, title, content) {
      await page.fill(this.selectors.titleInput, title);
      await page.fill(this.selectors.contentInput, content);
      await page.click(this.selectors.previewButton);
      await page.waitForTimeout(500);
    },
  
    async isPreviewSuccessful(page) {
      return await page.isVisible(this.selectors.previewTitlePost);
    },
    async reloadPage(driver) {
        await driver.refresh();
        await new Promise(resolve => setTimeout(resolve, 1000));
    },
    // Escenario 1
async unpublishedPost(driver, title, content) {
  // Navegar al post y abrir la página de edición del post
  const postTitleField = await driver.$(this.selectors.titleInput);
  await postTitleField.setValue(title);  // Establecer el título
  const contentField = await driver.$(this.selectors.contentInput);
  await contentField.setValue(content);  // Establecer el contenido
  
  const publishButton = await driver.$(this.selectors.publishButton);
  await publishButton.click();  // Publicar el post

  // Ahora revertir a borrador
  const revertButton = await driver.$(this.selectors.revertToDraftButton);
  await revertButton.click();  // Revertir a borrador
  const successMessage = await driver.$(this.selectors.unpublishedNotification);
  return successMessage.getText();  // Retornar el mensaje de éxito
},
// Escenario 2
async previewPost(driver, title, content) {
  const titleField = await driver.$(this.selectors.titleInput);
  await titleField.setValue(title);  // Establecer el título
  const contentField = await driver.$(this.selectors.contentInput);
  await contentField.setValue(content);  // Establecer el contenido

  // Hacer clic en el botón de vista previa
  const previewButton = await driver.$(this.selectors.previewButton);
  await previewButton.click();  // Abrir vista previa
  
  const previewTitle = await driver.$(this.selectors.previewTitlePost);
  return previewTitle.getText();  // Comprobar la vista previa
},
// Escenario 3
async createPostAsDraft(driver, title, content) {
  const titleField = await driver.$(this.selectors.titleInput);
  await titleField.setValue(title);  // Establecer el título
  const contentField = await driver.$(this.selectors.contentInput);
  await contentField.setValue(content);  // Establecer el contenido

  // Guardar el post como borrador
  const saveButton = await driver.$(this.selectors.updateButton);
  await saveButton.click();  // Guardar como borrador
  
  const draftSelector = await driver.$(this.selectors.draftSelector);
  return draftSelector.getText();  // Verificar que se guarda como borrador
},
};

  module.exports = postCreate;
  