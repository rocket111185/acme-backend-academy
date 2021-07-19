'use strict';

const ROOT_CATEGORY = 'root';
const { SECRET_KEY } = process.env;
const API_URL = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const SENTRY_KEY = 'fb68865d8a924811b03b28eaa6d5cff9@o923734.ingest';
const SENTRY_PROJECT_ID = '5871387';

module.exports = {
    ROOT_CATEGORY,
    SECRET_KEY,
    API_URL,
    SENTRY_KEY,
    SENTRY_PROJECT_ID,
};
