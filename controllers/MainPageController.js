'use strict';

const CategoryServices = require('../services/CategoryServices');

async function MainPage(req, res) {
  try {
    const header = await CategoryServices.fetchChildCategories();
    const { error } = header;

    if (error) {
      return res.render('error', {
        error,
      });
    }

    const { name, token } = req.cookies;

    res.render('home', {
      header,
      name,
      token,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  MainPage,
};
