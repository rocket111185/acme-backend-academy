'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

async function fetchCart(token) {
  checkProperties({ token });

  const response = await wrappedAxios({
    method: 'get',
    url: '/cart',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

async function addItemToCart(token, productId, variantId, quantity = '1') {
  checkProperties({ token, productId, variantId, quantity });

  const response = await wrappedAxios({
    method: 'post',
    url: '/cart/addItem',
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
}

async function changeCartItemQuantity(token, productId, variantId, quantity) {
  checkProperties({ token, productId, variantId, quantity });

  const response = await wrappedAxios({
    method: 'post',
    url: '/cart/changeItemQuantity',
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
}

async function removeItemFromCart(token, productId, variantId) {
  checkProperties({ token, productId, variantId });

  const response = await wrappedAxios({
    method: 'delete',
    url: '/cart/removeItem',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      productId,
      variantId,
    },
  });

  return response;
}

module.exports = {
  fetchCart,
  addItemToCart,
  changeCartItemQuantity,
  removeItemFromCart,
};
