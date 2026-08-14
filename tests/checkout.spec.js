import { test, expect } from '../fixtures/test.fixture.js';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.loginAs(process.env.STANDARD_USER, process.env.STANDARD_PASSWORD);
    await inventoryPage.expectLoaded(/inventory\.html/, 'Products');
  });

  test('Happy Path: Compra de un producto', async ({
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();

    await cartPage.expectLoaded(/cart\.html/, 'Your Cart');
    await expect(cartPage.itemByName(inventoryPage.backpackName)).toBeVisible();
    await cartPage.goToCheckout();

    await checkoutInfoPage.expectLoaded(/checkout-step-one\.html/, 'Checkout: Your Information');
    await checkoutInfoPage.cancel();
    await cartPage.expectLoaded(/cart\.html/, 'Your Cart');
    await cartPage.goToCheckout();

    await checkoutInfoPage.expectLoaded(/checkout-step-one\.html/, 'Checkout: Your Information');
    await checkoutInfoPage.fillCustomerInfo({
      firstName: 'Ana',
      lastName: 'Garcia',
      postalCode: 'C1000',
    });
    await checkoutInfoPage.continueToOverview();

    await checkoutOverviewPage.expectLoaded(/checkout-step-two\.html/, 'Checkout: Overview');
    await expect(checkoutOverviewPage.itemNames).toHaveText(inventoryPage.backpackName);
    await checkoutOverviewPage.finishOrder();

    await checkoutCompletePage.expectLoaded(/checkout-complete\.html/, 'Checkout: Complete!');
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');

    await checkoutCompletePage.backHome();
    await inventoryPage.expectLoaded(/inventory\.html/, 'Products');
  });

  test('Checkout con campos vacios muestra error de First Name requerido', async ({
    inventoryPage,
    cartPage,
    checkoutInfoPage,
  }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.goToCheckout();

    await checkoutInfoPage.expectLoaded(/checkout-step-one\.html/, 'Checkout: Your Information');
    await checkoutInfoPage.continueToOverview();

    await expect(checkoutInfoPage.errorMessage).toBeVisible();
    await expect(checkoutInfoPage.errorMessage).toHaveText('Error: First Name is required');
    await expect(checkoutInfoPage.page).toHaveURL(/checkout-step-one\.html/);
  });
});
