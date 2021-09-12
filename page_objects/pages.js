
let PageObject = function () {

    this.getSignInPage = function () {
      const signInPage = require('./sign-in/sign-in.po.js');
      return new signInPage();
    };

    this.getMainMenuPage = function () {
        const mainMenuPage = require('./common/main-menu.po.js');
        return new mainMenuPage();
    };

    this.getProfilePage = function () {
        const profilePage = require('./profile/profile.po.js');
        return new profilePage();
    };
};

module.exports = new PageObject();