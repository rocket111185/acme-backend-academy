'use strict';

const querystring = require('querystring');
const AuthServices = require('../services/AuthServices');

const cookieSettings = {
  maxAge: 24 * 60 * 60 * 1000, // one day
  httpOnly: true,
};

const loginPage = async (req, res) => {
  try {
    if (!req.query.error && req.cookies.token) {
      req.query.error = 'Warning! You are already registered';
    }

    res.render('login', req.query);
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (req, res) => {
  try {
    const credentials = await AuthServices.signUp(req.body);
    const { redirect } = req.body;

    if (credentials.error) {
      credentials.page = 'signup';
      if (redirect) {
        credentials.redirect = redirect;
      }
      const params = querystring.stringify(credentials);
      return res.redirect(`../login?${params}`);
    }

    res.cookie('name', credentials.user.name, cookieSettings);
    res.cookie('token', credentials.token, cookieSettings);
    res.redirect(redirect || '..');
  } catch (error) {
    console.error(error);
  }
};

const signIn = async (req, res) => {
  try {
    const credentials = await AuthServices.signIn(req.body);
    const { redirect } = req.body;

    if (credentials.error) {
      credentials.page = 'signin';
      if (redirect) {
        credentials.redirect = redirect;
      }
      const params = querystring.stringify(credentials);
      return res.redirect(`../login?${params}`);
    }

    res.cookie('name', credentials.user.name, cookieSettings);
    res.cookie('token', credentials.token, cookieSettings);
    res.redirect(redirect || '..');
  } catch (error) {
    console.error(error);
  }
};

const logout = async (req, res) => {
  try {
    const { redirect } = req.query;

    res.clearCookie('name', cookieSettings);
    res.clearCookie('token', cookieSettings);

    res.redirect(redirect || '..');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  loginPage,
  signUp,
  signIn,
  logout,
};
