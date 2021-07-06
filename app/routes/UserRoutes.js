const express = require('express')
const routes = express.Router();
const UserController = require('../controllers/UserController');

routes.get('/helloWorld', UserController.helloWorld);
routes.get('/servicecall', UserController.controllerWithParams);


module.exports = routes;
