import { Page } from '@playwright/test';

export class Profile {
    private page: Page;
    private ProfileSelector: string = 'svg.w3.mr1.fill-darkgrey';
    private YourProfileButton: string = '[data-test-nav="user-profile"]';
    private inputName: string = 'input#\\:r16\\:';
    private saveButton: string = 'button:has-text("Save")';
    private profileName: string = 'h1.text-white.md\\:text-4xl';

    constructor(page: Page) {
        this.page = page;
      }
    
    async navigateToProfile(): Promise<void> {
        await this.page.click(this.ProfileSelector);
        await this.page.waitForSelector(this.YourProfileButton, { state: 'visible', timeout: 60000 });
        await this.page.click(this.YourProfileButton);
      }

    async editProfileName(name: string): Promise<void>{
        await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
        await this.page.fill(this.inputName, '');
        await this.page.fill(this.inputName, name);

        await this.page.click(this.saveButton);
    }

    async isProfileModified(): Promise<string | null> {
        await this.page.waitForSelector(this.profileName, { state: 'visible' });
        await this.page.waitForTimeout(500);
        const successText = await this.page.locator(this.profileName).textContent();
        return successText
      }
}