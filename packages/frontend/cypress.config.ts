import * as cypress_plugins from './cypress/plugins/index.js'

export default {
  chromeWebSecurity: false,
  defaultCommandTimeout: 5000,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return cypress_plugins(on, config)
    },
    baseUrl: 'http://localhost:4200',
    experimentalRunAllSpecs: true,
  },
}