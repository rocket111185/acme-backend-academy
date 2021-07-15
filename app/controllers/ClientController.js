'use strict';

const FetchServices = require('../services/FetchServices');

async function MainPage(req, res) {
    try {
        // Fetch smth
        res.render(data);
    } catch (error) {
        console.log(error);
    }
}

async function CategoryPage(req, res) {
    try {
        // Fetch smth
        res.render(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    MainPage,
    CategoryPage
};
