'use strict';

const CategoryServices = require('../services/CategoryServices');

async function CategoryPage(req, res) {
    try {
        const categoryName = req.params.id;

        const childCategories = await CategoryServices.fetchChildCategories(
            categoryName
        );
        const { error } = childCategories;

        if (error) {
            return res.render('error', {
                error,
            });
        }

        if (!childCategories.length) {
            return res.redirect(`itemlist/${categoryName}`);
        }

        const header = await CategoryServices.fetchChildCategories();
        const currentCategory = await CategoryServices.fetchCategory(categoryName);

        res.render('category', {
            header,
            currentCategory,
            childCategories,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    CategoryPage,
};
