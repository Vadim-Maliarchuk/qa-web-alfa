const { defineConfig } = require('cypress');
require('dotenv').config();
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
    USER_LOGIN: process.env.USER_LOGIN,
    USER_PASS: process.env.USER_PASS,
    LOGIN_URL: process.env.LOGIN_URL,
    CREATE_BASKET_URL: process.env.CREATE_BASKET_URL,
    CLEAR_BASKET_URL: process.env.CLEAR_BASKET_URL,
    GET_BASKET_URL: process.env.GET_BASKET_URL,
  },
  e2e: {
    baseUrl: 'https://enotes.pointschool.ru/',
  }
});