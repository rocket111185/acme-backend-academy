'use strict';

const express = require('express');
const routes = express.Router();
const WishlistController = require('../controllers/WishlistController');

routes.get('/wishlist', WishlistController.viewWishlist);
routes.post('/wishlist/add', WishlistController.addItemToWishlist);
routes.post('/wishlist/remove', WishlistController.removeItemFromWishlist);
routes.post('/wishlist/changeQuantity', WishlistController.changeItemQuantity);
routes.post('/wishlist/moveToCart', WishlistController.moveItemToCart);

module.exports = routes;
