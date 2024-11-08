import { test, expect } from '@playwright/test';
import { PostCreatePage } from '../pages/post';
import { LoginPage } from '../pages/login';

test.describe('E004 Modificar un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  const postTitle = 'Post de Prueba';
  const postContent = 'Este es el contenido de prueba.';
  const successMessage = 'Boom! It\'s out there.';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);

    await loginPage.navigateTo();
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await postCreatePage.navigateToCreatePost();
    
    await postCreatePage.createPost(postTitle, postContent);
    
    const successHeader = await postCreatePage.isPostCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);

    await postCreatePage.closeHeaderPost()
  });

  test('El usuario debería poder modificar un post', async ({ page }) => {
    const postTitleModified = 'Nuevo Titulo Modificado';
    const postContentModified = 'Este es el contenido modificado del post.';
    const successMessage = 'Post updated';

    // Given: El usuario está autenticado y accede a un post existente para editarlo.
    await postCreatePage.ClickPostToEdit();

    // When: El usuario modifica el título y el contenido del post.
    await postCreatePage.EditPost(postTitleModified,postContentModified);

    // Then: El sistema debe mostrar un mensaje de éxito después de la modificación.
    const updateNotification = await postCreatePage.ConfirmPostIsUpdated()
    expect(updateNotification).toContain(successMessage);
  });
});
