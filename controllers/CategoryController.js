'use strict';

const CategoryServices = require('../services/CategoryServices');

async function CategoryPage(req, res) {
  try {
    const categoryName = req.params.id;

    const currentCategory = await CategoryServices.fetchCategory(categoryName);
    const { error } = currentCategory;

    if (error) {
      return res.render('error', {
        error,
        reasons: [
          `There is no category "${categoryName}"`,
          'The Internet connection is unstable',
        ],
      });
    }

    const childCategories = await CategoryServices.fetchChildCategories(
      categoryName
    );

    if (!childCategories.length) {
      return res.redirect(`../itemlist/${categoryName}`);
    }

    const header = await CategoryServices.fetchChildCategories();

    const { token } = req.cookies;
    const redirect = req.originalUrl.split('?').shift();

    res.render('category', {
      header,
      currentCategory,
      childCategories,
      token,
      redirect,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  CategoryPage,
};
