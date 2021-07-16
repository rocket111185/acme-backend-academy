'use strict';

const FetchServices = require('../services/FetchServices');

async function MainPage(req, res) {
    try {
        const header = await FetchServices.fetchChildCategories();
        console.log({ header });
        res.render('home', {
            header,
        });
    } catch (error) {
        console.log(error);
    }
}

async function CategoryPage(req, res) {
    try {
        const header = await FetchServices.fetchChildCategories();
        res.render('catecory');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    MainPage,
    CategoryPage
};
