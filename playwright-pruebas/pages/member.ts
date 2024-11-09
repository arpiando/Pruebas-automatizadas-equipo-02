import { Page } from '@playwright/test';

export class Member {
    private page: Page;
    private ButtonMember: string = '[data-test-nav="members"]';
    private ButtonNewMember: string = '[data-test-new-member-button="true"]';
    private InputName: string = '[data-test-input="member-name"]';
    private InputEmail: string = '[data-test-input="member-email"]';
    private ButtonSaveMember: string = '[data-test-button="save"]';
    private CreatedtextSelector: string = '.gh-member-details-attribution p';


    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCreateMember(): Promise<void> {
        await this.page.click(this.ButtonMember);
    }

    
    async CreateNewMember(name: string, email: string): Promise<void>{
        await this.page.click(this.ButtonNewMember);

        await this.page.waitForSelector(this.InputName, {state: 'visible'});
        await this.page.fill(this.InputName,name);
        await this.page.fill(this.InputEmail,email);

        await this.page.click(this.ButtonSaveMember);
    }

    async ValidateMemberIsCreated(): Promise<string | null> {

        await this.page.waitForSelector(this.CreatedtextSelector, {state: 'visible'});
        const createdText = await this.page.locator('.gh-member-details-attribution p').textContent();
        return createdText;


    }


}