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
        return this.fieldUserData(field).getAttribute('innerText');
    };
}

module.exports = ProfilePage;