const Config = require('./config.data.json');
let App = Config.env[Object.keys(Config.env)[0]];

const init = function() {
  for (let i = 0; i < process.argv.length; i++) {
    let obj = process.argv[i];
    let match = obj.match(/^--env=(.*)$/);
    if (match && match.length > 0) {
      App = Config.env[match[1]];
    }
  }
};

init();

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const DescribeFailureReporter = require('protractor-stop-describe-on-failure');
let HtmlReporter = require("protractor-beautiful-reporter");

const specReporter = new SpecReporter({
  displayStacktrace: 'all',       // display stacktrace for each failed assertion, values: (all|specs|summary|none)
  displayFailuresSummary: false,  // display summary of all failures after execution
  displayPendingSummary: false,   // display summary of all pending specs after execution
  displaySuccessfulSpec: false,   // display each successful spec
  displayFailedSpec: true,        // display each failed spec
  displayPendingSpec: false,      // display each pending spec
  displaySpecDuration: true,      // display each spec duration
  displaySuiteNumber: true,       // display each suite number (hierarchical)
  colors: {
    success: 'green',
    failure: 'red',
    pending: 'blue'
  },
  prefixes: {
    success: '✓ ',
    failure: '✗ ',
    pending: '* '
  },
  customProcessors: []
});

const htmlReporter = new HtmlReporter({
  baseDirectory: "report",
  preserveDirectory: false,
  excludeSkippedSpecs: true,
  screenshotsSubfolder: "screenshots",
  jsonsSubfolder: "json",
  clientDefaults: {
    columnSettings: {
      warningTime: 5000,
      dangerTime: 10000,
      displaySessionId: false,
    },
    showTotalDurationIn: "header",
    totalDurationFormat: "hms",
  },
  sortFunction: function sortFunction(a, b) {
    if (a.instanceId < b.instanceId) return -1;
    else if (a.instanceId > b.instanceId) return 1;

    if (a.timestamp < b.timestamp) return -1;
    else if (a.timestamp > b.timestamp) return 1;

    return 0;
  },
}).getJasmine2Reporter();

exports.config = {

  directConnect: true,
  params: App,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--disable-extensions', '--disable-infobars', '--incognito', '--no-sandbox', '--test-type=browser',
        '--start-maximized', '--window-size=1600,1200'],
    }
  },

  frameworks: [
    'jasmine'
  ],

  allScriptsTimeout: 40000,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000,
    isVerbose: true,
    print: () => {}
  },

  suites: {
    all: [
      './tests/authorization/authorization.test.js'
    ],
    authorization: ['./tests/authorization/authorization.test.js'],
  },

  onPrepare: async () => {
    const remote = require('selenium-webdriver/remote');
    await browser.setFileDetector(new remote.FileDetector());

    await jasmine.getEnv().addReporter(htmlReporter);
    await jasmine.getEnv().addReporter(specReporter);
    await jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));

    await browser.waitForAngularEnabled(false);
    await browser.manage().timeouts().pageLoadTimeout(60000);
  },
};