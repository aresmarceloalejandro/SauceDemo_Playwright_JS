import { CommonPage } from './CommonPage.js';

export class CartPage extends CommonPage {
  constructor(page) {
    super(page);
    this.checkoutButton = page.getByTestId('checkout');
    this.itemNames = page.getByTestId('inventory-item-name');
  }

  itemByName(productName) {
    return this.itemNames.filter({ hasText: productName });
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
