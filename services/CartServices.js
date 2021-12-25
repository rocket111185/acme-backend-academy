'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

const fetchCart = async (token) => {
  checkProperties({ token });

  const response = await wrappedAxios({
    method: 'get',
    url: '/cart',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const addItemToCart = async (token, productId, variantId, quantity = '1') => {
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
};

const changeCartItemQuantity = async (
  token,
  productId,
  variantId,
  quantity
) => {
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
};

const removeItemFromCart = async (token, productId, variantId) => {
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
};

module.exports = {
  fetchCart,
  addItemToCart,
  changeCartItemQuantity,
  removeItemFromCart,
};
