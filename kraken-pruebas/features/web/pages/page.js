class PageCreate {
  constructor(page) {
    this.page = page;
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
    await this.page.click(this.pageMenuSelector);
    await this.page.click(this.newPageButton);
  }

  async createPage(title, content) {
    await this.page.fill(this.titleInput, title);
    await this.page.fill(this.contentInput, content);

    await this.page.click(this.publishButton);
    await this.page.waitForSelector(this.reviewButton, { state: 'visible', timeout: 60000 });
    await this.page.click(this.reviewButton);

    await this.page.waitForTimeout(500);
    await this.page.waitForSelector(this.confirmButton, { state: 'attached', timeout: 60000 });
    await this.page.waitForSelector(this.confirmButton, { state: 'visible', timeout: 60000 });
    const isButtonEnabled = await this.page.isEnabled(this.confirmButton);
    if (isButtonEnabled) {
      await this.page.click(this.confirmButton, { timeout: 60000, force: true });
    }
  }

  async isPageCreatedSuccessfully() {
    await this.page.waitForSelector(this.header, { state: 'attached' });
    await this.page.waitForSelector(this.header, { state: 'visible' });

    const successText = await this.page.locator(this.header, { hasText: this.successMessage }).textContent();
    return successText;
  }

  async closeHeaderPage() {
    await this.page.waitForSelector(this.headerCloseButton, { state: 'visible' });
    await this.page.click(this.headerCloseButton);
  }

  async EditPage(title, content) {
    await this.page.click(this.PagePublishedToEdit);
    await this.page.fill(this.titleInput, '');
    await this.page.fill(this.titleInput, title);

    await this.page.fill(this.contentInput, '');
    await this.page.fill(this.contentInput, content);

    await this.page.isVisible(this.updateButton);
    await this.page.click(this.updateButton);
  }

  async ConfirmPageIsUpdated() {
    await this.page.waitForSelector(this.updateWindow, { state: 'visible' });
    const updateNotification = await this.page.locator(this.updateWindow).textContent();
    return updateNotification;
  }

  async createPageAsDraft(title, content) {
    await this.page.fill(this.titleInput, title);

    await this.page.fill(this.contentInput, content);

    await this.page.waitForTimeout(500);

    await this.page.click(this.ButtonPageBackToMenu);
  }

  async isDraftSavedSuccessfully() {
    await this.page.waitForSelector(this.draftSelector, { state: 'visible' });

    const draftText = await this.page.textContent(this.draftSelector);

    return draftText;
  }

  async unpublishedPage() {
    await this.page.click(this.PagePublishedToEdit);

    await this.page.waitForSelector(this.titleInput, { state: 'visible' });
    await this.page.click(this.unpublishedButton);

    await this.page.waitForSelector(this.reverteToDraftButton, { state: 'visible' });
    await this.page.click(this.reverteToDraftButton);
  }

  async isRevertToDraftSuccess() {
    await this.page.waitForSelector(this.unpublishedNotification, { state: 'visible' });

    const draftText = await this.page.textContent(this.unpublishedNotification);

    return draftText;
  }

  async PreviewPage(title, content) {
    await this.page.waitForSelector(this.titleInput, { state: 'visible' });
    await this.page.fill(this.titleInput, title);
    await this.page.fill(this.contentInput, content);
    await this.page.waitForSelector(this.PreviewButton, { state: 'visible' });
    await this.page.click(this.PreviewButton);
    await this.page.waitForTimeout(500);
  }

  async IsPreviewSuccessful() {
    const previewTitle = await this.page.waitForSelector(this.PreviewTitlePost, { state: 'visible' });
    return previewTitle !== null;
  }
}

module.exports = PageCreate;
