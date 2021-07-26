'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

async function fetchWishlist(token) {
    checkProperties({ token });

    const response = await wrappedAxios({
        method: 'get',
        url: '/wishlist',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
}

async function addItemToWishlist(token, productId, variantId, quantity = '1') {
    checkProperties({ token, productId, variantId, quantity });

    const response = await wrappedAxios({
        method: 'post',
        url: '/wishlist/addItem',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId,
            variantId,
            quantity,
        }
    });

    return response;
}

async function changeWishlistItemQuantity(token, productId, variantId, quantity) {
    checkProperties({ token, productId, variantId, quantity });

    const response = await wrappedAxios({
        method: 'post',
        url: '/wishlist/changeItemQuantity',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId,
            variantId,
            quantity,
        }
    });

    return response;
}

async function removeItemFromWishlist(token, productId, variantId) {
    checkProperties({ token, productId, variantId });

    const response = await wrappedAxios({
        method: 'delete',
        url: '/wishlist/removeItem',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId,
            variantId,
        }
    });

    return response;
}

module.exports = {
    fetchWishlist,
    addItemToWishlist,
    changeWishlistItemQuantity,
    removeItemFromWishlist
};
