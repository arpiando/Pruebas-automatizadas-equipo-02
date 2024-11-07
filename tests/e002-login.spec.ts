import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('E002 Iniciar Sesión con datos invalidos', () => {
    test('El usuario debería ver un mensaje de error cuando el correo es incorrecto', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const errorMessage: string = 'There is no user with that email address.'
        const emailInvalid: string = 'f.cucina2@uniandes.edu.co'

        // Given:  El usuario está en la página de inicio de sesión.
        await loginPage.navigateTo();

        // When: El usuario ingresa sus usuario de manera incorrecta y hace click en el botón de inicio de sesión.
        await loginPage.login(emailInvalid);

        // Then: El sistema debe mostrar un mensaje de error de no hay usuario con ese correo.
        const mensajeError = await loginPage.isEmailInvalid()
        await expect(mensajeError).toContain(errorMessage);

    });
});
