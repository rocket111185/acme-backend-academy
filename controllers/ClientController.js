'use strict';

const FetchServices = require('../services/FetchServices');

async function MainPage(req, res) {
    try {
        const header = await FetchServices.fetchChildCategories();
        const { error } = header;

        if (error) {
            return res.render('error', {
                error,
            });
        }

        res.render('home', {
            header,
        });
    } catch (error) {
        console.log(error);
    }
}

async function CategoryPage(req, res) {
    try {
        const categoryName = req.params.id;

        const childCategories = await FetchServices.fetchChildCategories(
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

        const header = await FetchServices.fetchChildCategories();
        const currentCategory = await FetchServices.fetchCategory(categoryName);

        res.render('category', {
            header,
            currentCategory,
            childCategories,
        });
    } catch (error) {
        console.log(error);
    }
}

async function ItemListPage(req, res) {
    try {
        const categoryName = req.params.id;
        const pageNumber = req.query.page;

        const itemlist = await FetchServices.fetchProductList(
            categoryName,
            pageNumber
        );
        const { error } = itemlist;

        if (error) {
            return res.render('error', {
                error,
                reasons: [
                    'There are no products for this category',
                    `There is no category ${categoryName}`,
                    'The Internet connection is unstable',
                ],
            });
        }

        const header = await FetchServices.fetchChildCategories();
        const currentCategory = await FetchServices.fetchCategory(categoryName);

        res.render('itemlist', {
            header,
            currentCategory,
            itemlist,
        });
    } catch (error) {
        console.log(error);
    }
}

async function ItemPage(req, res) {
    try {
        const itemId = req.params.id;

        const item = await FetchServices.fetchProduct(itemId);
        const { error } = item;

        if (error) {
            return res.render('error', {
                error,
                reasons: [
                    `There is no item with id "${itemId}"`,
                    'The Internet connection is unstable',
                ],
            });
        }

        const category = await FetchServices.fetchCategory(
            item.primary_category_id
        );
        const header = await FetchServices.fetchChildCategories();

        res.render('item', {
            header,
            category,
            item,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    MainPage,
    CategoryPage,
    ItemListPage,
    ItemPage,
};
