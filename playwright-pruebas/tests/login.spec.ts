import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";


test.describe('Login', () => {
    let beforePath = "";
    let afterPath = "";
    let comparePath = "";

    test.beforeAll(async ({ browserName }, testInfo) => {
        beforePath = testInfo.outputPath(`before-${browserName}.png`);
        afterPath = testInfo.outputPath(`after-${browserName}.png`);
        comparePath = testInfo.outputPath(`compare-${browserName}.png`);
      });
    
    test('LP001 - El usuario debería recibir un mensaje de error con correo inválido o poder iniciar sesión con credenciales válidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const emailInvalid: string = 'f.cucina2@uniandes.edu.co';
        const expectedErrorMessage: string = 'There is no user with that email address.';

        // Given El usuario está de nuevo en la página de inicio de sesión.
        await loginPage.navigateToLoginPage();
        await page.screenshot({ path: beforePath });

        // Caso 2 Iniciar sesión con correo válido
        // When El usuario ingresa credenciales válidas y hace click en el botón de inicio de sesión.
        await loginPage.login();
        await page.screenshot({ path: afterPath });

        const img1 = PNG.sync.read(fs.readFileSync(beforePath));
        const img2 = PNG.sync.read(fs.readFileSync(afterPath));

        const { width, height } = img1;
        const diff = new PNG({ width, height });

        pixelmatch(img1.data, img2.data, diff.data, width, height, options);
        fs.writeFileSync(comparePath, PNG.sync.write(diff));

        // Then El sistema debe mostrar el menú del panel de administración.
        const loginExitoso = await loginPage.isLoginSuccessful();
        expect(loginExitoso).toBe(true);
    });
});
