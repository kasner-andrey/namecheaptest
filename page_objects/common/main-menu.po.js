'use strict';
const commonHelper = require('../../helpers/common.helper.js');

//page for main menu
class MainMenuPage {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    constructor() { };

    //login button in account for different users
    btnLogin (userEmail = 'Log in') {
        return element(by.cssContainingText('.ssls-toolbar__btn-text', userEmail));
    };

    //choose login menu button by button name
    btnLoginMenuDrp (buttonName) {
        return element(by.cssContainingText('.ssls-header-user-nav [type="button"]', buttonName));
    };

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    async clickLoginButton (userEmail) {
      await this.verifyLoginIsVisible(userEmail);
      await commonHelper.click(this.btnLogin(userEmail));
    };

    //verify that login button with user email is visible on page
    async verifyLoginIsVisible (userEmail) {
      await commonHelper.waitUntilElementVisible(this.btnLogin(userEmail),
                                        `The "${userEmail}" login button is not visible`);
    };

    async clickLoginMenuDropdown (buttonName) {
        await this.verifyLoginMenuDropdownIsVisible(buttonName);
        await commonHelper.click(this.btnLoginMenuDrp(buttonName));
    };

    async verifyLoginMenuDropdownIsVisible (buttonName) {
        await commonHelper.waitUntilElementVisible(this.btnLoginMenuDrp(buttonName),
                                          `The "${buttonName}" login menu dropdown button is not visible`);
    };
}

module.exports = MainMenuPage;