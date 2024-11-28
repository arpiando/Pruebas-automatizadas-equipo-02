import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';
import fs from 'fs';

const jsonString = fs.readFileSync('datos/data_tag.json', 'utf8');
const data = JSON.parse(jsonString);

test.describe('Crear una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tagPage = new Tag(page);

    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de tags.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await tagPage.navigateToCreateTag();
  });

  test.afterEach(async ({})=>{
    await tagPage.deleteTag()
  })

  test('CE001 - El usuario debería poder crear una nueva etiqueta exitosamente', async ({ page }) => {
    const tagName = data[0].name;
    const tagDescription = data[0].description
    
    // When El usuario crea una nueva etiqueta.
    await tagPage.CreateNewTag(tagName,tagDescription);

    // Then El sistema debe mostrar que la etiqueta ha sido creada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
    await tagPage.navigateToCreateTag();
  });
});

test.describe('Modificar una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  const tagName = 'Etiqueta de Prueba';
  const description = 'This is a description';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tagPage = new Tag(page);

    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de tags.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await tagPage.navigateToCreateTag();

    // And crea un tag exitosamente.
    await tagPage.CreateNewTag(tagName,description);
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
  });

  test.afterEach(async ({})=>{
    await tagPage.deleteTag()
  })

  test('ME001 - El usuario No debería poder modificar una etiqueta con nombre vacio', async ({ page }) => {
    const tagName = data[1].name;
    const tagDescription = data[1].description
    const failureText = 'Retry';

    // When El usuario ingresa el nombre vacio.
    await tagPage.editTag(tagName,tagDescription);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });

  test('ME002 - El usuario No debería poder modifica una etiqueta con nombre muy largo', async ({ page }) => {
    const tagName = data[2].name;
    const tagDescription = data[2].description
    const failureText = 'Retry';

    // When El usuario ingresa un nombre muy largo.
    await tagPage.editTag(tagName,tagDescription);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });

  test('ME003 - El usuario No debería poder modificar una etiqueta con descripcion muy larga', async ({ page }) => {
    const tagName = data[3].name;
    const tagDescription = data[3].description
    const failureText = 'Retry';

    // When El usuario ingresa una descripcion muy larga.
    await tagPage.editTag(tagName,tagDescription);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });

  test('ME004 - El usuario No debería poder modificar una etiqueta con color invalido', async ({ page }) => {
    const tagName = data[4].name;
    const tagDescription = data[4].description
    const tagColor = data[4].color
    const failureText = 'Retry';

    // When El usuario ingresa un color invalido.
    await tagPage.editTag(tagName,tagDescription,tagColor);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });
});