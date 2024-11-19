import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";

const jsonString = fs.readFileSync('datos/data_tag.json', 'utf8');
const data = JSON.parse(jsonString);

test.describe('Crear una etiqueta (tag)', () => {
  let tagPage: Tag;
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
    tagPage = new Tag(page);

    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección de creación de tags.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await tagPage.navigateToCreateTag();
    await page.screenshot({ path: beforePath });
  });

  test('CE001 - El usuario debería poder crear una nueva etiqueta exitosamente', async ({ page }) => {
    const tagName = data[0].name;
    const tagDescription = data[0].description
    
    // When El usuario crea una nueva etiqueta.
    await tagPage.CreateNewTag(tagName,tagDescription);

    // Then El sistema debe mostrar que la etiqueta ha sido creada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('CE002 - El usuario No debería poder crear una etiqueta con nombre vacio', async ({ page }) => {
    const tagName = data[1].name;
    const tagDescription = data[1].description
    const failureText = 'Retry';

    // When El usuario trata de crear una etiqueta invalida.
    await tagPage.CreateNewTag(tagName,tagDescription);

    // Then El sistema impide la creacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('CE003 - El usuario No debería poder crear una etiqueta con nombre muy largo', async ({ page }) => {
    const tagName = data[2].name;
    const tagDescription = data[2].description
    const failureText = 'Retry';

    // When El usuario trata de crear una etiqueta invalida.
    await tagPage.CreateNewTag(tagName,tagDescription);

    // Then El sistema impide la creacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('CE004 - El usuario No debería poder crear una etiqueta con descripcion muy larga', async ({ page }) => {
    const tagName = data[3].name;
    const tagDescription = data[3].description
    const failureText = 'Retry';

    // When El usuario trata de crear una etiqueta invalida.
    await tagPage.CreateNewTag(tagName,tagDescription);

    // Then El sistema impide la creacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('CE005 - El usuario No debería poder crear una etiqueta con color invalido', async ({ page }) => {
    const tagName = data[4].name;
    const tagDescription = data[4].description
    const tagColor = data[4].color
    const failureText = 'Retry';

    // When El usuario trata de crear una etiqueta invalida.
    await tagPage.CreateNewTag(tagName,tagDescription,tagColor);

    // Then El sistema impide la creacion de la etiqueta.
    const createdTagNameInvalid = await tagPage.confirmedNewTagIsNotCreated();
    expect(createdTagNameInvalid).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});

test.describe('Modificar una etiqueta (tag)', () => {
  let tagPage: Tag;
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

  const tagName = 'Etiqueta de Prueba';

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
    //await tagPage.CreateNewTag(tagName);
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName).toContain(tagName);
    await page.screenshot({ path: beforePath });
  });

  test('ME001 - El usuario debería poder modificar una etiqueta', async ({ page }) => {
    const TagModified: string = 'Tag Modificado';
    
    // When El usuario modifica una etiqueta.
    await tagPage.editTag(TagModified);

    // Then El sistema debe mostrar que la etiqueta ha sido modificada.
    const createdTagName = await tagPage.confirmedNewTagIsCreated();
    expect(createdTagName?.trim()).toContain(TagModified);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});

