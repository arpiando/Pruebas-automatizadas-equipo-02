import { test, expect } from '@playwright/test';
import { PostCreatePage } from '../pages/post';
import { LoginPage } from '../pages/login';

test.describe('Crear un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de posts.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await postCreatePage.navigateToCreatePost();
  });

  test('CP001 - El usuario debería publicar un post exitosamente', async ({ page }) => {
    const postTitle = 'Nuevo Post de Prueba';
    const postContent = 'Este es el contenido de prueba para el nuevo post.';
    const successMessage = 'Boom! It\'s out there.';

    // When: El usuario crea un post y lo publica.
    await postCreatePage.createPost(postTitle, postContent);
    
    // Then: El sistema debe mostrar un mensaje de éxito al crear el post.
    const successHeader = await postCreatePage.isPostCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);
  });

  test('CP002 - El usuario debería guardar un post creado como borrador', async ({ page }) => {
    const postTitle = 'Borrador de Post';
    const postContent = 'Este es un borrador de post.';
    const draftText = 'Draft'
    
    // When: El usuario crea un post y no lo publica.
    await postCreatePage.createPostAsDraft(postTitle, postContent);
    
    // Then: El sistema debería mostrar que el post ha sido guardado como borrador.
    const draftConfirmation = await postCreatePage.isDraftSavedSuccessfully();
    expect(draftConfirmation?.trim()).toContain(draftText);
  });
});

test.describe('Modificar un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  const postTitle = 'Post de Prueba';
  const postContent = 'Este es el contenido de prueba.';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de posts.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await postCreatePage.navigateToCreatePost();

    // Y ha creado un post con anterioridad.
    await postCreatePage.createPost(postTitle, postContent);
    await postCreatePage.closeHeaderPost()
  });
  
  test('MP001 - El usuario debería modificar un post exitosamente', async ({ page }) => {
    const postTitleModified = 'Nuevo Titulo Modificado';
    const postContentModified = 'Este es el contenido modificado del post.';
    const successMessageModified = 'Post updated';

    // When: El usuario modifica el título y el contenido del post.
    await postCreatePage.EditPost(postTitleModified,postContentModified);

    // Then: El sistema debe mostrar un mensaje de éxito después de la modificación.
    const updateNotification = await postCreatePage.ConfirmPostIsUpdated()
    expect(updateNotification).toContain(successMessageModified);
  });

  test('MP002 - El usuario deberia revertir la publicacion de un post', async ({ page }) => {
    const unpublishedext = 'Post reverted to a draft.'

    // When: El usuario revierte el estatus de publicado del post.
    await postCreatePage.unpublishedPost()

    // Then: El sistema debe mostrar un mensaje de confirmacion.
    const unpublishedNotification = await postCreatePage.isRevertToDraftSuccess()
    expect(unpublishedNotification).toContain(unpublishedext);
  })
});

test.describe('Filtrar un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  const postTitle = 'Post de filtrado';
  const postContent = 'Este es el contenido de filtrado.';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de posts.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await postCreatePage.navigateToCreatePost();

    // Y ha creado un post con anterioridad.
    await postCreatePage.createPost(postTitle, postContent);
    await postCreatePage.closeHeaderPost()
  });
  //standby
  test('FP001 - El usuario debería poder filtrar posts.', async ({ page }) => {
    const filterText: string = 'published';

    // When: El usuario filtra por publicaciones publicadas.
    const filterTextContext = await postCreatePage.filterPost()

    // Then: El sistema debe mostrar los post publicados.
    expect(filterTextContext).toContain(filterText);
  });
});

