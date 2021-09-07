const config = require('../protractor.conf.js');
const EC = protractor.ExpectedConditions;

//file with different methods for tests (click, wait until element visible, wait until element invisible, sendKeys, and other)
let CommonHelper = function() {

    this.clearSessionStorage = async function () {
        await browser.executeScript('window.sessionStorage.clear();');
    };

    this.clearLocalStorage = async function () {
        await browser.executeScript('window.localStorage.clear();');
    };

    this.clearCookies = async function () {
        await browser.manage().deleteAllCookies();
    };

    this.clearAllData = async function () {
        await this.clearSessionStorage();
        await this.clearLocalStorage();
        await this.clearCookies();
    };

    this.clear = async function (element) {
        await browser.executeScript('return arguments[0].value', element).then(async function (text) {
            let len = text.length;
            let backspaceSeries = await Array(len+1).join(protractor.Key.BACK_SPACE);
            await element.sendKeys(backspaceSeries);
        });
    };

    this.waitUntilElement = async function (func, message, timeout = config.config.allScriptsTimeout) {
        await browser.driver.wait(func, timeout, message);
    };

    this.waitUntilElementVisible = async function (element, message, timeout) {
        await this.waitUntilElement(EC.visibilityOf(element), message, timeout);
    };

    this.waitUntilElementClickable = async function (element, message, timeout) {
        await this.waitUntilElement(EC.elementToBeClickable(element), message, timeout);
    };

    this.sendKeys = async function (element, input) {
        await this.waitUntilElementVisible(element, `The "${element}" field is not visible`);
        await this.clear(element);
        await element.sendKeys(input);
    };

    this.click = async function (element, message) {
        message = message ? message : `The "${browser.executeScript('return arguments[0].outerText', element)}" button is not clickable`;
        await this.waitUntilElementClickable(element, message);
        await element.click();
    };

    this.urlIs = async function (url, message, timeout) {
        let to = timeout ? timeout : config.config.allScriptsTimeout;
        message = message ? message : `The "${url}" current url is not visible`;
        let EC = protractor.ExpectedConditions;
        await browser.driver.wait(EC.urlIs(url), to, message);
    };
};

module.exports = new CommonHelper();
