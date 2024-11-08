import { test, expect } from '@playwright/test';
import { PageCreate } from '../pages/page';
import { LoginPage } from '../pages/login';

test.describe('E007 Modificar una pagina', () => {
  let Page: PageCreate;
  let loginPage: LoginPage;

  const postTitle = 'pagina de Prueba';
  const postContent = 'Este es el contenido de la pagina.';
  const successMessage = 'Boom! It\'s out there.';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    Page = new PageCreate(page);

    await loginPage.navigateTo();
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await Page.navigateToCreatePage();
    
    await Page.createPage(postTitle, postContent);
    
    const successHeader = await Page.isPageCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);

    await Page.closeHeaderPage()
  });

  test('El usuario debería poder modificar una pagina', async ({ page }) => {
    const postTitleModified = 'Nuevo Titulo Modificado de la pagina';
    const postContentModified = 'Este es el contenido modificado de la pagina.';
    const successMessage = 'Page updated';

    // Given: El usuario está autenticado y accede a una pagina existente para editarla.
    await Page.ClickPageToEdit();

    // When: El usuario modifica el título y el contenido de la pagina.
    await Page.EditPage(postTitleModified,postContentModified);

    // Then: El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.
    const updateNotification = await Page.ConfirmPageIsUpdated()
    expect(updateNotification).toContain(successMessage);
  });
});
