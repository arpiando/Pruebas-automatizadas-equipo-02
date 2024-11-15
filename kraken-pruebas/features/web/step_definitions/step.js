const login = require('../pages/login');
const background = require('../pages/background')
const pageCreate = require('../pages/page')
const postCreate = require ('../pages/post')
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

When('El usuario crea una pagina y la publica.', async function () {
    const navigation = await pageCreate.navigateToCreatePage(this.driver)
    const mewpage = await pageCreate.createPage(this.driver)
});

Then('El sistema debe mostrar un mensaje de éxito al crear la pagina.', async function () {
  const success = await pageCreate.isPageCreatedSuccessfully(this.driver)
});

Given('El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.', async function () {
  const reload = await pageCreate.reloadPage(this.driver)
});

When('El usuario modifica el título y el contenido de la pagina.', async function () {
  const edition = await pageCreate.editPage(this.driver)
});

Then('El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.', async function () {
  const success = await pageCreate.confirmPageIsUpdated(this.driver)
});

Then('esta en la sección de creación de posts', async function () {
  const success = await postCreate.navigateToCreatePost(this.driver)
});

When('El usuario crea un post y lo publica.', async function () {
  const edition = await postCreate.createPost(this.driver)
});

Then('El sistema debe mostrar un mensaje de éxito al crear el post.', async function () {
  const success = await postCreate.isPageCreatedSuccessfully(this.driver)
});

Given('El usuario ha navegado al sitio, ha iniciado sesión y ha creado un post exitosamente.', async function () {
  const reload = await postCreate.reloadPage(this.driver)
});

When('El usuario modifica el título y el contenido del post.', async function () {
  const edition = await pageCreate.editPage(this.driver)
});

Then('El sistema debe mostrar un mensaje de éxito después de la modificación.', async function () {
  const success = await pageCreate.confirmPageIsUpdated(this.driver)
});



