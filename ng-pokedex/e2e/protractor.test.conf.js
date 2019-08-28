// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { config } = require('./protractor.conf');
const puppeteer = require('puppeteer');

/**
 * @type { import("protractor").Config }
 */
const environmentConfig = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--headless" ],
      binary: puppeteer.executablePath()
    },
  },
  baseUrl: 'https://ng-pokedex.azurewebsites.net',
};

exports.config = Object.assign(config, environmentConfig);