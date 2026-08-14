import { test, expect } from '../fixtures/test.fixture.js';

test.describe('Login', () => {
  test('Standar User inicia sesion y llega al inventario', async ({ loginPage, inventoryPage }) => {
    await loginPage.loginAs(process.env.STANDARD_USER, process.env.STANDARD_PASSWORD);

    await inventoryPage.expectLoaded(/inventory\.html/, 'Products');
  });

  test('Credenciales invalidas con su respectivo mensaje de error', async ({ loginPage }) => {
    await loginPage.loginAs(process.env.INVALID_USER, process.env.INVALID_PASSWORD);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
    await expect(loginPage.page).toHaveURL(/\/$/);
  });

  test('locked_out_user no puede ingresar y muestra el mensaje de bloqueo', async ({ loginPage }) => {
    await loginPage.loginAs(process.env.LOCKED_OUT_USER, process.env.STANDARD_PASSWORD);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
    await expect(loginPage.page).toHaveURL(/\/$/);
  });
});
