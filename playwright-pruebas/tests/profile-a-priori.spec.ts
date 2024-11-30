import { test, expect } from '@playwright/test';
import { Profile } from '../pages/profile';
import { LoginPage } from '../pages/login';
import fs from 'fs';

const jsonString = fs.readFileSync('datos/data_profile.json', 'utf8');
const data = JSON.parse(jsonString);


test.describe('Modificar el profile', () => {
  let profile: Profile;
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profile = new Profile(page);
    
    // Given El usuario ha navegado al sitio, ha iniciado sesión y está en la sección para modificar el profile.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await profile.navigateToProfile();
  });

  test('MPR001 - El usuario deberia modificar el nombre de su profile exitosamente', async ({ page }) => {
    const NameModified = data[0].full_name;

    // When El usuario modifica su nombre.
    await profile.editProfileName(NameModified);
    
    // Then El sistema debe mostrar el nombre modificado luego de guardar los cambios.
    const successHeader = await profile.isProfileModified();
    expect(successHeader).toContain(NameModified);
  });

  test('MPR002 - El sistema arroja mensaje de error por nombre vacio', async ({ page }) => {
    const NameInvalid = data[1].full_name;
    const failureText = 'Retry';
    
    // When El usuario deja el nombre vacio.
    await profile.editProfileName(NameInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR003 - El usuario modifica el correo con email invalido', async ({ page }) => {
    const EmailInvalid = data[1].email;
    const failureText = 'Retry';
    
    // When El usuario intenta modificar el email con uno invalido.
    await profile.editProfileEmail(EmailInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR004 - El usuario modifica el correo con email vacio', async ({ page }) => {
    const EmailInvalid = data[2].email;
    const failureText = 'Retry';
    
    // When El usuario deja el email vacio.
    await profile.editProfileEmail(EmailInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateEmailIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR005 - El usuario introduce una ubicacion muy extensa', async ({ page }) => {
    const LocationInvalid = data[2].location;
    const failureText = 'Retry';
    
    // When El usuario intenta agregar una ubicacion muy larga.
    await profile.editProfileLocation(LocationInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateLocationIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR006 - El usuario introduce una website invalido', async ({ page }) => {
    const websiteInvalid = data[0].website;
    const failureText = 'Retry';
    
    // When El usuario ingresa un url invalido.
    await profile.editProfileWebsite(websiteInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateWebsiteIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR007 - El usuario introduce un perfil de facebook invalido', async ({ page }) => {
    const URLInvalid = data[0].facebook;
    const failureText = 'The URL must be in a format like https://www.facebook.com/yourPage';
    
    // When El usuario ingresa un url invalido.
    await profile.editProfileFacebook(URLInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateFacebookIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR008 - El usuario introduce un perfil de twitter invalido', async ({ page }) => {
    const URLInvalid = data[0].twitter;
    const failureText = 'Your Username is not a valid Twitter Username';
    
    // When El usuario ingresa un usuario invalido.
    await profile.editProfileTwitter(URLInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateTwitterIsInvalid();
    expect(successHeader).toContain(failureText);
  });

  test('MPR009 - El usuario introduce una biografia superando los caracteres', async ({ page }) => {
    const bioInvalid = data[0].bio;
    const failureText = 'Retry';
    
    // When El usuario ingresa una biografia muy larga.
    await profile.editProfileBio(bioInvalid);
    
    // Then El sistema impide la modificacion del profile.
    const successHeader = await profile.ValidateBioIsInvalid();
    expect(successHeader).toContain(failureText);
  });
});
