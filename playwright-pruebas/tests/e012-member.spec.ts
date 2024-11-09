import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';

test.describe('E012 Validar edición de un miembro', () => {
  let memberPage: Member;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    memberPage = new Member(page);
    loginPage = new LoginPage(page);
    const memberName = 'John Doe';
    const memberEmail = 'john.doe@example.com';

    // Given: El usuario está autenticado en la aplicación y crea un miembro.
    await loginPage.navigateTo();
    await loginPage.login();

    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);

    await memberPage.navigateToCreateMember()
    await memberPage.CreateNewMember(memberName, memberEmail);
    const createdText = await memberPage.ValidateMemberIsCreated();
    expect(createdText).toContain('Created');
  });

  test('El usuario debería poder editar la información del miembro', async ({ page }) => {
    const editedName = 'Jane Doe';

    // When: El usuario edita un miembro.
    await memberPage.EditAMember(editedName);

    // Then: El sistema verifica si el nombre del miembro se ha actualizado.
    const modifiedName = await memberPage.ValidateMemberIsModified();
    expect(modifiedName).toBe(editedName);
  });
});
