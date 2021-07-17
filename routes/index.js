'use strict';

module.exports = function(app) {
    app.use('/', require('./ClientRoutes'));

    // fallthrough error handler
    app.use((err, req, res, next) => {
        if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' });
        } else {
            next(err);
        }
    });
};
