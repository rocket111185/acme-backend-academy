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

const findAllPictures = (imageGroup, size) => {
    const foundImageObjects = imageGroup.filter((el) => el.view_type === size);
    const preparedImageCollection = foundImageObjects.reduce(
        (acc, val) => [...acc, ...val.images],
        []
    );
    return preparedImageCollection;
};

const eq = (first, second) => first === second;

const urlencode = (key, value) => (value) ?
    '?' + querystring.stringify({ [key]: value }) :
    '';

module.exports = {
    getSymbolFromCurrency,
    findPicture,
    findAllPictures,
    eq,
    urlencode,
};
