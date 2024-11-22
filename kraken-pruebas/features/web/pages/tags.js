const tagManager = {
  selectors: {
    tagMenuSelector: 'a[href*="tags"]',//'a:has-text("Tags")', // Selector ajustado para mayor precisión
    newTagButton: 'a[href*="new"]',//'a:has-text("New tag")',// Selector ajustado para identificar el botón de "New tag"
    nameInputSelector: 'input.gh-input',
    saveTagButton: 'button.gh-btn.gh-btn-primary', // Más específico para botones de guardar
    tagNameSelector: '.gh-canvas-title',
    tagSelector: '.gh-list-data.gh-tag-list-title', // Selector simplificado
    buttonFailure: 'button.gh-btn.gh-btn-red', // Identificar botones de error
  },


  
  // Navegar al menú de creación de etiquetas
  async navigateToCreateTag(driver) {
    console.log('Navigating to Tags menu...');
    const tagLink = await driver.$(this.selectors.tagMenuSelector);
    await tagLink.waitForDisplayed({ timeout: 5000 });
    await tagLink.click();
  },

  // Crear una nueva etiqueta
  async createNewTag(driver) {
    const tagName = 'Nuevo Tag'; // Nombre del tag definido dentro del método
    console.log('Creating a new tag...');
    const newTagButton = await driver.$(this.selectors.newTagButton);
    await newTagButton.waitForDisplayed({ timeout: 5000 });
    await newTagButton.click();

    const nameInput = await driver.$(this.selectors.nameInputSelector);
    await nameInput.waitForDisplayed({ timeout: 5000 });
    await nameInput.setValue(tagName);

    const saveButton = await driver.$(this.selectors.saveTagButton);
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();

    await driver.pause(500); // Breve pausa para permitir que se procese
  },

  // Validar si la etiqueta se creó correctamente
  async validateTagIsCreated(driver) {
    console.log('Validating the new tag...');
    const tagNameElement = await driver.$(this.selectors.tagNameSelector);
    await tagNameElement.waitForDisplayed({ timeout: 5000 });
    const tagName = await tagNameElement.getText();
    console.log(`Tag created: ${tagName}`);
    return tagName;
  },

  // Editar solo el nombre de la etiqueta
async editTagName(driver, newTagName) {
  console.log('Editing the tag name...');

  // Selecciona el campo de entrada para el nombre de la etiqueta
  const nameInput = await driver.$(this.selectors.nameInputSelector);
  await nameInput.waitForDisplayed({ timeout: 5000 }); // Espera a que el campo esté visible
  await nameInput.setValue(''); // Limpia el campo de entrada antes de escribir el nuevo nombre
  await nameInput.setValue(newTagName); // Ingresa el nuevo nombre para la etiqueta

  // Selecciona el botón de guardar y espera a que esté visible
  const saveButton = await driver.$(this.selectors.saveTagButton);
  await saveButton.waitForDisplayed({ timeout: 5000 });
  await saveButton.click(); // Hace clic en el botón de guardar

  await driver.pause(500); // Pausa breve para permitir que se procese
},


  // Editar una etiqueta existente
  //async editTag(driver, newTagName) {
    //console.log('Editing an existing tag...');
    //const tagElement = await driver.$(this.selectors.tagSelector);
    //await tagElement.waitForDisplayed({ timeout: 5000 });
    //await tagElement.click();

    //const nameInput = await driver.$(this.selectors.nameInputSelector);
    //await nameInput.waitForDisplayed({ timeout: 5000 });
    //await nameInput.setValue(''); // Limpiar el campo antes de ingresar el nuevo nombre
    //await nameInput.setValue(newTagName);

    //const saveButton = await driver.$(this.selectors.saveTagButton);
    //await saveButton.waitForDisplayed({ timeout: 5000 });
    //await saveButton.click();

    //await driver.pause(500); // Breve pausa para permitir que se procese
  //},

  // Crear una etiqueta inválida (sin nombre)
  async createInvalidTag(driver) {
    console.log('Creating an invalid tag...');
    const newTagButton = await driver.$(this.selectors.newTagButton);
    await newTagButton.waitForDisplayed({ timeout: 5000 });
    await newTagButton.click();

    const nameInput = await driver.$(this.selectors.nameInputSelector);
    await nameInput.waitForDisplayed({ timeout: 5000 });
    await nameInput.setValue(''); // Sin nombre de etiqueta

    const saveButton = await driver.$(this.selectors.saveTagButton);
    await saveButton.waitForDisplayed({ timeout: 5000 });
    await saveButton.click();

    await driver.pause(500); // Breve pausa para permitir que se procese
  },

  // Validar que la etiqueta no fue creada
  async validateTagIsNotCreated(driver) {
    console.log('Validating tag creation failure...');
    const buttonFailure = await driver.$(this.selectors.buttonFailure);
    await buttonFailure.waitForDisplayed({ timeout: 5000 });
    const failureText = await buttonFailure.getText();
    console.log(`Tag creation failed: ${failureText}`);
    return failureText;
  },

  async reloadPage(driver) {
    await driver.refresh();
    await new Promise(resolve => setTimeout(resolve, 1000));
},

async tagSelection(driver) {
  const tagLink = await driver.$(this.selectors.tagMenuSelector);
  await tagLink.waitForDisplayed({ timeout: 5000 });
  await tagLink.click();
  const table = await driver.$('.tags-list.gh-list');
  await table.waitForDisplayed({ timeout: 6000 });
  const firstRow = await driver.$('.gh-list-row.gh-tags-list-item');
  await firstRow.waitForDisplayed({ timeout: 5000 });
  await firstRow.click();
},

async deleteTag(driver) {

  const deletePageButton = await driver.$('//span[contains(text(), "Delete")]');
  await deletePageButton.scrollIntoView();
  await deletePageButton.waitForClickable({ timeout: 5000 });
  await deletePageButton.click();

  const modal = await driver.$('.modal-content');
  await modal.waitForDisplayed({ timeout: 6000 });

  const confirmButton = await driver.$("//button[@data-test-button='confirm']");
  await confirmButton.waitForClickable({ timeout: 5000 });
  await confirmButton.click();

},

async validateTagIsDeleted(driver) {
  const membersList = await driver.$('.tags-list.gh-list');
  await membersList.waitForDisplayed({ timeout: 5000 });
},

};


module.exports = tagManager;
