'use strict';

const FetchServices = require('../services/FetchServices');

async function MainPage(req, res) {
    try {
        const header = await FetchServices.fetchChildCategories();

        if (header.error) {
            const { error } = header;
            res.render('error', {
                error,
            });
        } else {
            res.render('home', {
                header,
            });
        }
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

        if (childCategories.error) {
            const { error } = childCategories;
            res.render('error', {
                error,
            });
        } else {
            if (!childCategories.length) {
                res.redirect(`itemlist/${categoryName}`);
            }

            const header = await FetchServices.fetchChildCategories();
            const currentCategory = await FetchServices.fetchCategory(
                categoryName
            );

            res.render('category', {
                header,
                currentCategory,
                childCategories,
            });
        }
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

        if (itemlist.error) {
            const { error } = itemlist;
            res.render('error', {
                error,
            });
        } else {
            const header = await FetchServices.fetchChildCategories();
            const currentCategory = await FetchServices.fetchCategory(
                categoryName
            );

            res.render('itemlist', {
                header,
                currentCategory,
                itemlist,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function ItemPage(req, res) {
    try {
        const itemId = req.params.id;

        const item = await FetchServices.fetchProduct(itemId);

        if (item.error) {
            const { error } = item;
            res.render('error', {
                error,
            });
        } else {
            const category = await FetchServices.fetchCategory(
                item.primary_category_id
            );
            const header = await FetchServices.fetchChildCategories();

            res.render('item', {
                header,
                category,
                item,
            });
        }
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
