'use strict';

const { ROOT_CATEGORY } = require('../config.js');
const { wrappedAxios, checkProperties } = require('./utils.js');

const fetchCategory = async (categoryId) => {
  checkProperties({ categoryId });

  const url =
    categoryId.toLowerCase() === 'all'
      ? '/categories'
      : `/categories/${categoryId}`;

  const response = await wrappedAxios({
    method: 'get',
    url,
  });

  return response;
};

const fetchChildCategories = async (parentId = ROOT_CATEGORY) => {
  checkProperties({ parentId });

  const response = await wrappedAxios({
    method: 'get',
    url: `/categories/parent/${parentId}`,
  });

  return response;
};

module.exports = {
  fetchCategory,
  fetchChildCategories,
};
