'use strict';

const ClientServices = require('../services/ClientServices');

function renderPage(req, res) {
    try {
        const page = ClientServices.renderPage(req.url);
        res.write(page);
        res.end();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    renderPage
};
