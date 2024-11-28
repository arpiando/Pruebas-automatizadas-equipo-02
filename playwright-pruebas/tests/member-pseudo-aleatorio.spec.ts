import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';
import { fetchMockarooData } from "../index.js"

test.describe('Crear un miembro', () => {
  let member: Member;
  let loginPage: LoginPage;

  let mockarooData = [];

  test.beforeAll(async ({ browserName }, testInfo) => {
    mockarooData = await fetchMockarooData();
    if (!mockarooData || mockarooData.length === 0) {
      throw new Error("No se pudieron obtener datos de Mockaroo");
    }
  });

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
    const memberName = mockarooData[0].first_name;
    const memberEmail = mockarooData[0].email;
    const memberNote = mockarooData[0].note;
    const confirmationText = 'Created';

    // When El usuario crea un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateNewMember(memberName, memberEmail,memberNote);

    // Then El sistema verifica si el miembro se ha creado exitosamente.
    const createdText = await member.ValidateMemberIsCreated();
    expect(createdText).toContain(confirmationText);
  });

  test('CM002 - El usuario debería recibir un mensaje error al crear un miembro con email invalido', async ({ page }) => {
    const memberName = mockarooData[1].first_name;
    const memberEmailInvalid = `${memberName}gmail.com`;
    const memberNote = mockarooData[1].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM003 - El usuario debería recibir un mensaje error al crear un miembro con nota invalida', async ({ page }) => {
    const memberName = mockarooData[2].first_name;
    const memberEmail = mockarooData[2].email;
    const memberNoteInvalid = mockarooData[2].note_larga;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmail,memberNoteInvalid);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM004 - El usuario debería poder crear un nuevo miembro con nombre vacio exitosamente', async ({ page }) => {
    const memberNameEmpty = mockarooData[3].nombre_vacio;
    const memberEmail = mockarooData[3].email;
    const memberNote = mockarooData[3].note;
    const confirmationText = 'Created';

     // When El usuario crea un nuevo miembro.
     await member.navigateToCreateMember()
     await member.CreateNewMember(memberNameEmpty, memberEmail,memberNote);
 
     // Then El sistema verifica si el miembro se ha creado exitosamente.
     const createdText = await member.ValidateMemberIsCreated();
     expect(createdText).toContain(confirmationText);
  });

  test('CM005 - El usuario debería recibir un mensaje error al crear un miembro con email vacio', async ({ page }) => {
    const memberName = mockarooData[4].first_name;
    const memberEmailInvalid = mockarooData[4].email_invalido;
    const memberNote = mockarooData[4].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });

  test('CM006 - El usuario debería recibir un mensaje error al crear un miembro con nombre maximo de caracteres', async ({ page }) => {
    const memberNameInvalid = mockarooData[5].first_name.repeat(20);
    const memberEmail = mockarooData[5].email;
    const memberNote = mockarooData[5].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberNameInvalid, memberEmail,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
  });
});
