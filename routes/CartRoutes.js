'use strict';

const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController');

routes.get('/cart', CartController.viewCart);
routes.post('/cart/add', CartController.addItemToCart);
routes.post('/cart/remove', CartController.removeItemFromCart);
routes.post('/cart/changeQuantity', CartController.changeItemQuantity);
routes.post('/cart/moveToWishlist', CartController.moveItemToWishlist);

module.exports = routes;
