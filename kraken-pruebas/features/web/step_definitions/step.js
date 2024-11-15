const login = require('../pages/login');
const background = require('../pages/background')
const { Given, When, Then } = require('@cucumber/cucumber');

When('El usuario ingresa credenciales válidas', async function () {
    await login.enterCredentials(this.driver);
});

When('hace clic en el boton de ingreso', async function () {
    await login.clickSignIn(this.driver);
});

Then('el sistema debe mostrar el menú del panel de administración.', async function () {
    const isAdminVisible = await login.isLoginSuccessful(this.driver);
});

When('obtenemos el estado actual del fondo', async function () {
    const currentBackgroundState = await background.getCurrentState(this.driver);
});

When('El usuario hace clic en el botón para cambiar el fondo', async function () {
    const newBackgroundState = await background.clickBackground(this.driver)
});

Then('Verificar que el nuevo modo es el opuesto del actual', async function () {
    if (this.currentBackgroundState === 'dark') {
        if (newBackgroundState !== 'light') {
          throw new Error(`Se esperaba 'light', pero se obtuvo '${newBackgroundState}'`);
        }
      } else if (this.currentBackgroundState === 'light') {
        if (newBackgroundState !== 'dark') {
          throw new Error(`Se esperaba 'dark', pero se obtuvo '${newBackgroundState}'`);
        }
      }
  });

