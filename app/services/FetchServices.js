'use strict';

const axios = require('axios').create({
    baseURL: 'https://osf-digital-backend-academy.herokuapp.com/api/',
});

// So that, it doesn't throw errors for unsuccessful queries
async function wrappedAxios(parameters) {
    try {
        const response = await axios(parameters);
        return response.data;
    } catch(error) {
        return error?.response?.data;
    }
}

const ROOT_CATEGORY = 'root';
const { SECRET_KEY } = process.env;

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


// Fetching functions

async function fetchCategory(categoryId) {
    checkProperties({ categoryId });

    const url = (categoryId.toLowerCase() === 'all') ?
        '/categories' :
        `/categories/${categoryId}`;

    const response = await wrappedAxios({
        method: 'get',
        url,
        params: {
            secretKey: SECRET_KEY,
        },
    });

    return response;
}

async function fetchChildCategories(parentId = ROOT_CATEGORY) {
    checkProperties({ parentId });

    const response = await wrappedAxios({
        method: 'get',
        url: `/categories/parent/${parentId}`,
        params: {
            secretKey: SECRET_KEY,
        },
    });

    return response;
}
