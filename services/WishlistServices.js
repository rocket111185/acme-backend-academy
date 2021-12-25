'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

const fetchWishlist = async (token) => {
  checkProperties({ token });

  const response = await wrappedAxios({
    method: 'get',
    url: '/wishlist',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const addItemToWishlist = async (
  token,
  productId,
  variantId,
  quantity = '1'
) => {
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
    },
  });

  return response;
};

const changeWishlistItemQuantity = async (
  token,
  productId,
  variantId,
  quantity
) => {
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
    },
  });

  return response;
};

const removeItemFromWishlist = async (token, productId, variantId) => {
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
    },
  });

  return response;
};

module.exports = {
  fetchWishlist,
  addItemToWishlist,
  changeWishlistItemQuantity,
  removeItemFromWishlist,
};
