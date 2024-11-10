import { Page } from '@playwright/test';

export class PostCreatePage {
  private page: Page;
  private postSelector: string = '.gh-nav-new-post';
  private titleInput: string = '.gh-editor-title';
  private contentInput: string = 'p[data-koenig-dnd-droppable="true"]';
  private publishButton: string = '.gh-btn.gh-btn-editor.gh-publish-trigger';
  private reviewButton: string = '[data-test-button="continue"]';
  private confirmButton: string = '[data-test-button="confirm-publish"]';
  private header: string = 'header.modal-header h1[data-test-complete-title] span';
  private successMessage: string = 'Boom! It\'s out there.';
  private headerCloseButton: string = '[data-test-button="close-publish-flow"]';
  private updateButton: string = '[data-test-button="publish-save"]'
  private updateWindow: string = '.gh-notification-content'
  private ButtonPostBackToMenu: string = '[data-test-link="posts"]';
  private draftSelector: string = '.gh-content-entry-status .draft';
  private PostPublishedToEdit: string = 'li[data-test-post-id][class*="gh-post-list-plain-status"] >> text="Published"';
  private ButtonAllPosts: string = 'div.gh-contentfilter-menu-trigger';
  private ButtonPublishedPosts: string = 'li.ember-power-select-option[id="ember1636-2"]';
  private publishedSelector: string = '.gh-content-entry-status .published';
  private postButton: string = '[data-test-nav="posts"]';


  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCreatePost(): Promise<void> {
    await this.page.click(this.postSelector);
  }

  async createPost(title: string, content: string): Promise<void> {
    await this.page.fill(this.titleInput, title);
    await this.page.fill(this.contentInput, content);
    
    await this.page.click(this.publishButton);
    await this.page.waitForSelector(this.reviewButton, { state: 'visible', timeout: 60000 });
    await this.page.click(this.reviewButton);
    
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector(this.confirmButton, { state: 'attached', timeout: 60000 });
    await this.page.waitForSelector(this.confirmButton, { state: 'visible', timeout: 60000 });
    await this.page.click(this.confirmButton, { timeout: 60000});
  }

  async isPostCreatedSuccessfully(): Promise<string | null> {
    await this.page.waitForSelector(this.header, { state: 'attached' });
    await this.page.waitForSelector(this.header, { state: 'visible' });
    
    const successText = await this.page.locator(this.header, { hasText: this.successMessage }).textContent();
    return successText
  }

  async closeHeaderPost(): Promise<void> {
    await this.page.waitForSelector(this.headerCloseButton, { state: 'visible' });
    await this.page.click(this.headerCloseButton);
  }

  async EditPost(title: string, content: string): Promise<void>{

    await this.page.click(this.PostPublishedToEdit);
    await this.page.waitForSelector(this.titleInput, { state: 'visible' });
    await this.page.waitForSelector(this.contentInput, { state: 'visible' });

    await this.page.fill(this.titleInput, '');
    await this.page.fill(this.titleInput, title);

    await this.page.fill(this.contentInput, '');
    await this.page.fill(this.contentInput, content);

    await this.page.isVisible(this.updateButton);
    await this.page.click(this.updateButton);

  }
  async ConfirmPostIsUpdated(): Promise<string | null> { 
    await this.page.waitForSelector(this.updateWindow, { state: 'visible' });
    const updateNotification = await this.page.locator(this.updateWindow).textContent();
    return updateNotification;
  }

  async createPostAsDraft(title: string, content: string): Promise<void>{
    await this.page.fill(this.titleInput, title);

    await this.page.fill(this.contentInput, content);

    await this.page.waitForTimeout(500);

    await this.page.click(this.ButtonPostBackToMenu);
  }

  async isDraftSavedSuccessfully():  Promise<string | null>{
    await this.page.waitForSelector(this.draftSelector, { state: 'visible' });

    const draftText = await this.page.textContent(this.draftSelector);

    return draftText;
  }

  async filterPost():  Promise<string | null> {  
   await this.page.click(this.postButton);

   //await this.page.waitForSelector(this.ButtonAllPosts, { state: 'visible' });

   await this.page.click(this.ButtonAllPosts);

   //await this.page.waitForSelector(this.ButtonPublishedPosts, { state: 'visible' });

   await this.page.locator(this.ButtonPublishedPosts).click();

   const publishedText = await this.page.textContent(this.publishedSelector);

   return publishedText;

  }
}
