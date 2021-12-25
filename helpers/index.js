'use strict';

const querystring = require('querystring');
const getSymbolFromCurrency = require('currency-symbol-map');

const findPicture = (imageGroup, size) => {
  const foundImageObject = imageGroup.find(
    (el) => el.view_type === size && !el.variation_value
  );
  if (foundImageObject) {
    return foundImageObject.images[0];
  }
};

const findAllPictures = (imageGroup, size, variation = 'all') => {
  const foundImageObjects = imageGroup.filter((el) => {
    const variantBool =
      variation === 'all' ? true : el.variation_value === variation;
    const sizeBool = el.view_type === size;
    return sizeBool && variantBool;
  });

  const preparedImageCollection = foundImageObjects.reduce(
    (acc, val) => [...acc, ...val.images],
    []
  );

  return preparedImageCollection;
};

const generateProperties = (variant, variantList) => {
  const result = [];
  for (const key in variant) {
    const valueList = variantList.find((el) => el.id === key);
    const { name, values } = valueList;
    const value = values.find((el) => el.value === variant[key]).name;
    result.push({ name, value });
  }
  return result;
};

const eq = (first, second) => first === second;

const urlencode = (key, value) =>
  (value ? '?' + querystring.stringify({ [key]: value }) : '');

module.exports = {
  getSymbolFromCurrency,
  findPicture,
  findAllPictures,
  generateProperties,
  eq,
  urlencode,
};
