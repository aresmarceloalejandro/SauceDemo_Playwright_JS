import { expect } from '@playwright/test';

export class CommonPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
  }

  async expectLoaded(urlPattern, titleText) {
    await expect(this.page).toHaveURL(urlPattern);
    await expect(this.title).toHaveText(titleText);
  }
}
