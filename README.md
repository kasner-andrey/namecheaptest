## Running end-to-end tests

### Installation of environment Mac
Run `npm install`
Run `./node_modules/protractor/bin/webdriver-manager update`

### Installation of environment Windows
Run `npm install`
Run `webdriver-manager update`

### Update webdriver-manager to specific version
Run `./node_modules/protractor/bin/webdriver-manager update --versions.chrome=<VERSION>`
Run `./node_modules/protractor/bin/webdriver-manager status` to check webdriver-manager version

### Tests execution

### To easily run tests
### Windows
Double-click on file: scripts-for-run/windows-run.bat
### Mac
# For using script, you should to make the "mac-run.bash" file executable.
# go to the directory with file in terminal and use command:
chmod mac-run.sh
Double-click on file: scripts-for-run/mac-run.sh

### Tests execution for Windows
Run specific suite debug: `protractor protractor.conf.js --suite=all --env=debug --disableChecks`
Run specific suite dev: : `protractor protractor.conf.js --suite=all --env=dev --disableChecks`

### Tests execution for Mac
Run specific suite debug: `./node_modules/protractor/bin/protractor protractor.conf.js --suite=all --env=debug --disableChecks`
Run specific suite dev: : `./node_modules/protractor/bin/protractor protractor.conf.js --suite=all --env=dev --disableChecks`

### Report
You can see HTML report after run tests in "report" folder, click report.html