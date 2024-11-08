import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput = '.gh-input.email';
    private passwordInput = '.gh-input.password';
    private loginButton = '[data-test-button="sign-in"]';
    private selectorLogin: string = '.gh-nav-menu-details-sitetitle';
    private selectorEmailInvalid: string = '.main-error'
    
    private urlLogin: string = 'http://localhost:2368/ghost/#/signin';
    private userEmail: string = 'f.cucina@uniandes.edu.co';
    private password: string = 'panama2024';
    
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(): Promise<void> {
        await this.page.goto(this.urlLogin);
    }

    async login(userEmail?: string): Promise<void> {
        const email = userEmail || this.userEmail
        
        await this.page.fill(this.usernameInput, email);
        await this.page.fill(this.passwordInput, this.password);
        await this.page.click(this.loginButton);
    }

    async isLoginSuccessful(): Promise<boolean> {
        await this.page.waitForSelector(this.selectorLogin, { state: 'visible', timeout: 5000 });
        return this.page.isVisible(this.selectorLogin);
    }

    async isEmailInvalid() : Promise<string | null> {
        const errorMessageElement = await this.page.waitForSelector(this.selectorEmailInvalid, { state: 'visible' });
        const ErrorMessage = await errorMessageElement.textContent();
        return ErrorMessage;
    }
}
