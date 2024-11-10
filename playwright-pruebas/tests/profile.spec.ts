import { test, expect } from '@playwright/test';
import { Profile } from '../pages/profile';
import { LoginPage } from '../pages/login';

test.describe('Modificar el profile', () => {
  let profile: Profile;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profile = new Profile(page);
    
    // Given: El usuario ha navegado al sitio, ha iniciado sesión y está en la sección para modificar el profile.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await profile.navigateToProfile();
  });

  test('MP001 - El usuario deberia modificar el nombre de su profile', async ({ page }) => {
    const NameModified = 'Usuario modificado';

    // When: El usuario modifica su nombre.
    await profile.editProfileName(NameModified);
    
    // Then: El sistema debe mostrar el nombre modificado luego de guardar los cambios.
    const successHeader = await profile.isProfileModified();
    expect(successHeader).toContain(NameModified);
  });

  test('MP002 - El usuario modifica el correo con datos invalidos', async ({ page }) => {
    const EmailInvalid = 'f.cucinauniandes.edu.co';
    const failureText = 'Retry';
    
    // When: El usuario intenta modificar el email co uno invalido.
    await profile.editProfileEmail(EmailInvalid);
    
    // Then: El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
  });
});
