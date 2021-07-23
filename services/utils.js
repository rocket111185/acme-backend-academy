'use strict';

const { SECRET_KEY, API_URL } = require('../config.js');

const axios = require('axios').create({
    baseURL: API_URL,
});

// So that, it doesn't throw errors for unsuccessful queries
async function wrappedAxios(parameters) {
    try {
        if (!parameters.params) {
            parameters.params = {};
        }
        parameters.params.secretKey = SECRET_KEY;

        const response = await axios(parameters);
        return response.data;
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        } else {
            return {
                error: response?.statusText || error.code,
            };
        }
    }
}

// The function accepts object with values
// and checks whether they are non-empty strings
function checkProperties(propertyList) {
    for (const key in propertyList) {
        const value = propertyList[key];
        if (!value || typeof value !== 'string') {
            throw new Error(`${key} should be a non-empty string`);
        }
    }
}


module.exports = {
    wrappedAxios,
    checkProperties,
};
