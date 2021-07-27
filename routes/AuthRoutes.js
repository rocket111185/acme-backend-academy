'use strict';

const express = require('express');
const routes = express.Router();
const AuthController = require('../controllers/AuthController');

routes.get('/login', AuthController.LoginPage);
routes.post('/login/signup', AuthController.SignUp);
routes.post('/login/signin', AuthController.SignIn);

module.exports = routes;
