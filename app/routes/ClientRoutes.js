'use strict';

const express = require('express');
const routes = express.Router();
const ClientController = require('../controllers/ClientController');

routes.get('*', ClientController.renderPage);

module.exports = routes;
