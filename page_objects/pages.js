let bottlejs = require('bottlejs').pop('test');

//file with all pages
bottlejs.factory('PageObject', function () {
    return {
        getSignInPage: () => {
            const signInPage = require('./sign-in/sign-in.po.js');
            return new signInPage();
        },
        getMainMenuPage: () => {
            const mainMenuPage = require('./common/main-menu.po.js');
            return new mainMenuPage();
        },
        getProfilePage: () => {
            const profilePage = require('./profile/profile.po.js');
            return new profilePage();
        },
    }
});

module.exports = bottlejs;