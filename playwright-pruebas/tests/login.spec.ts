import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login', () => {
    test('LP001 - El usuario debería recibir un mensaje de error con correo inválido o poder iniciar sesión con credenciales válidas', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const emailInvalid: string = 'f.cucina2@uniandes.edu.co';
        const expectedErrorMessage: string = 'There is no user with that email address.';

        // Given: El usuario está en la página de inicio de sesión.
        await loginPage.navigateToLoginPage();

        // When: El usuario ingresa un correo inválido y hace click en el botón de inicio de sesión.
        await loginPage.login(emailInvalid);

        // Then: El sistema debe mostrar un mensaje de error indicando que no hay usuario con ese correo.
        const errorMessage = await loginPage.isEmailInvalid();
        expect(errorMessage).toContain(expectedErrorMessage);

        // Given: El usuario está de nuevo en la página de inicio de sesión.
        await loginPage.navigateToLoginPage();

        // Caso 2: Iniciar sesión con correo válido
        // When: El usuario ingresa credenciales válidas y hace click en el botón de inicio de sesión.
        await loginPage.login();

        // Then: El sistema debe mostrar el menú del panel de administración.
        const loginExitoso = await loginPage.isLoginSuccessful();
        expect(loginExitoso).toBe(true);
    });
});
