'use strict';

const { ROOT_CATEGORY } = require('../config.js');
const { wrappedAxios, checkProperties } = require('./utils.js');

async function fetchCategory(categoryId) {
    checkProperties({ categoryId });

    const url =
        categoryId.toLowerCase() === 'all' ?
            '/categories' :
            `/categories/${categoryId}`;

    const response = await wrappedAxios({
        method: 'get',
        url,
    });

    return response;
}

async function fetchChildCategories(parentId = ROOT_CATEGORY) {
    checkProperties({ parentId });

    const response = await wrappedAxios({
        method: 'get',
        url: `/categories/parent/${parentId}`,
    });

    return response;
}

module.exports = {
    fetchCategory,
    fetchChildCategories
};
