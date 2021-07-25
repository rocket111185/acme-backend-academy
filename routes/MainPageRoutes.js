'use strict';

const express = require('express');
const routes = express.Router();
const MainPageController = require('../controllers/MainPageController');

routes.get('/', MainPageController.MainPage);

module.exports = routes;
