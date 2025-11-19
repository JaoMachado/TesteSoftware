const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    videoCompression: 32, // Qualidade de compressão (0-51, menor = melhor qualidade)
    videosFolder: 'cypress/videos', // Pasta onde os vídeos serão salvos
  },
});