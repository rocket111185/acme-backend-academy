'use strict';

const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController');

routes.get('/cart', CartController.ViewCart);
routes.post('/cart/add', CartController.AddItemToCart);
routes.post('/cart/remove', CartController.RemoveItemFromCart);
routes.post('/cart/changeQuantity', CartController.ChangeItemQuantity);
routes.post('/cart/moveToWishlist', CartController.MoveItemToWishlist);

module.exports = routes;
