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
  
    async editPost(driver, titulo, contenido) {
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

    const success = await driver.$('//span[contains(text(), "Posts")]');
    await success.waitForDisplayed({ timeout: 5000 });
    await success.click();
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

    async unpublishedPost(driver) {
      const navigate=await driver.$('//span[contains(text(), " Published")]');
      await navigate.waitForDisplayed({ timeout: 5000 });
      await navigate.click();

      const unpublishButton = await driver.$('button.gh-btn gh-btn-editor.darkgrey.gh-unpublish-trigger');
      await unpublishButton.waitForDisplayed({ timeout: 5000 });
      await unpublishButton.click();

      const unpublishText = await driver.$('//span[contains(text(), "Unpublish and revert to private draft →")]');
      await unpublishText.waitForDisplayed({ timeout: 5000 });
      await unpublishText.click()
    },

    async isRevertToDraftSuccess(driver) {
      const success = await driver.$('//span[contains(text(), "Posts")]');
      await success.waitForDisplayed({ timeout: 5000 });
      await success.click();
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
};

  module.exports = postCreate;