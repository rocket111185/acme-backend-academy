'use strict';

const svelteApp = require('../public/App.js');

function renderPage(url) {
    const { html } = svelteApp.render({ url });

    return `
        <!DOCTYPE html>
        <link rel='stylesheet' href='/bundle.css'>
        <div id="app">${html}</div>
        <script src="/bundle.js"></script>
    `;
}

module.exports = {
    renderPage
};
