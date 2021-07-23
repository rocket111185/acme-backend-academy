'use strict';

const { readdirSync } = require('fs');
const files = readdirSync('routes')
    .filter((file) => file !== 'index.js');

module.exports = function(app) {
    for (const file of files) {
        app.use('/', require(`./${file}`));
    }
};
