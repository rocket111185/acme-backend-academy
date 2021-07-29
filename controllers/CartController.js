'use strict';

const querystring = require('querystring');
const CartServices = require('../services/CartServices');
const ItemServices = require('../services/ItemServices');

async function AddItemToCart(req, res) {
    try {
        const { redirect, productId, quantity } = req.body;
        const { token } = req.cookies;

        if (!token) {
            const params = querystring.stringify({ redirect });
            return res.redirect(`/login?${params}`);
        }

        const { variants } = await ItemServices.fetchItem(productId);
        let variantId;

        // Find id of the item variant
        // The search is based on multiple input form values
        for (const variant of variants) {
            let found = true;
            const variations = variant.variation_values;
            for (const property in variations) {
                if (variations[property] !== req.body[property]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                variantId = variant.product_id;
                break;
            }
        }

        if (!variantId) {
            const params = querystring.stringify({
                error: 'Try another variant of item',
            });
            return res.redirect(`${redirect}?${params}`);
        }

        const { error } = await CartServices.addItemToCart(
            token,
            productId,
            variantId,
            quantity
        );

        const params = querystring.stringify(
            error ? { error } : { success: 'The item was added to cart' }
        );
        res.redirect(`${redirect}?${params}`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    AddItemToCart,
};
