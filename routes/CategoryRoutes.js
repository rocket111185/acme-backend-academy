'use strict';

const express = require('express');
const routes = express.Router();
const CategoryController = require('../controllers/CategoryController');

routes.get('/category/:id', CategoryController.CategoryPage);

module.exports = routes;
