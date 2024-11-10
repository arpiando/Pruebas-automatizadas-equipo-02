import { test, expect } from '@playwright/test';
import { Background } from '../pages/background';
import { LoginPage } from '../pages/login';

test.describe('Cambiar tematica de fondo', () => {
  let backgroundPage: Background;
  let loginPage: LoginPage;
  let currentMode: string;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    backgroundPage = new Background(page);

    // Given: El usuario está autenticado en la aplicación.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    // Y obtenemos el estado actual del fondo
    currentMode = await backgroundPage.GetCurrentState();
  });

  test('BC001 - El usuario debería poder activar el modo oscuro y luego volver al modo claro', async () => {

    // When: El usuario hace clic en el botón para cambiar el fondo
    const newMode = await backgroundPage.clickBackground(currentMode);

    // Then: Verificar que el nuevo modo es el opuesto del actual
    if (currentMode === 'dark') {
      expect(newMode).toBe('light');
    } else {
      expect(newMode).toBe('dark');
    }
  });
});
