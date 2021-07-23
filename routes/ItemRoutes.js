'use strict';

const express = require('express');
const routes = express.Router();
const ItemController = require('../controllers/ItemController');

routes.get('/category/itemlist/:id', ItemController.ItemListPage);
routes.get('/item/:id', ItemController.ItemPage);

module.exports = routes;
