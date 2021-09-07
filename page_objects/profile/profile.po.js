'use strict';
const commonHelper = require('../../helpers/common.helper.js');

class ProfilePage {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    constructor() { };

    //choose selector for different fields
    fieldUserData (field) {
        return element(by.xpath(`//*[text()="${field}"]/../..//*[@class="description"]/*[contains(@class, "text")]`));
    };

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------
//take value by field name
    async getUserData (field) {
        await commonHelper.waitUntilElementVisible(this.fieldUserData(field), `The "${field}" field is not visible`);
        return browser.executeScript('return arguments[0].innerText', this.fieldUserData(field));
    };
}

module.exports = ProfilePage;