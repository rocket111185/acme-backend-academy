'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

async function fetchItem(productId) {
    checkProperties({ productId });

    const response = await wrappedAxios({
        method: 'get',
        url: '/products/product_search',
        params: {
            id: productId,
        },
    });

    // The query returns an array, but we must return an element
    // Also an error object is posssible, so we need to check
    return response.error ? response : response[0];
}

async function fetchItemList(categoryId, pageNumber = '1') {
    checkProperties({ categoryId, pageNumber });

    const response = await wrappedAxios({
        method: 'get',
        url: '/products/product_search',
        params: {
            primary_category_id: categoryId,
            page: pageNumber,
        },
    });

    return response;
}

module.exports = {
    fetchItem,
    fetchItemList,
};
