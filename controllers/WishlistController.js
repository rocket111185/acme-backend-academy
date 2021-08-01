'use strict';

const querystring = require('querystring');
const WishlistServices = require('../services/WishlistServices');
const CategoryServices = require('../services/CategoryServices');
const CartServices = require('../services/CartServices');
const { generateCompleteItemList, findVariantId } = require('./utils.js');

async function ViewWishlist(req, res) {
    try {
        const { token } = req.cookies;

        if (!token) {
            const params = querystring.stringify({ redirect: '/wishlist' });
            return res.redirect(`/login?${params}`);
        }

        const header = await CategoryServices.fetchChildCategories();
        const wishlist = await WishlistServices.fetchWishlist(token);

        const wishlistError = wishlist.error;
        if (wishlistError) {
            return res.render('wishlist', {
                wishlistError,
                header,
                token,
            });
        }

        const wishlistItems = await generateCompleteItemList(wishlist.items);

        const { error, success } = req.query;
        res.render('wishlist', {
            header,
            wishlistItems,
            token,
            error,
            success,
        });
    } catch (error) {
        console.error(error);
    }
}

async function AddItemToWishlist(req, res) {
    try {
        const { redirect, productId, quantity } = req.body;
        const { token } = req.cookies;

        if (!token) {
            const params = querystring.stringify({ redirect });
            return res.redirect(`/login?${params}`);
        }

        const variantId = await findVariantId(req.body);

        if (!variantId) {
            const params = querystring.stringify({
                error: 'Try another variant of item',
            });
            return res.redirect(`${redirect}?${params}`);
        }

        const { error } = await WishlistServices.addItemToWishlist(
            token,
            productId,
            variantId,
            quantity
        );

        const params = querystring.stringify(
            error ? { error } : { success: 'The item was added to wishlist' }
        );
        res.redirect(`${redirect}?${params}`);
    } catch (error) {
        console.error(error);
    }
}

async function RemoveItemFromWishlist(req, res) {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.render('error', {
                error: 'You are not registered. Login first',
            });
        }

        const { productId, variantId } = req.body;
        const { error } = await WishlistServices.removeItemFromWishlist(
            token,
            productId,
            variantId
        );

        const params = querystring.stringify(
            error ?
                { error } :
                { success: 'The item was removed from wishlist' }
        );
        res.redirect(`/wishlist?${params}`);
    } catch (error) {
        console.error(error);
    }
}

async function ChangeItemQuantity(req, res) {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.render('error', {
                error: 'You are not registered. Login first',
            });
        }

        const { productId, variantId, quantity } = req.body;
        const { error } = await WishlistServices.changeWishlistItemQuantity(
            token,
            productId,
            variantId,
            quantity
        );

        const params = querystring.stringify(
            error ? { error } : { success: 'The item quantity was changed' }
        );
        res.redirect(`/wishlist?${params}`);
    } catch {
        console.error(error);
    }
}

async function MoveItemToCart(req, res) {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.render('error', {
                error: 'You are not registered. Login first',
            });
        }

        const { productId, variantId, initialQuantity } = req.body;

        const cartResponse = await CartServices.addItemToCart(
            token,
            productId,
            variantId,
            initialQuantity
        );

        if (cartResponse.error) {
            const { error } = cartResponse;
            const params = querystring.stringify({ error });
            return res.redirect(`/wishlist?${params}`);
        }

        const wishlistResponse = await WishlistServices.removeItemFromWishlist(
            token,
            productId,
            variantId
        );

        const { error } = wishlistResponse;

        const params = querystring.stringify(
            error ? { error } : { success: 'The item was moved to cart' }
        );
        res.redirect(`/wishlist?${params}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    ViewWishlist,
    AddItemToWishlist,
    RemoveItemFromWishlist,
    ChangeItemQuantity,
    MoveItemToCart,
};
