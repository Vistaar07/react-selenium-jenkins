const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');

describe('React App Tests', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should have the "Learn React" link on the homepage', async function () {
    await driver.get('http://localhost:3000'); 
    const link = await driver.wait(until.elementLocated(By.linkText('Learn React')), 10000);
    const linkText = await link.getText();
    expect(linkText).to.equal('Learn React');
  });
});