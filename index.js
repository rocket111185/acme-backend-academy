'use strict';

const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const helpers = require('./services/RenderServices.js');

app.use(express.static('public'));

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

require('./routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;
