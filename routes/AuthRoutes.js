'use strict';

const express = require('express');
const routes = express.Router();
const AuthController = require('../controllers/AuthController');

routes.get('/login', AuthController.loginPage);
routes.post('/login/signup', AuthController.signUp);
routes.post('/login/signin', AuthController.signIn);
routes.get('/logout', AuthController.logout);

module.exports = routes;
