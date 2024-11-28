import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';
import {faker} from '@faker-js/faker'

test.describe('Crear un miembro', () => {
  let member: Member;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    member = new Member(page);
    loginPage = new LoginPage(page);

    // Given El usuario está autenticado en la aplicación y va al menu de miembros.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await member.navigateToCreateMember()
  });

  test('CM001 - El usuario debería poder crear un nuevo miembro exitosamente', async ({ page }) => {
    const memberName = faker.person.fullName();
    const memberEmail = faker.internet.email();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Created';

    // When El usuario crea un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateNewMember(memberName, memberEmail,memberNote);

    // Then El sistema verifica si el miembro se ha creado exitosamente.
    const createdText = await member.ValidateMemberIsCreated();
    expect(createdText).toContain(confirmationText);
  });

  test('CM002 - El usuario debería recibir un mensaje error al crear un miembro con email invalido', async ({ page }) => {
    const memberName = faker.person.fullName();
    const memberEmailInvalid = faker.string.alpha();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM003 - El usuario debería recibir un mensaje error al crear un miembro con nota invalida', async ({ page }) => {
    const memberName = faker.person.fullName();
    const memberEmail = faker.internet.email();
    const memberNoteInvalid = faker.lorem.paragraphs(5);
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmail,memberNoteInvalid);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM004 - El usuario debería poder crear un nuevo miembro con nombre vacio exitosamente', async ({ page }) => {
    const memberNameEmpty = "";
    const memberEmail = faker.internet.email();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Created';

     // When El usuario crea un nuevo miembro.
     await member.navigateToCreateMember()
     await member.CreateNewMember(memberNameEmpty, memberEmail,memberNote);
 
     // Then El sistema verifica si el miembro se ha creado exitosamente.
     const createdText = await member.ValidateMemberIsCreated();
     expect(createdText).toContain(confirmationText);
  });

  test('CM005 - El usuario debería recibir un mensaje error al crear un miembro con email vacio', async ({ page }) => {
    const memberName = faker.person.fullName();
    const memberEmailInvalid = "";
    const memberNote = faker.lorem.paragraphs();
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM006 - El usuario debería recibir un mensaje error al crear un miembro con nombre maximo de caracteres', async ({ page }) => {
    const memberNameInvalid = faker.lorem.paragraphs();
    const memberEmail = faker.internet.email();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberNameInvalid, memberEmail,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });
});
