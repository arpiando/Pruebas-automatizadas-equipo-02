import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';
import fs from 'fs';

const jsonString = fs.readFileSync('datos/data_member.json', 'utf8');
const data = JSON.parse(jsonString);

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
    const memberName = data[0].full_name;
    const memberEmail = data[0].email;
    const memberNote = data[0].note
    const confirmationText = 'Created';

    // When El usuario crea un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateNewMember(memberName, memberEmail,memberNote);

    // Then El sistema verifica si el miembro se ha creado exitosamente.
    const createdText = await member.ValidateMemberIsCreated();
    expect(createdText).toContain(confirmationText);
  });

  test('CM002 - El usuario debería recibir un mensaje error al crear un miembro con email invalido', async ({ page }) => {
    const memberName = data[1].full_name;
    const memberEmailInvalid = data[1].email;
    const memberNote = data[1].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM003 - El usuario debería recibir un mensaje error al crear un miembro con nota invalida', async ({ page }) => {
    const memberName = data[2].full_name;
    const memberEmail = data[2].email;
    const memberNoteInvalid = data[2].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmail,memberNoteInvalid);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM004 - El usuario debería poder crear un nuevo miembro con nombre vacio exitosamente', async ({ page }) => {
    const memberNameEmpty = data[3].full_name;
    const memberEmail = data[3].email;
    const memberNote = data[3].note;
    const confirmationText = 'Created';

     // When El usuario crea un nuevo miembro.
     await member.navigateToCreateMember()
     await member.CreateNewMember(memberNameEmpty, memberEmail,memberNote);
 
     // Then El sistema verifica si el miembro se ha creado exitosamente.
     const createdText = await member.ValidateMemberIsCreated();
     expect(createdText).toContain(confirmationText);
  });

  test('CM005 - El usuario debería recibir un mensaje error al crear un miembro con email vacio', async ({ page }) => {
    const memberName = data[4].full_name;
    const memberEmailInvalid = data[4].email;
    const memberNote = data[4].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM006 - El usuario debería recibir un mensaje error al crear un miembro con nombre maximo de caracteres', async ({ page }) => {
    const memberNameInvalid = data[5].full_name;
    const memberEmail = data[5].email;
    const memberNote = data[5].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberNameInvalid, memberEmail,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });
});