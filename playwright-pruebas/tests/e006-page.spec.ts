import { test, expect } from '@playwright/test';
import { PageCreate } from '../pages/page';
import { LoginPage } from '../pages/login';

test.describe('E006 Publicar un pagina', () => {
  let Page: PageCreate;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    Page = new PageCreate(page);
    
    await loginPage.navigateTo();
    
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    
    expect(isLoggedIn).toBe(true);
  });

  test('El usuario deberia publicar un post', async ({ page }) => {
    const postTitle = 'Nueva Pagina de Prueba';
    const postContent = 'Este es el contenido de prueba para la nueva pagina.';
    const successMessage = 'Boom! It\'s out there.';

    // Given: El usuario está en la página de creación de una pagina.
    await Page.navigateToCreatePage();
    
    // When: El usuario crea una pagina y la publica.
    await Page.createPage(postTitle, postContent);
    
    // Then: El sistema debe mostrar un mensaje de éxito al crear la pagina.
    const successHeader = await Page.isPageCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);
  });
});
