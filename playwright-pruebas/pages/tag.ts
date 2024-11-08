import { Page } from '@playwright/test';

export class Tag { 
    private page: Page;
    private tagMenuSelector: string = '[data-test-nav="tags"]';
    private newTagButton: string = 'a.gh-btn.gh-btn-primary:has-text("New tag")'
    private nameInputSelector: string = '[data-test-input="tag-name"]';
    private SaveTagButton: string = '[data-test-button="save"]';
    private tagNameSelector: string = '.gh-canvas-title';
    private TagSelector = 'a.gh-list-data.gh-tag-list-title.gh-list-cellwidth-70';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCreateTag(): Promise<void> {
        await this.page.click(this.tagMenuSelector);
    }

    async CreateNewTag(tagName: string): Promise<void>{
        await this.page.click(this.newTagButton);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});
        await this.page.fill(this.nameInputSelector,tagName);

        await this.page.click(this.SaveTagButton);
    }

    async confirmedNewTagIsCreated(): Promise<string | null> {
        await this.page.waitForSelector(this.tagNameSelector, {state: 'visible'});
        const tagName = await this.page.locator(this.tagNameSelector).textContent();
        return tagName;

    }

    async editTag(tagName: string):  Promise<void>{
        await this.page.click(this.TagSelector);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});
        await this.page.fill(this.nameInputSelector,'');
        await this.page.fill(this.nameInputSelector,tagName);

        await this.page.click(this.SaveTagButton);



    }


}