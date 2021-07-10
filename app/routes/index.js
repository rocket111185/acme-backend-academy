'use strict';

const path = require('path');
const express = require('express');
const svelteApp = require('../public/App.js');

module.exports = function(app) {
    // app.get('/', (req, res) => {
    //     res.send('Welcome to OSF Academy Backend Starter Kit. Have Fun!')
    // });

    app.use('/users', require('./UserRoutes'));
    // You can add others app.use with other route files

    app.use(express.static(path.join(__dirname, '..', 'public')));

    app.get('*', (req, res) => {
        const { html } = svelteApp.render({ url: req.url });

        res.write(`
        <!DOCTYPE html>
        <link rel='stylesheet' href='/global.css'>
        <link rel='stylesheet' href='/bundle.css'>
        <div id="app">${html}</div>
        <script src="/bundle.js"></script>
      `);

        res.end();
    });

    // fallthrough error handler
    app.use((err, req, res) => {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(err + '\n');
    });
};
