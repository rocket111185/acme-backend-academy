'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

const fetchOrders = async (token) => {
  checkProperties({ token });

  const response = await wrappedAxios({
    method: 'get',
    url: '/orders',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const createOrder = async (token, address, paymentId, items) => {
  checkProperties({ token, address, paymentId });
  if (!items?.length) {
    throw new Error('The order cannot be created with no items');
  }

  const response = await wrappedAxios({
    method: 'post',
    url: '/orders',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      address,
      paymentId,
      items,
    },
  });

  return response;
};

module.exports = {
  fetchOrders,
  createOrder,
};
