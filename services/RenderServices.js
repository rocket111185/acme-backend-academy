'use strict';

const getSymbolFromCurrency = require('currency-symbol-map');

const getCurrencySymbol = (symbol) => getSymbolFromCurrency(symbol);

const findPicture = (imageGroup, size) =>
    imageGroup.find((el) => el.view_type === size && !el.variation_value)
        .images[0];

const findAllPictures = (imageGroup, size) =>
    imageGroup.find((el) => el.view_type === size).images;

module.exports = {
    getCurrencySymbol,
    findPicture,
    findAllPictures,
};
