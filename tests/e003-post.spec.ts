import { test, expect } from '@playwright/test';
import { PostCreatePage } from '../pages/post';
import { LoginPage } from '../pages/login';

test.describe('E003 Publicar un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    await loginPage.navigateTo();
    
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    
    expect(isLoggedIn).toBe(true);
  });

  test('El usuario deberia publicar un post', async ({ page }) => {
    const postTitle = 'Nuevo Post de Prueba';
    const postContent = 'Este es el contenido de prueba para el nuevo post.';
    const successMessage = 'Boom! It\'s out there.';

    // Given: El usuario está en la página de creación de post.
    await postCreatePage.navigateToCreatePost();
    
    // When: El usuario crea un post y lo publica.
    await postCreatePage.createPost(postTitle, postContent);
    
    // Then: El sistema debe mostrar un mensaje de éxito al crear el post.
    const successHeader = await postCreatePage.isPostCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);
  });
});
