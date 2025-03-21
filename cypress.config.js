const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges:false,
  e2e: {
    baseUrl:"https://winit.sbscuk.co.uk/public",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
