import { Page } from '@playwright/test';

export class Background {
  private page: Page;
  private buttonBackground: string = '.nightshift-toggle-container ';
  private darkModeClass: string = '.nightshift-toggle.on';
  private whiteModeClass: string = '.nightshift-toggle';

  constructor(page: Page) {
    this.page = page;
  }

  async GetCurrentState(): Promise<string> {
    await this.page.waitForSelector('body');
    const initialColor = await this.page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    return initialColor === 'rgb(19, 20, 22)' ? 'dark' : 'light';

  }

  async clickBackground(currentColor: string): Promise<'dark' | 'light'> {
  
    let currentColorSelector: string;
  
    if (currentColor === 'dark') {
      currentColorSelector = this.buttonBackground + this.darkModeClass;
    } else {
      currentColorSelector = this.buttonBackground + this.whiteModeClass;
    }
  
    await this.page.click(currentColorSelector);
  
    await this.page.waitForFunction(
      (initialColor) => window.getComputedStyle(document.body).backgroundColor !== initialColor,
      {},
      initialColor
    );
  
    const newColor = await this.page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
  
    return newColor === 'rgb(19, 20, 22)' ? 'dark' : 'light';
  }
}
