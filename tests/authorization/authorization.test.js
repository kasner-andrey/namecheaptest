const pageObject = require('../../page_objects/pages.js').container.PageObject;
const commonHelper = require('../../helpers/common.helper.js');

const signInPage = pageObject.getSignInPage();
const mainMenuPage = pageObject.getMainMenuPage();
const profilePage = pageObject.getProfilePage();

// feature Name
describe('Authorization user',  () => {

    //data at config.data.json
    const url = browser.params.baseUrl;
    const email = browser.params.user.email;
    const password = browser.params.user.password;

//first scenarios
    describe('Authorization page. Not registered user', () => {

        //data for local scenarios
        const wrongEmail = 'not_register_email@anydomain.com';
        const wrongPassword = 'not_register_password';
        const errorMessage = 'Uh oh! Email or password is incorrect';

        //precondition scenario
        beforeAll(async () => {
            await browser.get(url);
        });

        //use after scenario
        afterAll(async () => {
            await commonHelper.clearAllData(); //clear cookie
        });

        //verify current url with default url
        it('Verify Open Home page', async () => {
            await commonHelper.urlIs(url);
        });

        //go to authorization page and verify current url
        it('Open authorization page and verify url', async () => {
            await mainMenuPage.clickLoginButton();
            await commonHelper.urlIs(`${url}authorize`);
        });

        //fill fields wrong data and verify wrote password with default after view
        it('Filling in the fields and verify the displayed password', async () => {
            await signInPage.fillLoginField(wrongEmail, wrongPassword);
            await signInPage.clickViewPasswordButton();
            expect(await signInPage.getPassword()).toEqual(wrongPassword);
        });

        //verify message after login with wrong email and password
        it('Verify errors messages after clicked login', async () => {
            await signInPage.clickLogInButton();
            expect(await signInPage.getInfoMessage()).toEqual(errorMessage);
        });
    });

    //second scenarios
    describe('Authorization page (Welcome back!)', () => {

        //button name user dropdown menu
        const loginDropdownButtonName = ['Orders history', 'Profile', 'Funds', 'Log out'];

        beforeAll(async () => {
            await browser.get(url);
        });

        afterAll(async () => {
            await commonHelper.clearAllData();
        });

        it('Verify Open Home page', async () => {
            await commonHelper.urlIs(url);
        });

        it('Open authorization page and verify url', async () => {
            await mainMenuPage.clickLoginButton();
            await commonHelper.urlIs(`${url}authorize`);
        });

        //verify password after view and login with correct email and password
        it('Filling in the fields and verify the displayed password', async () => {
            await signInPage.fillLoginField(email, password);
            await signInPage.clickViewPasswordButton();
            expect(await signInPage.getPassword()).toEqual(password);
            await signInPage.clickLogInButton();
        });

        //verify current url and user name after login
        it('Verify UserName after login', async () => {
            await commonHelper.urlIs(`${url}user/bundles`);
            await mainMenuPage.verifyLoginIsVisible(email);
        });

        //verify user menu after click on login button in cycle
        it('Verify Dropdown user menu ', async () => {
            await mainMenuPage.clickLoginButton(email);
            for (let i = 0; i < loginDropdownButtonName.length; i++) {
                await mainMenuPage.verifyLoginMenuDropdownIsVisible(loginDropdownButtonName[i]);
            }
        });
    });

    // verify user profile
    describe('My profile page. Client area', () => {

        // profile button
        const buttonProfile = 'Profile';
        //correct data user profile
        const userData = {
            "Name" : "Tom Ford",
            "Email" : email,
            "Password" : "*****",
            "Phone" : "+380 12312312",
            "Address" : "Diagon alley 21, Misto, Uryupinsk 612120, Ukraine",
            "Support pin" : "wUzL",
            "Newsletter" : "Include in mailing list",
        };

        beforeAll(async () => {
            await browser.get(url);
            await mainMenuPage.clickLoginButton();
            await signInPage.logIn(email, password);
        });

        afterAll(async () => {
            await commonHelper.clearAllData();
        });

        it('Go to the User Profile', async () => {
            await mainMenuPage.clickLoginButton(email);
            await mainMenuPage.clickLoginMenuDropdown(buttonProfile);
        });

        it('Verify Profile page URL', async () => {
            await commonHelper.urlIs(`${url}user/profile`);
        });

        //get current data for profile page and verify with correct data
        it('Verify User profile Data', async () => {
            let getUser = {};
            for (const dataKey in userData) {
                //create object with key as correct data
                getUser[dataKey] = await profilePage.getUserData(dataKey);
            }
            expect(getUser).toEqual(userData);
        });
    });
});
