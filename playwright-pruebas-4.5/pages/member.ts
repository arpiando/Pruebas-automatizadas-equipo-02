import { Page } from '@playwright/test';

export class Member {
    private page: Page;
    private ButtonMember: string = 'a:has-text("Members")';
    private ButtonNewMember: string = 'a.gh-btn.gh-btn-primary';
    private InputName: string = 'input.gh-input';
    private InputEmail: string = 'input[name="email"]';
    private ButtonSaveMember: string = 'button:has-text("Save")';
    private CreatedtextSelector: string = 'p.nudge-bottom--2';
    private MemberSelector: string = 'a[title="Member details"]';
    private memberNameSelector: string = 'h3:has-text("Carlos Turks")';
    private ButtonFailure: string = 'button:has-text("Retry")';


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
        await this.page.waitForSelector(this.CreatedtextSelector, {state: 'visible',timeout:50000});
    }

    async ValidateMemberIsCreated(): Promise<string | null> {
        const createdText = await this.page.locator(this.CreatedtextSelector).textContent();
        return createdText;


    }

    async EditAMember(name: string): Promise<void>{
        await this.navigateToCreateMember();

        await this.page.click(this.MemberSelector);

        await this.page.waitForSelector(this.InputName, {state: 'visible'});
        await this.page.fill(this.InputName,'');
        await this.page.fill(this.InputName,name);

        await this.page.click(this.ButtonSaveMember);

    }

    async ValidateMemberIsModified(): Promise<string | null>{
        await this.navigateToCreateMember();

        const memberName = await this.page.locator(this.memberNameSelector).first().textContent();
        return memberName;

    }

    async ValidateMemberIsInvalid(): Promise<string | null>{
        await this.navigateToCreateMember();

        const memberName = await this.page.locator(this.ButtonFailure).textContent();
        return memberName;

    }

    async CreateMemberInvalid(name: string, email: string): Promise<void>{
        await this.page.click(this.ButtonNewMember);

        await this.page.waitForSelector(this.InputName, {state: 'visible'});
        await this.page.fill(this.InputName,name);
        await this.page.fill(this.InputEmail,email);

        await this.page.click(this.ButtonSaveMember);
    }
}