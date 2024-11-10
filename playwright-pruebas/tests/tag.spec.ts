import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';

test.describe('Crear una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tagPage = new Tag(page);

    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de tags.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await tagPage.navigateToCreateTag();
  });

  test('CE001 - El usuario debería poder crear una nueva etiqueta', async ({ page }) => {
    const tagName = 'Etiqueta de Prueba';
    
    // When: El usuario crea una nueva etiqueta.
    await tagPage.CreateNewTag(tagName);

    // Then: El sistema debe mostrar que la etiqueta ha sido creada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
  });

  test('CE002 - El usuario No debería poder modificar una etiqueta con datos invalidos', async ({ page }) => {
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

test.describe('Modificar una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  const tagName = 'Etiqueta de Prueba';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tagPage = new Tag(page);

    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de tags.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await tagPage.navigateToCreateTag();

    // Y crea un tag exitosamente.
    await tagPage.CreateNewTag(tagName);
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
  });

  test('ME001 - El usuario debería poder modificar una etiqueta', async ({ page }) => {
    const TagModified: string = 'Tag Modificado';
    
    // When: El usuario modifica una etiqueta.
    await tagPage.editTag(TagModified);

    // Then: El sistema debe mostrar que la etiqueta ha sido modificada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(TagModified);
  });
});

