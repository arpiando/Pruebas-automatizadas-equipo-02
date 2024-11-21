import { test, expect } from '@playwright/test';
import { Member } from '../pages/member';
import { LoginPage } from '../pages/login';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from "../vrt.config";
import { fetchMockarooData } from "../index.js"

test.describe('Crear un miembro', () => {
  let member: Member;
  let loginPage: LoginPage;
  
  let beforePath = "";
  let afterPath = "";
  let comparePath = "";

  let mockarooData = [];

  test.beforeAll(async ({ browserName }, testInfo) => {
    beforePath = testInfo.outputPath(`before-${browserName}.png`);
    afterPath = testInfo.outputPath(`after-${browserName}.png`);
    comparePath = testInfo.outputPath(`compare-${browserName}.png`);

    if (!beforePath || !afterPath || !comparePath) {
      throw new Error('Paths for screenshots are not properly set.');
    }

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
    await page.screenshot({ path: beforePath });
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
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('CM002 - El usuario debería recibir un mensaje error al crear un miembro con email invalido', async ({ page }) => {
    const memberName = mockarooData[1].first_name;
    const memberEmailInvalid = mockarooData[1].email;
    const memberNote = mockarooData[1].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmailInvalid,memberNote);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });

  test('CM003 - El usuario debería recibir un mensaje error al crear un miembro con nota invalida', async ({ page }) => {
    const memberName = mockarooData[18].first_name;
    const memberEmail = mockarooData[18].email;
    const memberNoteInvalid = mockarooData[18].note;
    const confirmationText = 'Retry';

    // When El usuario trata de crear un nuevo miembro.
    await member.navigateToCreateMember()
    await member.CreateMemberInvalid(memberName, memberEmail,memberNoteInvalid);

    // Then El sistema impide la creacion de un nuevo miembro.
    const createdText = await member.ValidateMemberIsInvalid();
    expect(createdText).toContain(confirmationText);
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
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
     await page.screenshot({ path: afterPath });
 
     const img1 = PNG.sync.read(fs.readFileSync(beforePath));
     const img2 = PNG.sync.read(fs.readFileSync(afterPath));
 
     const { width, height } = img1;
     const diff = new PNG({ width, height });
 
     pixelmatch(img1.data, img2.data, diff.data, width, height, options);
     fs.writeFileSync(comparePath, PNG.sync.write(diff));
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
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
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
    await page.screenshot({ path: afterPath });

    const img1 = PNG.sync.read(fs.readFileSync(beforePath));
    const img2 = PNG.sync.read(fs.readFileSync(afterPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(comparePath, PNG.sync.write(diff));
  });
});
