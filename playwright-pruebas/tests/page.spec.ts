import { test, expect } from '@playwright/test';
import { PageCreate } from '../pages/page';
import { LoginPage } from '../pages/login';

test.describe('Crear un pagina', () => {
  let Page: PageCreate;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    Page = new PageCreate(page);
    
    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de paginas.
    await loginPage.navigateToLoginPage();  
    await loginPage.login(); 
    const isLoggedIn = await loginPage.isLoginSuccessful(); 
    expect(isLoggedIn).toBe(true);
    await Page.navigateToCreatePage();
  });

  test('CP001 - El usuario deberia crear una pagina', async ({ page }) => {
    const postTitle = 'Nueva Pagina de Prueba';
    const postContent = 'Este es el contenido de prueba para la nueva pagina.';
    const successMessage = 'Boom! It\'s out there.';

    // When: El usuario crea una pagina y la publica.
    await Page.createPage(postTitle, postContent);
    
    // Then: El sistema debe mostrar un mensaje de éxito al crear la pagina.
    const successHeader = await Page.isPageCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);
  });

  test('CP002 - El usuario debería guardar una pagina creada como borrador', async ({ page }) => {
    const postTitle = 'Borrador de pagina';
    const postContent = 'Este es un borrador de pagina.';
    const draftText = 'Draft'
    
    // When: El usuario crea una pagina y no la publica.
    await Page.createPageAsDraft(postTitle, postContent);
    
    // Then: El sistema debería mostrar que la pagina ha sido guardada como borrador.
    const draftConfirmation = await Page.isDraftSavedSuccessfully();
    expect(draftConfirmation?.trim()).toContain(draftText);
  });
});

test.describe('Modificar una pagina', () => {
  let Page: PageCreate;
  let loginPage: LoginPage;

  const postTitle = 'pagina de Prueba';
  const postContent = 'Este es el contenido de la pagina.';
  const successMessage = 'Boom! It\'s out there.';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    Page = new PageCreate(page);

    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de paginas.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await Page.navigateToCreatePage();
    
    // Y crea una pagina exitosamente.
    await Page.createPage(postTitle, postContent);
    const successHeader = await Page.isPageCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);
    await Page.closeHeaderPage()
  });

  test('MP001 - El usuario debería poder modificar una pagina', async ({ page }) => {
    const postTitleModified = 'Nuevo Titulo Modificado de la pagina';
    const postContentModified = 'Este es el contenido modificado de la pagina.';
    const successMessage = 'Page updated';

    // When: El usuario modifica el título y el contenido de la pagina.
    await Page.EditPage(postTitleModified,postContentModified);

    // Then: El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.
    const updateNotification = await Page.ConfirmPageIsUpdated()
    expect(updateNotification).toContain(successMessage);
  });

  test('MP002 - El usuario deberia revertir la publicacion de una pagina', async ({ page }) => {
    const unpublishedext = 'Page reverted to a draft.'

    // When: El usuario revierte el estatus de publicado de la pagina.
    await Page.unpublishedPage()

    // Then: El sistema debe mostrar un mensaje de confirmacion.
    const unpublishedNotification = await Page.isRevertToDraftSuccess()
    expect(unpublishedNotification).toContain(unpublishedext);
  })
});

test.describe('Preview page', () => {
  let Page: PageCreate;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    Page = new PageCreate(page);
    
    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de paginas.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await Page.navigateToCreatePage();
  });

  test('PP001 - El usuario debería poder ver el preview de la pagina', async ({ page }) => {
    const postTitle = 'Pagina de preview';
    const postContent = 'Este es el contenido de preview.';
  
    // When: El usuario crea un post draft.
    await Page.PreviewPage(postTitle, postContent);
  
    // Then: El usuario previsualiza la publicacion.
    const isPreviewSuccessful = await Page.IsPreviewSuccessful();
    expect(isPreviewSuccessful).toBe(true);
  })
});