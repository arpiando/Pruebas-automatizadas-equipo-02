const background = {
  async getCurrentState(driver) {

    const initialColor = await driver.backgroundColor
    return initialColor === 'rgb(19, 20, 22)' ? 'dark' : 'light';
},

  async clickBackground(driver) {
    const toggleButton = await driver.$('.nightshift-toggle');
    await toggleButton.waitForClickable({ timeout: 5000 });
    await toggleButton.click();
}
};

module.exports = background;
