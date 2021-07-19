'use strict';

const express = require('express');
const routes = express.Router();
const ClientController = require('../controllers/ClientController');

routes.get('/', ClientController.MainPage);
routes.get('/category/:id', ClientController.CategoryPage);
routes.get('/category/itemlist/:id', ClientController.ItemListPage);
routes.get('/item/:id', ClientController.ItemPage);

module.exports = routes;
