'use strict';

const ROOT_CATEGORY = 'root';
const {
  SECRET_KEY,
  API_URL,
  SENTRY_KEY,
  SENTRY_PROJECT_ID,
} = process.env;

module.exports = {
  ROOT_CATEGORY,
  SECRET_KEY,
  API_URL,
  SENTRY_KEY,
  SENTRY_PROJECT_ID,
};
