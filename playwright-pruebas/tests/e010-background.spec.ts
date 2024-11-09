import { test, expect } from '@playwright/test';
import { Background } from '../pages/background';
import { LoginPage } from '../pages/login';

test.describe('E010 Validar el cambio de fondo a modo oscuro y claro', () => {
  let backgroundPage: Background;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    backgroundPage = new Background(page);

    // Given: El usuario está autenticado en la aplicación
    await loginPage.navigateTo();
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
  });

  test('El usuario debería poder activar el modo oscuro y luego volver al modo claro', async ({ page }) => {

    // When: El usuario hace clic en el botón para activar el modo oscuro
    const isDarkModeActive = await backgroundPage.clickBackgroundThemeDark();

    // Then: El sistema refleja el modo oscuro cambiando el fondo a negro
    expect(isDarkModeActive).toBe(true);

    // When: El usuario hace clic en el botón para volver al modo claro
    const isLightModeActive = await backgroundPage.clickBackgroundThemeLight();

    // Then: El sistema refleja el modo claro cambiando el fondo a blanco
    expect(isLightModeActive).toBe(true);
  });
});
