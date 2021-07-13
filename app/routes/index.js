'use strict';

const path = require('path');
const express = require('express');

module.exports = function(app) {
    app.use('/users', require('./UserRoutes'));
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use('/', require('./ClientRoutes'));

    // fallthrough error handler
    app.use((err, req, res) => {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(err + '\n');
    });
};
