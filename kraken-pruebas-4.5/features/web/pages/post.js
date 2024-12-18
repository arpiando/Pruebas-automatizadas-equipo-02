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
    }
  };
  
  module.exports = postCreate;
  