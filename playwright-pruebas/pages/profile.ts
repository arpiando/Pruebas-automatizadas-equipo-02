import { Page } from '@playwright/test';

export class Profile {
    private page: Page;
    private ProfileSelector: string = 'svg.w3.mr1.fill-darkgrey';
    private YourProfileButton: string = '[data-test-nav="user-profile"]';
    private inputName: string = 'input#\\:r16\\:';
    private inputEmail: string = 'input#\\:r18\\:';
    private inputLocation: string = 'Location';
    private inputWebsite: string = 'Website';
    private inputFacebook: string = 'Facebook profile';
    private inputTwitter: string = 'X (formerly Twitter) profile';
    private inputBio: string = 'Bio';
    private saveButton: string = 'button:has-text("Save")';
    private profileName: string = 'h1.text-white.md\\:text-4xl';
    private ButtonFailure: string = 'button:has-text("Retry")';
    private facebookError: string = 'span.text-red';
  

    constructor(page: Page) {
        this.page = page;
      }
    
    async navigateToProfile(): Promise<void> {
        await this.page.click(this.ProfileSelector);
        await this.page.waitForSelector(this.YourProfileButton, { state: 'visible', timeout: 60000 });
        await this.page.click(this.YourProfileButton);
      }

    async editProfileName(name: string): Promise<void>{
        await this.page.waitForSelector(this.inputName, { state: 'visible' });
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

    async editProfileEmail(email: string): Promise<void>{
        await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
        await this.page.fill(this.inputEmail, email);

        await this.page.click(this.saveButton);
    }

    async ValidateEmailIsInvalid(): Promise<string | null> {
        await this.page.waitForSelector(this.ButtonFailure, { state: 'visible' });
        const successText = await this.page.locator(this.ButtonFailure).textContent();
        return successText
      }

    async editProfileLocation(location: string): Promise<void>{
        await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
        await this.page.getByLabel(this.inputLocation).fill(location);


        await this.page.click(this.saveButton);
    }

    async ValidateLocationIsInvalid(): Promise<string | null> {
      await this.page.waitForSelector(this.ButtonFailure, { state: 'visible' });
      const successText = await this.page.locator(this.ButtonFailure).textContent();
      return successText
    }

    async editProfileWebsite(location: string): Promise<void>{
      await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
      await this.page.getByLabel(this.inputWebsite).fill(location);

      await this.page.click(this.saveButton);
  }

  async ValidateWebsiteIsInvalid(): Promise<string | null> {
    await this.page.waitForSelector(this.ButtonFailure, { state: 'visible' });
    const successText = await this.page.locator(this.ButtonFailure).textContent();
    return successText
  }

  
  async editProfileFacebook(location: string): Promise<void>{
    await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
    await this.page.getByLabel(this.inputFacebook).fill(location);
    await this.page.click(this.inputName)

  }

  async ValidateFacebookIsInvalid(): Promise<string | null> {
    await this.page.waitForSelector(this.facebookError, { state: 'visible' });
    const successText = await this.page.locator(this.facebookError).textContent();
    return successText
  }

  async editProfileTwitter(location: string): Promise<void>{
    await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
    await this.page.getByLabel(this.inputTwitter).fill(location);
    await this.page.click(this.inputName)

  }

  async ValidateTwitterIsInvalid(): Promise<string | null> {
    await this.page.waitForSelector(this.facebookError, { state: 'visible' });
    const successText = await this.page.locator(this.facebookError).textContent();
    return successText
  }

  async editProfileBio(location: string): Promise<void>{
    await this.page.waitForSelector(this.inputName, { state: 'visible', timeout: 60000 });
    await this.page.getByLabel(this.inputBio).fill(location);
    await this.page.click(this.saveButton);
  }

  async ValidateBioIsInvalid(): Promise<string | null> {
    await this.page.waitForSelector(this.ButtonFailure, { state: 'visible' });
    const successText = await this.page.locator(this.ButtonFailure).textContent();
    return successText
  }

}