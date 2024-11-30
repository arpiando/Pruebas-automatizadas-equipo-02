import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';
import { fetchMockarooData } from "../index.js"

test.describe('Crear una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  let mockarooData = [];

  test.beforeAll(async ({ browserName }, testInfo) => {
    mockarooData = await fetchMockarooData();
    if (!mockarooData || mockarooData.length === 0) {
      throw new Error("No se pudieron obtener datos de Mockaroo");
    }
  });

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
    const tagName = mockarooData[0].first_name;
    const tagDescription = mockarooData[0].note;
    
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

  let mockarooData = [];

  test.beforeAll(async ({ browserName }, testInfo) => {
    mockarooData = await fetchMockarooData();
    if (!mockarooData || mockarooData.length === 0) {
      throw new Error("No se pudieron obtener datos de Mockaroo");
    }
  });

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
    const tagName = mockarooData[1].nombre_vacio;
    const tagDescription = mockarooData[1].note;
    const failureText = 'Retry';

    // When El usuario ingresa el nombre vacio.
    await tagPage.editTag(tagName,tagDescription);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });

  test('ME002 - El usuario No debería poder modificar una etiqueta con nombre muy largo', async ({ page }) => {
    const tagName = mockarooData[2].first_name.repeat(20);
    const tagDescription = mockarooData[2].note;
    const failureText = 'Retry';

    // When El usuario ingresa un nombre muy largo.
    await tagPage.editTag(tagName,tagDescription);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });

  test('ME003  - El usuario No debería poder modificar una etiqueta con descripcion muy larga', async ({ page }) => {
    const tagName = mockarooData[3].first_name;
    const tagDescription = mockarooData[3].note_larga;
    const failureText = 'Retry';

    // When El usuario ingresa una descripcion muy larga.
    await tagPage.editTag(tagName,tagDescription);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });

  test('ME004 - El usuario No debería poder modificar una etiqueta con color invalido', async ({ page }) => {
    const tagName = mockarooData[4].first_name;
    const tagDescription = mockarooData[4].note;
    const tagColor = mockarooData[4].color;
    const failureText = 'Retry';

    // When El usuario ingresa un color invalido.
    await tagPage.editTag(tagName,tagDescription,tagColor);

    // Then El sistema impide la modificacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await tagPage.navigateToCreateTagInvalid();
  });
});

