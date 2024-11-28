import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";

test.describe('Crear un miembro', () => {
  let member: Member;
  let loginPage: LoginPage;
  
  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);

    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
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
    await page.screenshot({ path: beforePath });
  });

  test.afterEach(async ({})=>{
    await member.deleteMember()
  })

  test('CM001 - El usuario debería poder crear un nuevo miembro exitosamente', async ({ page }) => {
    const memberName = 'John Doe';
    const memberEmail = 'john.doe@example.com';
    const confirmationText = 'Created';
    const note = 'this is a note';

    // When El usuario crea un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateNewMember(memberName, memberEmail,note);

    // Then El sistema verifica si el miembro se ha creado exitosamente.
    const createdText = await member.ValidateMemberIsCreated();
    expect(createdText).toContain(confirmationText);
    await page.screenshot({ path: afterPath });
    await member.navigateToCreateMember()

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});

test.describe('Modificar un miembro', () => {
  let memberPage: Member;
  let loginPage: LoginPage;

  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);
    
    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
    }
  });

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
    await page.screenshot({ path: beforePath });
  });

  test.afterEach(async ({})=>{
    await memberPage.deleteMember()
  })

  test('MM001 - El usuario debería poder editar la información del miembro', async ({ page }) => {
    const editedName = 'Carlos Turks';

    // When El usuario modifica un miembro.
    await memberPage.EditAMember(editedName);

    // Then El sistema verifica si el nombre del miembro se ha actualizado.
    const modifiedName = await memberPage.ValidateMemberIsModified();
    expect(modifiedName).toBe(editedName);
    await page.screenshot({ path: afterPath });
    await memberPage.navigateToCreateMember()

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('MM002 - El usuario debería recibir un mensaje error al modificar un miembro datos invalidos', async ({ page }) => {
    const memberName = 'Patrick Jordan';
    const memberEmailInvalid = 'patrick.doeexample.com';
    const confirmationText = 'Retry';
    const note = 'this is a note';

    // When El usuario trata de modificar un nuevo miembro.
    await memberPage.navigateToCreateMember()
    await memberPage.EditAMember(memberName, memberEmailInvalid, note);

    // Then El sistema impide la modificacion de un nuevo miembro.
    const createdText = await memberPage.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
    await page.screenshot({ path: afterPath });
    await memberPage.navigateToMemberInvalid();

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});

