'use strict';

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

module.exports = {
    getSymbolFromCurrency,
    findPicture,
    findAllPictures,
};
