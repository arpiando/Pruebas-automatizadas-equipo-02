import { Page } from '@playwright/test';

export class PageCreate {
  private page: Page;
  private pageMenuSelector: string = '[data-test-nav="pages"]';
  private newPageButton: string = 'a.gh-btn.gh-btn-primary.view-actions-top-row:has-text("New page")';
  private titleInput: string = '.gh-editor-title';
  private contentInput: string = 'p[data-koenig-dnd-droppable="true"]';
  private publishButton: string = '.gh-btn.gh-btn-editor.gh-publish-trigger';
  private reviewButton: string = '[data-test-button="continue"]';
  private confirmButton: string = '[data-test-button="confirm-publish"]';
  private header: string = 'header.modal-header h1[data-test-complete-title] span';
  private successMessage: string = 'Boom! It\'s out there.';
  private headerCloseButton: string = '[data-test-button="close-publish-flow"]';
  private Post: string = '.gh-posts-list-item-group'
  private updateButton: string = '[data-test-button="publish-save"]'
  private updateWindow: string = '.gh-notification-content'

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCreatePage(): Promise<void> {
    await this.page.click(this.pageMenuSelector);
    await this.page.click(this.newPageButton);
  }

  async createPage(title: string, content: string): Promise<void> {
    await this.page.fill(this.titleInput, title);
    await this.page.fill(this.contentInput, content);
    
    await this.page.click(this.publishButton);
    await this.page.waitForSelector(this.reviewButton, { state: 'visible', timeout: 60000 });
    await this.page.click(this.reviewButton);
    
    await this.page.waitForSelector(this.confirmButton, { state: 'attached', timeout: 60000 });
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector(this.confirmButton, { state: 'visible', timeout: 60000 });

    const buttonBoundingBox = await this.page.locator(this.confirmButton).boundingBox();
    if (!buttonBoundingBox) {
      throw new Error('Confirm button is not visible in the viewport');
    }

    const isElementClickable = await this.page.isVisible(this.confirmButton);
    if (!isElementClickable) {
      throw new Error('Confirm button is not clickable');
    }
    
    await this.page.click(this.confirmButton, { timeout: 60000});
  }

  async isPageCreatedSuccessfully(): Promise<string | null> {
    await this.page.waitForSelector(this.header, { state: 'attached' });
    await this.page.waitForSelector(this.header, { state: 'visible' });
    
    const successText = await this.page.locator(this.header, { hasText: this.successMessage }).textContent();
    return successText
  }

  async closeHeaderPage(): Promise<void> {
    await this.page.waitForSelector(this.headerCloseButton, { state: 'visible' });
    await this.page.click(this.headerCloseButton);
  }

  async ClickPageToEdit(): Promise<void>{
    await this.page.click(this.Post);
    await this.page.waitForSelector(this.titleInput, { state: 'visible' });
    await this.page.waitForSelector(this.contentInput, { state: 'visible' });

  }

  async EditPage(title: string, content: string): Promise<void>{
    await this.page.fill(this.titleInput, '');
    await this.page.fill(this.titleInput, title);

    await this.page.fill(this.contentInput, '');
    await this.page.fill(this.contentInput, content);

    await this.page.isVisible(this.updateButton);
    await this.page.click(this.updateButton);

  }
  async ConfirmPageIsUpdated(): Promise<string | null> { 
    await this.page.waitForSelector(this.updateWindow, { state: 'visible' });
    const updateNotification = await this.page.locator(this.updateWindow).textContent();
    return updateNotification;
  }
}