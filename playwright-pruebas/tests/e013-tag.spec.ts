import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';

test.describe('E013 creacion de un tag invalido', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tagPage = new Tag(page);

    await loginPage.navigateTo();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
  });

  test('El usuario debería poder modificar una etiqueta', async ({ page }) => {
    const failureText = 'Retry';
    // Given: El usuario está autenticado y en la página de administración de etiquetas.
    await tagPage.navigateToCreateTag();
    
    // When: El usuario trata de crear una etiqueta invalida.
    await tagPage.CreateInvalidTag();

    // Then: El sistema impide la creacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
  });
});
