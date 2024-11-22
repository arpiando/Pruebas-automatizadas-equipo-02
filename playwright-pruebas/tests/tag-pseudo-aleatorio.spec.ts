import { test, expect } from '@playwright/test';
import { Tag } from '../pages/tag';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";
import { fetchMockarooData } from "../index.js"

test.describe('Crear una etiqueta (tag)', () => {
  let tagPage: Tag;
  let loginPage: LoginPage;

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  let mockarooData = [];

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);

    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
    }

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
    await page.screenshot({ path: beforePath });
  });

  test('CE001 - El usuario debería poder crear una nueva etiqueta exitosamente', async ({ page }) => {
    const tagName = mockarooData[0].first_name;
    const tagDescription = mockarooData[0].note;
    
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
    const tagName = mockarooData[1].nombre_vacio;
    const tagDescription = mockarooData[1].note;
    const failureText = 'Retry';

    // When El usuario ingresa el nombre vacio.
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
    const tagName = mockarooData[2].first_name.repeat(20);
    const tagDescription = mockarooData[2].note;
    const failureText = 'Retry';

    // When El usuario ingrea un nombre muy largo.
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
    const tagName = mockarooData[3].first_name;
    const tagDescription = mockarooData[3].note_larga;
    const failureText = 'Retry';

    // When El usuario ingresa una descripcion muy larga.
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
    const tagName = mockarooData[4].first_name;
    const tagDescription = mockarooData[4].note;
    const tagColor = mockarooData[4].color;
    const failureText = 'Retry';

    // When El usuario ingresa un color invalido.
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
