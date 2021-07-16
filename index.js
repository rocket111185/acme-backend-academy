'use strict';

const path = require('path');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.use(express.static('public'));

app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

require('./routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;
