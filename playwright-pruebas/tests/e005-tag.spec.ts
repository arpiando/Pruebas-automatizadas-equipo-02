import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';

test.describe('E005 Crear una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  const tagName = 'Etiqueta de Prueba';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tagPage = new Tag(page);

    await loginPage.navigateTo();
    await loginPage.login();

    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
  });

  test('El usuario debería poder crear una nueva etiqueta', async ({ page }) => {
    // Given: El usuario está autenticado y en la página de administración de etiquetas.
    await tagPage.navigateToCreateTag();
    
    // When: El usuario crea una nueva etiqueta.
    await tagPage.CreateNewTag(tagName);

    // Then: El sistema debe mostrar que la etiqueta ha sido creada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
  });
});
