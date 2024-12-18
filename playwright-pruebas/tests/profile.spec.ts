import { test, expect } from '@playwright/test';
import { Profile } from '../pages/profile';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";


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

  test('MPR001 - El usuario deberia modificar el nombre de su profile', async ({ page }) => {
    const NameModified = 'Usuario modificado';

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

  test('MPR002 - El usuario modifica el correo con datos invalidos', async ({ page }) => {
    const EmailInvalid = 'f.cucinauniandes.edu.co';
    const failureText = 'Retry';
    
    // When El usuario intenta modificar el email co uno invalido.
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
});
