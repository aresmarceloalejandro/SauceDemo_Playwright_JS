import { CommonPage } from './CommonPage.js';

export class CheckoutCompletePage extends CommonPage {
  constructor(page) {
    super(page);
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}
