import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';

test.describe('E014 Validar la creación de un nuevo miembro con datos invalidos', () => {
  let member: Member;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    member = new Member(page);
    loginPage = new LoginPage(page);

    // Given: El usuario está autenticado en la aplicación y va al menu de miembros.
    await loginPage.navigateTo();
    await loginPage.login();
    
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await member.navigateToCreateMember()
  });

  test('El usuario debería recibir un mensaje error al poner datos invalidos', async ({ page }) => {
    const memberName = 'John Doe';
    const memberEmailInvalid = 'john.doeexample.com';
    const confirmationText = 'Retry';

    // When: El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateNewMember(memberName, memberEmailInvalid);

    // Then: El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });
});
