import { test, expect } from '@playwright/test';
import { PostCreatePage } from '../pages/post';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";

test.describe('Crear un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);

    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
    }
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de posts.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await postCreatePage.navigateToCreatePost();
    await page.screenshot({ path: beforePath });
  });

  test('CP001 - El usuario debería publicar un post exitosamente', async ({ page }) => {
    const postTitle = 'Nuevo Post de Prueba';
    const postContent = 'Este es el contenido de prueba para el nuevo post.';
    const successMessage = 'Boom! It\'s out there.';

    // When El usuario crea un post y lo publica.
    await postCreatePage.createPost(postTitle, postContent);
    
    // Then El sistema debe mostrar un mensaje de éxito al crear el post.
    const successHeader = await postCreatePage.isPostCreatedSuccessfully();
    expect(successHeader).toContain(successMessage);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));

  });

  test('CP002 - El usuario debería guardar un post creado como borrador', async ({ page }) => {
    const postTitle = 'Borrador de Post';
    const postContent = 'Este es un borrador de post.';
    const draftText = 'Draft'
    
    // When El usuario crea un post y no lo publica.
    await postCreatePage.createPostAsDraft(postTitle, postContent);
    
    // Then El sistema debería mostrar que el post ha sido guardado como borrador.
    const draftConfirmation = await postCreatePage.isDraftSavedSuccessfully();
    expect(draftConfirmation?.trim()).toContain(draftText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));

  });
});

test.describe('Modificar un post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);

    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
    }
  });

  const postTitle = 'Post de Prueba';
  const postContent = 'Este es el contenido de prueba.';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de posts.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await postCreatePage.navigateToCreatePost();

    // And ha creado un post con anterioridad.
    await postCreatePage.createPost(postTitle, postContent);
    await postCreatePage.closeHeaderPost()
    await page.screenshot({ path: beforePath });
  });
  
  test('MP001 - El usuario debería modificar un post exitosamente', async ({ page }) => {
    const postTitleModified = 'Nuevo Titulo Modificado';
    const postContentModified = 'Este es el contenido modificado del post.';
    const successMessageModified = 'Post updated';

    // When El usuario modifica el título y el contenido del post.
    await postCreatePage.EditPost(postTitleModified,postContentModified);

    // Then El sistema debe mostrar un mensaje de éxito después de la modificación.
    const updateNotification = await postCreatePage.ConfirmPostIsUpdated()
    expect(updateNotification).toContain(successMessageModified);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));

  });

  test('MP002 - El usuario deberia revertir la publicacion de un post', async ({ page }) => {
    const unpublishedext = 'Post reverted to a draft.'

    // When El usuario revierte el estatus de publicado del post.
    await postCreatePage.unpublishedPost()

    // Then El sistema debe mostrar un mensaje de confirmacion.
    const unpublishedNotification = await postCreatePage.isRevertToDraftSuccess()
    expect(unpublishedNotification).toContain(unpublishedext);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));

  })
});

test.describe('Preview post', () => {
  let postCreatePage: PostCreatePage;
  let loginPage: LoginPage;

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);

    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
    }
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    postCreatePage = new PostCreatePage(page);
    
    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de posts.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await postCreatePage.navigateToCreatePost();
    await page.screenshot({ path: beforePath });
  });

  test('PP001 - El usuario debería poder ver el preview del post', async ({ page }) => {
    const postTitle = 'Post de preview';
    const postContent = 'Este es el contenido de preview.';
  
    // When El usuario crea un post draft.
    await postCreatePage.PreviewPost(postTitle, postContent);
  
    // Then El usuario previsualiza la publicacion.
    const isPreviewSuccessful = await postCreatePage.IsPreviewSuccessful();
    expect(isPreviewSuccessful).toBe(true);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));

  });
  
});

