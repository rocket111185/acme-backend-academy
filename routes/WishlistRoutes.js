'use strict';

const express = require('express');
const routes = express.Router();
const WishlistController = require('../controllers/WishlistController');

routes.get('/wishlist', WishlistController.ViewWishlist);
routes.post('/wishlist/add', WishlistController.AddItemToWishlist);
routes.post('/wishlist/remove', WishlistController.RemoveItemFromWishlist);
routes.post('/wishlist/changeQuantity', WishlistController.ChangeItemQuantity);
routes.post('/wishlist/moveToCart', WishlistController.MoveItemToCart);

module.exports = routes;
