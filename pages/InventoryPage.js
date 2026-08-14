import { CommonPage } from './CommonPage.js';

export class InventoryPage extends CommonPage {
  constructor(page) {
    super(page);
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.backpackName = 'Sauce Labs Backpack';
    this.addBackpackButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
