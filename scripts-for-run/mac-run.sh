#!/bin/sh
#go to into current folder
cd `dirname "$0"`
#go up one folder
cd ../
#scripts for run
git pull
npm install && npm run mac_update-webdriver && npm run mac_dev_locally