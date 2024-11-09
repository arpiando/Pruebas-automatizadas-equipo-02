import { Page } from '@playwright/test';

export class Background {
  private page: Page;
  private buttonBackgroundWhite: string = '.nightshift-toggle';
  private buttonBackgroundBlack: string = '.nightshift-toggle.on';

  constructor(page: Page) {
    this.page = page;
  }

  async clickBackgroundThemeDark(): Promise<boolean> {
    await this.page.click(this.buttonBackgroundWhite);

    await this.page.waitForSelector(this.buttonBackgroundBlack, {state: 'visible'});

    const isDarkModeActive = await this.page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)';
    });

    return isDarkModeActive;
  }

  async clickBackgroundThemeLight(): Promise<boolean> {
    await this.page.click(this.buttonBackgroundBlack);

    await this.page.waitForSelector(this.buttonBackgroundWhite, {state: 'visible'});

    const isLightModeActive = await this.page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)';
    });

    return isLightModeActive;
  }
}
