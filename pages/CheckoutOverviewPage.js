import { CommonPage } from './CommonPage.js';

export class CheckoutOverviewPage extends CommonPage {
  constructor(page) {
    super(page);
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
