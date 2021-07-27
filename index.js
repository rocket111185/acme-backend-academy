'use strict';

const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const helpers = require('./helpers');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const { SENTRY_KEY, SENTRY_PROJECT_ID } = require('./config.js');

Sentry.init({
    dsn: `https://${SENTRY_KEY}.sentry.io/${SENTRY_PROJECT_ID}`,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// START OF NON-SENTRY MIDDLEWARES

app.use(express.static('public'));

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers,
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


require('./routes')(app);

// END OF NON-SENTRY MIDDLEWARES

app.use(Sentry.Handlers.errorHandler());

const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});

module.exports = listener;
