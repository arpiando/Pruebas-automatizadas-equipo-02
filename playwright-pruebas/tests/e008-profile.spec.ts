import { test, expect } from '@playwright/test';
import { Profile } from '../pages/profile';
import { LoginPage } from '../pages/login';

test.describe('E008 Modificar el profile', () => {
  let profile: Profile;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profile = new Profile(page);
    
    await loginPage.navigateTo();
    
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    
    expect(isLoggedIn).toBe(true);
  });

  test('El usuario deberia modificar el nombre de su profile', async ({ page }) => {
    const NameModified = 'Usuario modificado';

    // Given: El usuario está en la página del profile.
    await profile.navigateToProfile();
    
    // When: El usuario modifica su nombre.
    await profile.editProfileName(NameModified);
    
    // Then: El sistema debe mostrar el nombre modificado luego de guardar los cambios.
    const successHeader = await profile.isProfileModified();
    expect(successHeader).toContain(NameModified);
  });
});
