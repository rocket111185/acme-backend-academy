'use strict';

const CategoryServices = require('../services/CategoryServices');
const ItemServices = require('../services/ItemServices');

async function ItemListPage(req, res) {
    try {
        const categoryName = req.params.id;
        const pageNumber = req.query.page;

        const itemlist = await ItemServices.fetchItemList(
            categoryName,
            pageNumber
        );
        const { error } = itemlist;

        if (error) {
            return res.render('error', {
                error,
                reasons: [
                    'There are no products for this category',
                    `There is no category "${categoryName}"`,
                    'The Internet connection is unstable',
                ],
            });
        }

        const header = await CategoryServices.fetchChildCategories();
        const currentCategory = await CategoryServices.fetchCategory(
            categoryName
        );

        const { token } = req.cookies;
        const redirect = req.originalUrl;

        res.render('itemlist', {
            header,
            currentCategory,
            itemlist,
            token,
            redirect,
        });
    } catch (error) {
        console.error(error);
    }
}

async function ItemPage(req, res) {
    try {
        const itemId = req.params.id;

        const item = await ItemServices.fetchItem(itemId);
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

        const category = await CategoryServices.fetchCategory(
            item.primary_category_id
        );
        const header = await CategoryServices.fetchChildCategories();

        const { token } = req.cookies;
        const redirect = req.originalUrl;

        res.render('item', {
            header,
            category,
            item,
            token,
            redirect,
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    ItemListPage,
    ItemPage,
};
