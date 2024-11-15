class PageCreate {
  constructor(driver) {
    this.driver = driver;
    this.pageMenuSelector = '[data-test-nav="pages"]';
    this.newPageButton = 'a.gh-btn.gh-btn-primary.view-actions-top-row:has-text("New page")';
    this.titleInput = '.gh-editor-title';
    this.contentInput = 'p[data-koenig-dnd-droppable="true"]';
    this.publishButton = '.gh-btn.gh-btn-editor.gh-publish-trigger';
    this.reviewButton = '[data-test-button="continue"]';
    this.confirmButton = '[data-test-button="confirm-publish"]';
    this.header = 'header.modal-header h1[data-test-complete-title] span';
    this.successMessage = 'Boom! It\'s out there.';
    this.headerCloseButton = '[data-test-button="close-publish-flow"]';
    this.Post = '.gh-posts-list-item-group';
    this.updateButton = '[data-test-button="publish-save"]';
    this.updateWindow = '.gh-notification-content';
    this.ButtonPageBackToMenu = '[data-test-link="pages"]';
    this.draftSelector = '.gh-content-entry-status .draft';
    this.PagePublishedToEdit = 'li[data-test-post-id][class*="gh-post-list-plain-status"] >> text="Published"';
    this.unpublishedButton = '[data-test-button="update-flow"]';
    this.reverteToDraftButton = '[data-test-button="revert-to-draft"]';
    this.unpublishedNotification = '[data-test-text="notification-content"]';
    this.PreviewButton = '[data-test-button="publish-preview"]';
    this.PreviewTitlePost = '.gh-browserpreview-browser';
  }

  async navigateToCreatePage() {
    await this.driver.click(this.pageMenuSelector);
    await this.driver.click(this.newPageButton);
  }

  async createPage(title, content) {
    await this.driver.waitForDisplayed(this.titleInput, { timeout: 5000 });
    await this.driver.setValue(this.titleInput, title);
    await this.driver.setValue(this.contentInput, content);

    await this.driver.click(this.publishButton);
    await this.driver.waitForDisplayed(this.reviewButton, { timeout: 60000 });
    await this.driver.click(this.reviewButton);

    await this.driver.waitForTimeout(500);
    await this.driver.waitForDisplayed(this.confirmButton, { timeout: 60000 });
    const isButtonEnabled = await this.driver.isEnabled(this.confirmButton);
    if (isButtonEnabled) {
      await this.driver.click(this.confirmButton, { timeout: 60000, force: true });
    }
  }

  async isPageCreatedSuccessfully() {
    await this.driver.waitForDisplayed(this.header, { timeout: 5000 });

    const successText = await this.driver.getText(this.header);
    return successText === this.successMessage;
  }

  async closeHeaderPage() {
    await this.driver.waitForDisplayed(this.headerCloseButton, { timeout: 5000 });
    await this.driver.click(this.headerCloseButton);
  }

  async EditPage(title, content) {
    await this.driver.waitForDisplayed(this.PagePublishedToEdit, { timeout: 5000 });
    await this.driver.click(this.PagePublishedToEdit);
    await this.driver.clearValue(this.titleInput);
    await this.driver.setValue(this.titleInput, title);

    await this.driver.clearValue(this.contentInput);
    await this.driver.setValue(this.contentInput, content);

    await this.driver.waitForDisplayed(this.updateButton, { timeout: 5000 });
    await this.driver.click(this.updateButton);
  }

  async ConfirmPageIsUpdated() {
    await this.driver.waitForDisplayed(this.updateWindow, { timeout: 5000 });
    const updateNotification = await this.driver.getText(this.updateWindow);
    return updateNotification;
  }

  async createPageAsDraft(title, content) {
    await this.driver.setValue(this.titleInput, title);
    await this.driver.setValue(this.contentInput, content);

    await this.driver.waitForTimeout(500);

    await this.driver.click(this.ButtonPageBackToMenu);
  }

  async isDraftSavedSuccessfully() {
    await this.driver.waitForDisplayed(this.draftSelector, { timeout: 5000 });

    const draftText = await this.driver.getText(this.draftSelector);
    return draftText;
  }

  async unpublishedPage() {
    await this.driver.waitForDisplayed(this.PagePublishedToEdit, { timeout: 5000 });
    await this.driver.click(this.PagePublishedToEdit);

    await this.driver.waitForDisplayed(this.titleInput, { timeout: 5000 });
    await this.driver.click(this.unpublishedButton);

    await this.driver.waitForDisplayed(this.reverteToDraftButton, { timeout: 5000 });
    await this.driver.click(this.reverteToDraftButton);
  }

  async isRevertToDraftSuccess() {
    await this.driver.waitForDisplayed(this.unpublishedNotification, { timeout: 5000 });

    const draftText = await this.driver.getText(this.unpublishedNotification);
    return draftText;
  }

  async PreviewPage(title, content) {
    await this.driver.waitForDisplayed(this.titleInput, { timeout: 5000 });
    await this.driver.setValue(this.titleInput, title);
    await this.driver.setValue(this.contentInput, content);
    await this.driver.waitForDisplayed(this.PreviewButton, { timeout: 5000 });
    await this.driver.click(this.PreviewButton);
    await this.driver.waitForTimeout(500);
  }

  async IsPreviewSuccessful() {
    const previewTitle = await this.driver.waitForDisplayed(this.PreviewTitlePost, { timeout: 5000 });
    return previewTitle !== null;
  }
}

module.exports = PageCreate;

