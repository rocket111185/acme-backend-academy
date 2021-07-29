'use strict';

const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController');

routes.post('/cart/add', CartController.AddItemToCart);

module.exports = routes;
