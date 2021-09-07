'use strict';
const commonHelper = require('../../helpers/common.helper.js');

class SignInPage {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    constructor() {

        this.inputEmail = $('input[name="email"]');

        this.inputPassword = $('input[name="password"]');

        this.btnEyePassword = $('.icon-eye');

        this.btnLogin = $('button[type="submit"]');

        this.infoMessage = $('.noty_message  .noty_text');

    };

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    async fillLoginField (email, password) {
      await commonHelper.sendKeys(this.inputEmail, email);
      await commonHelper.sendKeys(this.inputPassword, password);
    };

    async clickLogInButton () {
      await commonHelper.click(this.btnLogin);
    };
// function for quick login
    async logIn (email, password) {
        await this.fillLoginField(email, password);
        await this.clickLogInButton();
    };
// take password after view (it works if don't click view button)
    async getPassword () {
        await commonHelper.waitUntilElementVisible(this.inputPassword, 'The "Password" field is not visible');
        return browser.executeScript('return arguments[0].value', this.inputPassword);
    };

    async clickViewPasswordButton () {
      await commonHelper.click(this.btnEyePassword);
    };

//take message about wrong email or password
    async getInfoMessage () {
      await commonHelper.waitUntilElementVisible(this.infoMessage, 'The "Error message" field is not visible');
      return browser.executeScript('return arguments[0].innerText', this.infoMessage);
    };
}

module.exports = SignInPage;