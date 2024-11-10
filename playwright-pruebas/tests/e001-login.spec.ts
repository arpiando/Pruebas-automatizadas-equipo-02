import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login', () => {
    test('El usuario debería poder iniciar sesión con credenciales válidas', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Given: El usuario está en la página de inicio de sesión.
        await loginPage.navigateToLoginPage();

        // When: El usuario ingresa sus credenciales y hace click en el botón de inicio de sesión.
        await loginPage.login();

        // Then: El sistema debe mostrar el menu del panel de administracion.
        const loginExitoso = await loginPage.isLoginSuccessful();
        expect(loginExitoso).toBe(true);
    });
});
