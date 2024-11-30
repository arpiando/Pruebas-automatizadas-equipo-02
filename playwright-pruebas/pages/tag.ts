import { Page } from '@playwright/test';

export class Tag { 
    private page: Page;
    private tagMenuSelector: string = '[data-test-nav="tags"]';
    private newTagButton: string = 'a.gh-btn.gh-btn-primary:has-text("New tag")'
    private nameInputSelector: string = '[data-test-input="tag-name"]';
    private SaveTagButton: string = '[data-test-button="save"]';
    private tagNameSelector: string = '.gh-canvas-title';
    private TagSelector = 'a.gh-list-data.gh-tag-list-title.gh-list-cellwidth-70';
    private ButtonFailure: string = '[data-test-button="save"] span[data-test-task-button-state="failure"]';
    private descriptionSelector: string = '[data-test-input="tag-description"]';
    private ColorSelector: string = '[data-test-input="accentColor"]';
    private leaveButton: string = 'button.gh-btn.gh-btn-red[data-test-leave-button]';
    private deleteButton: string = '[data-test-button="delete-tag"]';
    private deleteButtonCofirmation: string = '[data-test-button="confirm"]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCreateTag(): Promise<void> {
        await this.page.click(this.tagMenuSelector);
    }

    async CreateNewTag(tagName: string,description: string, colorhex?:string): Promise<void>{
        await this.page.click(this.newTagButton);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});
        await this.page.fill(this.nameInputSelector,tagName);
        await this.page.fill(this.descriptionSelector,description);

        if(colorhex){
            await this.page.fill(this.ColorSelector,colorhex);
        }

        await this.page.click(this.SaveTagButton);
        await this.page.waitForTimeout(500);
    }

    async confirmedNewTagIsCreated(): Promise<string | null> {
        await this.page.waitForSelector(this.tagNameSelector, {state: 'visible'});
        const tagName = await this.page.locator(this.tagNameSelector).textContent();
        return tagName;

    }

    async editTag(tagName: string, description:string, colorhex?:string):  Promise<void>{
        await this.navigateToCreateTag()
        await this.page.click(this.TagSelector);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});
        await this.page.fill(this.nameInputSelector,'');
        await this.page.fill(this.nameInputSelector,tagName);
        await this.page.fill(this.descriptionSelector,description);

        if(colorhex){
            await this.page.fill(this.ColorSelector,colorhex);
        }

        await this.page.click(this.SaveTagButton);
        await this.page.waitForTimeout(500);
    }
   
    async CreateInvalidTag(): Promise<void>{
        await this.page.click(this.TagSelector);

        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});

        await this.page.fill(this.nameInputSelector,'');
        
        await this.page.click(this.SaveTagButton);
    }

    async confirmedNewTagIsNotCreated(): Promise<string | null> {
        await this.page.waitForSelector(this.ButtonFailure, {state: 'visible'});
        const failureText = await this.page.locator(this.ButtonFailure).textContent();
        return failureText;
    }

    async navigateToCreateTagInvalid():  Promise<void>{
        await this.page.click(this.tagMenuSelector);
        await this.page.waitForSelector(this.leaveButton, {state: 'visible'});
        await this.page.click(this.leaveButton);
    }

    async deleteTag(): Promise<void>{
        await this.page.click(this.TagSelector);
        await this.page.waitForSelector(this.nameInputSelector, {state: 'visible'});
        await this.page.click(this.deleteButton);
        await this.page.waitForSelector(this.deleteButtonCofirmation, {state: 'visible'});
        await this.page.click(this.deleteButtonCofirmation);

    }
}