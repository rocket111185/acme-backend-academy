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

        res.render('home', {
            header,
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    MainPage,
};
