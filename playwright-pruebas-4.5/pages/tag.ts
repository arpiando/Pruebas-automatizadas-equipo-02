import { Page } from '@playwright/test';

export class Tag { 
    private page: Page;
    private tagMenuSelector: string = 'a:has-text("Tags")';
    private newTagButton: string = 'a:has-text("New tag")'
    private nameInputSelector: string = 'input.gh-input';
    private SaveTagButton: string = 'button:has-text("Save")';
    private tagNameSelector: string = '.gh-canvas-title';
    private TagSelector = 'a.gh-list-data.gh-tag-list-title.gh-list-cellwidth-70';
    private ButtonFailure: string = 'button:has-text("Retry")';

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
        await this.page.waitForTimeout(500);
    }

    async confirmedNewTagIsCreated(): Promise<string | null> {
        await this.page.waitForSelector(this.tagNameSelector, {state: 'visible'});
        const tagName = await this.page.locator(this.tagNameSelector).textContent();
        return tagName;

    }

    async editTag(tagName: string):  Promise<void>{
        await this.navigateToCreateTag()
        await this.page.click(this.TagSelector);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});
        await this.page.fill(this.nameInputSelector,'');
        await this.page.fill(this.nameInputSelector,tagName);

        await this.page.click(this.SaveTagButton);
        await this.page.waitForTimeout(500);
    }

    
    async CreateInvalidTag(): Promise<void>{
        await this.page.click(this.newTagButton);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});

        await this.page.click(this.SaveTagButton);
    }

    async confirmedNewTagIsNotCreated(): Promise<string | null> {
        await this.page.waitForSelector(this.ButtonFailure, {state: 'visible'});
        const failureText = await this.page.locator(this.ButtonFailure).textContent();
        return failureText;
    }
}