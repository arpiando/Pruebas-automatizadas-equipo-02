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

  test.afterEach(async ({})=>{
    await member.deleteMember()
  })

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
    await member.navigateToCreateMember()
  });
});

test.describe('Modificar un miembro', () => {
  let memberPage: Member;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    memberPage = new Member(page);
    loginPage = new LoginPage(page);

    const memberName = 'Carlos Turk';
    const memberEmail = 'carlos.turk@example.com';
    const note = 'this is a note';

    // Given El usuario está autenticado en la aplicación  y va al menu de miembros.
    await loginPage.navigateToLoginPage();
    await loginPage.login();
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    await memberPage.navigateToCreateMember()
  

    // And Crea un miembro exitosamente
    await memberPage.CreateNewMember(memberName, memberEmail, note);
    const createdText = await memberPage.ValidateMemberIsCreated();
    expect(createdText).toContain('Created');
  });

  test.afterEach(async ({})=>{
    await memberPage.deleteMember()
  })
  test('CM002 - El usuario debería recibir un mensaje error al crear un miembro con email invalido', async ({ page }) => {
    const memberName = faker.person.fullName();
    const memberEmailInvalid = faker.string.alpha();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await memberPage.navigateToCreateMember()
    await memberPage.EditAMember(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await memberPage.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
    await memberPage.navigateToMemberInvalid();
  });

  test('CM003 - El usuario debería recibir un mensaje error al crear un miembro con nota invalida', async ({ page }) => {
    const memberName = faker.person.fullName();
    const memberEmail = faker.internet.email();
    const memberNoteInvalid = faker.lorem.paragraphs(5);
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await memberPage.navigateToCreateMember()
    await memberPage.EditAMember(memberName, memberEmail,memberNoteInvalid);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await memberPage.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
    await memberPage.navigateToMemberInvalid();
  });

  test('CM004 - El usuario debería poder crear un nuevo miembro con nombre vacio exitosamente', async ({ page }) => {
    const memberNameEmpty = "";
    const memberEmail = faker.internet.email();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Created';

     // When El usuario crea un nuevo miembro.
     await memberPage.navigateToCreateMember()
     await memberPage.EditAMember(memberNameEmpty, memberEmail,memberNote);
 
     // Then El sistema verifica si el miembro se ha creado exitosamente.
     const createdText = await memberPage.ValidateMemberIsCreated();
     expect(createdText).toContain(confirmationText);
     await memberPage.navigateToCreateMember();
  });

  test('CM006 - El usuario debería recibir un mensaje error al crear un miembro con nombre maximo de caracteres', async ({ page }) => {
    const memberNameInvalid = faker.lorem.paragraphs();
    const memberEmail = faker.internet.email();
    const memberNote = faker.lorem.paragraph();
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await memberPage.navigateToCreateMember()
    await memberPage.EditAMember(memberNameInvalid, memberEmail,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await memberPage.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
    await memberPage.navigateToMemberInvalid();
  });
});
