import { test, expect } from '@playwright/test';
import { Profile } from '../pages/profile';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";
import {faker} from '@faker-js/faker'

test.describe('Modificar el profile', () => {
  let profile: Profile;
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
    profile = new Profile(page);
    
    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección para modificar el profile.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await profile.navigateToProfile();
    await page.screenshot({ path: beforePath });
  });

  test('MPR001 - El usuario deberia modificar el nombre de su profile exitosamente', async ({ page }) => {
    const NameModified = faker.person.fullName();

    // When El usuario modifica su nombre.
    await profile.editProfileName(NameModified);
    
    // Then El sistema debe mostrar el nombre modificado luego de guardar los cambios.
    const successHeader = await profile.isProfileModified();
    expect(successHeader).toContain(NameModified);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR002 - El sistema arroja mensaje de error por nombre vacio', async ({ page }) => {
    const NameInvalid = "";
    const failureText = 'Retry';
    
    // When El usuario deja el nombre vacio.
    await profile.editProfileName(NameInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR003 - El usuario modifica el correo con email invalido', async ({ page }) => {
    const EmailInvalid = faker.string.alpha();
    const failureText = 'Retry';
    
    // When El usuario intenta modificar el email con uno invalido.
    await profile.editProfileEmail(EmailInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR004 - El usuario modifica el correo con email vacio', async ({ page }) => {
    const EmailInvalid = "";
    const failureText = 'Retry';
    
    // When El usuario deja el email vacio.
    await profile.editProfileEmail(EmailInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR005 - El usuario introduce una ubicacion muy extensa', async ({ page }) => {
    const LocationInvalid = faker.lorem.paragraphs();
    const failureText = 'Retry';
    
    // When El usuario intenta agregar una ubicacion muy larga.
    await profile.editProfileLocation(LocationInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateLocationIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR006 - El usuario introduce una website invalido', async ({ page }) => {
    const websiteInvalid = faker.string.alpha();
    const failureText = 'Retry';
    
    // When El usuario ingresa un url invalido.
    await profile.editProfileWebsite(websiteInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateWebsiteIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR007 - El usuario introduce un perfil de facebook invalido', async ({ page }) => {
    const URLInvalid = faker.internet.url();
    const failureText = 'The URL must be in a format like https://www.facebook.com/yourPage';
    
    // When El usuario ingresa un url invalido.
    await profile.editProfileFacebook(URLInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateFacebookIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR008 - El usuario introduce un perfil de twitter invalido', async ({ page }) => {
    const URLInvalid = faker.internet.exampleEmail();
    const failureText = 'Your Username is not a valid Twitter Username';
    
    // When El usuario ingresa un usuario invalido.
    await profile.editProfileTwitter(URLInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateTwitterIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MPR009 - El usuario introduce una biografia superando los caracteres', async ({ page }) => {
    const bioInvalid = faker.lorem.paragraphs(5);
    const failureText = 'Retry';
    
    // When El usuario ingresa una biografia muy larga.
    await profile.editProfileBio(bioInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateBioIsInvalid();
    expect(successHeader).toContain(failureText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});
