'use strict';

const querystring = require('querystring');
const CartServices = require('../services/CartServices');
const ItemServices = require('../services/ItemServices');
const CategoryServices = require('../services/CategoryServices');
const WishlistServices = require('../services/WishlistServices');
const { generateCompleteItemList, findVariantId } = require('./utils.js');

async function ViewCart(req, res) {
  try {
    const { token } = req.cookies;

    if (!token) {
      const params = querystring.stringify({ redirect: '/cart' });
      return res.redirect(`/login?${params}`);
    }

    const header = await CategoryServices.fetchChildCategories();
    const cart = await CartServices.fetchCart(token);

    const cartError = cart.error;
    if (cartError) {
      return res.render('cart', {
        cartError,
        header,
        token,
      });
    }

    const cartItems = await generateCompleteItemList(cart.items);

    const { error, success } = req.query;
    res.render('cart', {
      header,
      cartItems,
      token,
      error,
      success,
    });
  } catch (error) {
    console.error(error);
  }
}

async function AddItemToCart(req, res) {
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

async function RemoveItemFromCart(req, res) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.render('error', {
        error: 'You are not registered. Login first',
      });
    }

    const { productId, variantId } = req.body;
    const { error } = await CartServices.removeItemFromCart(
      token,
      productId,
      variantId
    );

    const params = querystring.stringify(
      error ? { error } : { success: 'The item was removed from cart' }
    );
    res.redirect(`/cart?${params}`);
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
    const { error } = await CartServices.changeCartItemQuantity(
      token,
      productId,
      variantId,
      quantity
    );

    const params = querystring.stringify(
      error ? { error } : { success: 'The item quantity was changed' }
    );
    res.redirect(`/cart?${params}`);
  } catch (error) {
    console.error(error);
  }
}

async function MoveItemToWishlist(req, res) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.render('error', {
        error: 'You are not registered. Login first',
      });
    }

    const { productId, variantId, initialQuantity } = req.body;

    const wishlistResponse = await WishlistServices.addItemToWishlist(
      token,
      productId,
      variantId,
      initialQuantity
    );

    if (wishlistResponse.error) {
      const { error } = wishlistResponse;
      const params = querystring.stringify({ error });
      return res.redirect(`/cart?${params}`);
    }

    const cartResponse = await CartServices.removeItemFromCart(
      token,
      productId,
      variantId
    );

    const { error } = cartResponse;

    const params = querystring.stringify(
      error ? { error } : { success: 'The item was moved to wishlist' }
    );
    res.redirect(`/cart?${params}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  ViewCart,
  AddItemToCart,
  RemoveItemFromCart,
  ChangeItemQuantity,
  MoveItemToWishlist,
};
