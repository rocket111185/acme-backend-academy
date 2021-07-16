'use strict';

module.exports = function(app) {
    app.use('/users', require('./UserRoutes'));
    app.use('/', require('./ClientRoutes'));

    // fallthrough error handler
    app.use((err, req, res) => {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
          console.error(err.stack);
          res.status(res.sentry).send('Something broke!');
    });
};
