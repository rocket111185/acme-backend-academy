'use strict';

const AuthServices = require('../services/AuthServices');

async function LoginPage(req, res) {
    try {
        res.render('login');
    } catch(error) {
        console.error(error);
    }
}

async function SignUp(req, res) {
    try {
        res.send(JSON.stringify(req.body));
    } catch(error) {
        console.error(error);
    }
}

async function SignIn(req, res) {
    try {
        res.send(JSON.stringify(req.body));
    } catch(error) {
        console.error(error);
    }
}

module.exports = {
    LoginPage,
    SignUp,
    SignIn,
};
