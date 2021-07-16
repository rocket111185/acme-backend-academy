'use strict';

const axios = require('axios').create({
    baseURL: 'https://osf-digital-backend-academy.herokuapp.com/api/',
});

// So that, it doesn't throw errors for unsuccessful queries
async function wrappedAxios(parameters) {
    try {
        const response = await axios(parameters);
        return response.data;
    } catch (error) {
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

    const url =
        categoryId.toLowerCase() === 'all' ?
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

async function fetchProduct(productId) {
    checkProperties({ productId });

    const response = await wrappedAxios({
        method: 'get',
        url: '/products/product_search',
        params: {
            secretKey: SECRET_KEY,
            id: productId,
        },
    });

    return response;
}

async function fetchProductList(categoryId, pageNumber = '1') {
    checkProperties({ categoryId, pageNumber });

    const response = await wrappedAxios({
        method: 'get',
        url: '/products/product_search',
        params: {
            secretKey: SECRET_KEY,
            primary_category_id: categoryId,
            page: pageNumber,
        },
    });

    return response;
}

module.exports = {
    fetchCategory,
    fetchChildCategories,
    fetchProduct,
    fetchProductList
};

(async () => {
    const data = await fetchChildCategories();
    console.log(data);
})();
