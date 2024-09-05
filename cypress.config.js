const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 5000,
  retries: {
    runMode: 1,
    openMode: 0
  },
  env: {
    USER_LOGIN: 'test',
    USER_PASS: 'test',
    REGISTRATION_NAME: 'test',
    REGISTRATION_EMAIL: 'test@gmail.com',
    REGISTRATION_PASS: '1234',
    LOGIN_URL: 'https://enotes.pointschool.ru/login',
    CREATE_BASKET_URL: 'https://enotes.pointschool.ru/basket/create',
    CLEAR_BASKET_URL: 'http://enotes.pointschool.ru/basket/clear',
    GET_BASKET_URL: 'http://enotes.pointschool.ru/basket/get'
  },
  e2e: {
    baseUrl: 'https://enotes.pointschool.ru/',
    setupNodeEvents(on, config) {
      return config;
    }
  }
});