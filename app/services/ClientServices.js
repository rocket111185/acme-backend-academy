'use strict';

const svelteApp = require('../public/App.js');

function renderPage(url) {
    const { html } = svelteApp.render({ url });

    return `
        <!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
            <link rel='stylesheet' href='/bundle.css'>
        </head>
        <body>
            <div id="app">${html}</div>
            <script src="/bundle.js"></script>
        </body>
        </html>
    `;
}

module.exports = {
    renderPage
};
