import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';

test.describe('E009 Modificar una etiqueta (tag)', () => {
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

    await tagPage.navigateToCreateTag();
    await tagPage.CreateNewTag(tagName);
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
  });

  test('El usuario debería poder modificar una etiqueta', async ({ page }) => {
    const TagModified: string = 'Tag Modificado';
    // Given: El usuario está autenticado y en la página de administración de etiquetas.
    await tagPage.navigateToCreateTag();
    
    // When: El usuario modifica una etiqueta.
    await tagPage.editTag(TagModified);

    // Then: El sistema debe mostrar que la etiqueta ha sido modificada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(TagModified);
  });
});
