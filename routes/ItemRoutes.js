'use strict';

const express = require('express');
const routes = express.Router();
const ItemController = require('../controllers/ItemController');

routes.get('/itemlist/:id', ItemController.itemListPage);
routes.get('/item/:id', ItemController.itemPage);

module.exports = routes;
