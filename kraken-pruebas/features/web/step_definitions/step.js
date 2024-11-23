const login = require('../pages/login')
const background = require('../pages/background')
const pageCreate = require('../pages/page')
const postCreate = require ('../pages/post')
const member = require ('../pages/member')
const tagManager = require('../pages/tags')
const profile = require('../pages/profile')
const { Given, When, Then, Before} = require('@cucumber/cucumber');
const { obtenerDatos, cargarDatosPseudo } = require('../../../data/estrategia');

let datos;

Before(async () => {
  const estrategia = process.env.ESTRATEGIA || 'aprior';
  if (estrategia === 'pseudo') {
    await cargarDatosPseudo();
  }
  datos = obtenerDatos(estrategia);
  console.log('Datos cargados para la estrategia', estrategia, ':', datos);
});


//Login

When('El usuario ingresa credenciales válidas', async function () {
    await login.enterCredentials(this.driver);
});

When('El usuario ingresa credenciales invalidas', async function () {
  const credenciales = datos[0];
  await login.enterInvalidCredentials(this.driver, credenciales.email, credenciales.password);
});

When('El usuario ingresa credenciales incoherentes', async function () {
  const credenciales = datos[5];
  await login.enterInvalidCredentials(this.driver, credenciales.email, credenciales.password);
});

When('hace clic en el boton de ingreso', async function () {
    await login.clickSignIn(this.driver);
});

When('el sistema debe mostrar el menú del panel de administración.', async function () {
    const isAdminVisible = await login.isLoginSuccessful(this.driver);
});

Then('cierro la sesión del navegador', async function () {
    await login.logout(this.driver);
});

Then('el sistema debe mostrar aviso de error.', async function () {
  const isAdminVisible = await login.loginNotSuccessful(this.driver);
  
});


//Background

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


//Pagina

When('El usuario crea una pagina y la publica.', async function () {
    const contenido = datos[3];
    const navigation = await pageCreate.navigateToCreatePage(this.driver)
    const mewpage = await pageCreate.createPage(this.driver, contenido.titulo, contenido.contenido)
});

Then('El sistema debe mostrar un mensaje de éxito al crear la pagina.', async function () {
  const success = await pageCreate.isPageCreatedSuccessfully(this.driver)
});

Given('El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.', async function () {
  const reload = await pageCreate.reloadPage(this.driver)
});

When('El usuario modifica el título y el contenido de la pagina.', async function () {
  const contenido2 = datos[4];
  const edition = await pageCreate.editPage(this.driver, contenido2.titulo, contenido2.contenido)
});

Then('El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.', async function () {
  const success = await pageCreate.confirmPageIsUpdated(this.driver)
});

When('El usuario selecciona una pagina', async function () {
  const edition = await pageCreate.selectPage(this.driver)
});

Then('elimina la pagina', async function () {
  const success = await pageCreate.deletePage(this.driver)
});

When('El usuario crea una pagina y la publica con datos invalidos', async function () {
  const contenido = datos[7];
  const navigation = await pageCreate.navigateToCreatePage(this.driver)
  const mewpage = await pageCreate.createPageInvalid(this.driver, contenido.titulo, contenido.contenido)
});

Then('El sistema debe mostrar un mensaje de error.', async function () {
  const isAdminVisible = await pageCreate.NotSuccessful(this.driver);

});


//Post

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
  const contenido = datos[8];
  const edition = await postCreate.editPost(this.driver, contenido.titulo, contenido.contenido)
});

Then('El sistema debe mostrar un mensaje de éxito después de la modificación.', async function () {
  const success = await pageCreate.confirmPageIsUpdated(this.driver)
});

Then('El sistema debe mostrar un mensaje de éxito después de la elminación.', async function () {
  const success = await pageCreate.validatePageIsDeleted(this.driver)
});

When('El usuario selecciona un post publicado y lo revierte a borrador.', async function () {
  const unpublished=postCreate.unpublishedPost(this.driver);
});

Then('El sistema debe mostrar un mensaje de éxito al revertir el post a borrador.', async function () {
  const success = await postCreate.isRevertToDraftSuccess(this.driver)
});




//Miembros

Then('esta en la sección de miembros', async function () {
  const success = await member.navigateToCreateMember(this.driver)
});

When('El usuario crea un nuevo miembro.', async function () 
{
  const datosMiembros = datos[1];
  const edition = await member.createNewMember(this.driver, datosMiembros.name, datosMiembros.email)
});

Then('El sistema verifica si el miembro se ha creado exitosamente.', async function () {
  const success = await member.validateMemberIsCreated(this.driver)
});

Given('El usuario ha navegado al sitio, ha iniciado sesión y ha crea un miembro exitosamente.', async function () {
  const reload = await pageCreate.reloadPage(this.driver)
});

Given('El usuario ha navegado al sitio, ha iniciado sesión, ha crea un miembro exitosamente y lo editó.', async function () {
  const reload = await pageCreate.reloadPage(this.driver)
});

When('El usuario edita un miembro.', async function () {
  const datosMiembro2 = datos[2];
  const edition = await member.editMember(this.driver, datosMiembro2.name, datosMiembro2.email )
});

Then('El sistema verifica si el nombre del miembro se ha actualizado.', async function () {
  const success = await member.validateMemberIsCreated(this.driver)
});

When('El usuario elimina el miembro', async function () {
  const edition = await member.deleteMember(this.driver)
});

Then('seleciona el primer miembro', async function () {
  const success = await member.memberSelection(this.driver)
});

Then('El sistema verifica si se ha eliminado.', async function () {
  const success = await member.validateMemberIsDeleted(this.driver)
});

When('El usuario crea un nuevo miembro con datos invalidos.', async function () 
{
  const datosMiembros = datos[6];
  const edition = await member.createNewMember(this.driver, datosMiembros.ilogicName, datosMiembros.email)
});

Then('El sistema informa del error.', async function () {
  const success = await member.errorMember(this.driver)
});

When('El usuario crea un nuevo miembro con datos invalidos en el email.', async function () 
{
  const datosMiembros = datos[9];
  const edition = await member.editMemberEmail(this.driver, datosMiembros.name, datosMiembros.email)
});

When('El usuario crea un nuevo miembro con datos validos en el email pero sin nombre.', async function () 
{
  const datosMiembros = datos[10];
  const edition = await member.editMemberEmailNoName(this.driver, datosMiembros.name, datosMiembros.email)
});


//Tags

Then('esta en la sección de creación de tags', async function () {
  const success = await tagManager.navigateToCreateTag(this.driver)
});

When('El usuario crea un tag y la publica.', async function () {
  await tagManager.createNewTag(this.driver); 
});

Then('El sistema debe mostrar un mensaje de éxito al crear la tag.', async function () {
  const success = await tagManager.validateTagIsCreated(this.driver)
});

When('El usuario modifica el nombre del tag.', async function () {
  const tagName = 'Etiqueta Modificada'; 
  await tagManager.editTagName(this.driver, tagName);
});

Then('El sistema debe mostrar un mensaje de éxito después de la modificación del tag.', async function () {
  const tagName = await tagManager.validateTagIsCreated(this.driver);
  if (tagName !== 'Etiqueta Modificada') {
    throw new Error('La etiqueta no se modificó correctamente.');
  }
});

Then('el usuario selecciona una etiqueta', async function () {
  const success = await tagManager.tagSelection(this.driver)
});

Then('elimina la etiqueta', async function () {
  const success = await tagManager.deleteTag(this.driver)
});

Then('el sistema debe confirmar su eliminación.', async function () {
  const success = await tagManager.validateTagIsDeleted(this.driver)
});



