import { test, expect } from '@playwright/test';
import { Background } from '../pages/background';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";


test.describe('Cambiar tematica de fondo', () => {
  let backgroundPage: Background;
  let loginPage: LoginPage;
  let currentMode: string;

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
      beforePath = testInfo.outputPath(`before-${browserName}.png`);
      afterPath = testInfo.outputPath(`after-${browserName}.png`);
      comparePath = testInfo.outputPath(`compare-${browserName}.png`);
    });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    backgroundPage = new Background(page);

    // Given El usuario está autenticado en la aplicación.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await page.screenshot({ path: beforePath });

    // And obtenemos el estado actual del fondo
    currentMode = await backgroundPage.GetCurrentState();
  });

  test('BC001 - El usuario debería poder activar el modo oscuro y luego volver al modo claro', async ({page}) => {

    // When El usuario hace clic en el botón para cambiar el fondo
    const newMode = await backgroundPage.clickBackground(currentMode);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));

    // Then Verificar que el nuevo modo es el opuesto del actual
    if (currentMode === 'dark') {
      expect(newMode).toBe('dark');
    } else {
      expect(newMode).toBe('light');
    }
  });
});
