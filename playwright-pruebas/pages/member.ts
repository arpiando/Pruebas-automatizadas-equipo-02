import { Page } from '@playwright/test';

export class Member {
    private page: Page;
    private ButtonMember: string = '[data-test-nav="members"]';
    private ButtonNewMember: string = '[data-test-new-member-button="true"]';
    private InputName: string = '[data-test-input="member-name"]';
    private InputEmail: string = '[data-test-input="member-email"]';
    private InputNote: string = '[data-test-input="member-note"]';
    private ButtonSaveMember: string = '[data-test-button="save"]';
    private CreatedtextSelector: string = '.gh-member-details-attribution p';
    private MemberSelector: string = '.gh-members-list-name-container';
    private memberNameSelector: string = '.gh-members-list-name-container .gh-members-list-name';
    private ButtonFailure: string = '[data-test-button="save"] span[data-test-task-button-state="failure"]';
    private leaveButton: string = 'button.gh-btn.gh-btn-red[data-test-leave-button]';
    private memberActionsButton: string = '[data-test-button="member-actions"]';
    private deleteMemberButton: string = 'button[data-test-button="delete-member"]';
    private deleteButtonCofirmation: string = '[data-test-button="confirm"]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCreateMember(): Promise<void> {
        await this.page.click(this.ButtonMember);
    }

    
    async CreateNewMember(name: string, email: string, note: string): Promise<void>{
        await this.page.click(this.ButtonNewMember);

        await this.page.waitForSelector(this.InputName, {state: 'visible'});
        await this.page.fill(this.InputName,name);
        await this.page.fill(this.InputEmail,email);
        await this.page.fill(this.InputNote,note);

        await this.page.click(this.ButtonSaveMember);
        await this.page.waitForSelector(this.CreatedtextSelector, {state: 'visible',timeout:50000});
    }

    async ValidateMemberIsCreated(): Promise<string | null> {
        const createdText = await this.page.locator(this.CreatedtextSelector).textContent();
        return createdText;


    }

    async EditAMember(name: string, email?:string, note?:string): Promise<void>{
        await this.navigateToCreateMember();

        await this.page.click(this.MemberSelector);

        await this.page.waitForSelector(this.InputName, {state: 'visible'});
        await this.page.fill(this.InputName,'');
        await this.page.fill(this.InputName,name);

        if (email){
            await this.page.fill(this.InputEmail,'');
            await this.page.fill(this.InputEmail,email);
        }
        if(note){
            await this.page.fill(this.InputNote,'');
            await this.page.fill(this.InputNote,note);
        }

        await this.page.click(this.ButtonSaveMember);
        await this.page.waitForTimeout(500);

    }

    async ValidateMemberIsModified(): Promise<string | null>{
        await this.navigateToCreateMember();

        const memberName = await this.page.locator(this.memberNameSelector).first().textContent();
        return memberName;

    }

    async ValidateMemberIsInvalid(): Promise<string | null>{

        const memberName = await this.page.locator(this.ButtonFailure).textContent();
        return memberName;

    }

    async CreateMemberInvalid(name: string, email: string,note:string): Promise<void>{
        await this.page.click(this.ButtonNewMember);

        await this.page.waitForSelector(this.InputName, {state: 'visible'});
        await this.page.fill(this.InputName,name);
        await this.page.fill(this.InputEmail,email);
        await this.page.fill(this.InputNote,note);

        await this.page.click(this.ButtonSaveMember);
    }

    async navigateToMemberInvalid(): Promise<void> {
        await this.navigateToCreateMember();
        await this.page.click(this.leaveButton);
    }

    async deleteMember(): Promise<void> {
        await this.page.click(this.MemberSelector);

        await this.page.click(this.memberActionsButton);

        await this.page.waitForSelector(this.deleteMemberButton);

        await this.page.click(this.deleteMemberButton);

        await this.page.waitForSelector(this.deleteButtonCofirmation);

        await this.page.click(this.deleteButtonCofirmation);

    }
}