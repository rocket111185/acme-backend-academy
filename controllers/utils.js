'use strict';

const ItemServices = require('../services/ItemServices');

async function generateCompleteItemList(itemlist) {
    const result = [];

    for (const element of itemlist) {
        const item = await ItemServices.fetchItem(element.productId);
        for (const key in element) {
            item[key] = element[key];
        }
        result.push(item);
    }

    return result;
}

async function findVariantId(item) {
    const { productId } = item;
    const { variants } = await ItemServices.fetchItem(productId)

    for (const variant of variants) {
        let found = true;
        const variations = variant.variation_values;
        for (const property in variations) {
            if (variations[property] !== item[property]) {
                found = false;
                break;
            }
        }
        if (found) {
            return variant.product_id;
        }
    }
}

module.exports = {
    generateCompleteItemList,
    findVariantId,
};
