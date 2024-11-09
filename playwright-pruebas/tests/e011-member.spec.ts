import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';

test.describe('E011 Validar la creación de un nuevo miembro', () => {
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

  test('El usuario debería poder crear un nuevo miembro y ver la información de creación', async ({ page }) => {
    const memberName = 'John Doe';
    const memberEmail = 'john.doe@example.com';
    const confirmationText = 'Created';

    // When: El usuario crea un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateNewMember(memberName, memberEmail);

    // Then: El sistema verifica si el miembro se ha creado exitosamente.
    const createdText = await member.ValidateMemberIsCreated();
    expect(createdText).toContain(confirmationText);
  });
});
