'use strict';

const app = require('../index.js');
const { port } = app.address();

const axios = require('axios').create({
    baseURL: `http://localhost:${port}`,
});

const secretKey = require('../config.js').SECRET_KEY;
const {
    EXISTING_CATEGORY,
    EXISTING_PARENT_CATEGORY,
    UNEXISTING_CATEGORY,
    EXISTING_ITEM_ID,
    UNEXISTING_ITEM_ID,
} = require('./testconfig.js');

afterAll(() => {
    app.close();
});

describe('Root endpoint tests', () => {
    test('it returns an HTML page containing "Welcome"', async () => {
        const { data } = await axios({
            method: 'get',
            url: '/',
        });

        expect(data).toContain('Welcome');
    });
});

describe('Category page tests', () => {
    test('HTML page contains jumbotron for parent category', async () => {
        const { data } = await axios({
            method: 'get',
            url: `/category/${EXISTING_PARENT_CATEGORY}`,
        });

        expect(data).not.toContain('Oops');
        expect(data).toContain('jumbotron');
    });

    test(
        'HTML page does not contain jumbotron for child category',
        async () => {
            const { data } = await axios({
                method: 'get',
                url: `/category/${EXISTING_CATEGORY}`,
            });

            expect(data).not.toContain('Oops');
            expect(data).not.toContain('jumbotron');
        }
    );

    test(
        'HTML page contains error for unexisting category',
        async () => {
            const { data } = await axios({
                method: 'get',
                url: `/category/${UNEXISTING_CATEGORY}`,
            });

            expect(data).toContain('Oops');
        }
    );
});

describe('Item list page tests', () => {
    test(
        'HTML page contains cards for valid category',
        async () => {
            const { data } = await axios({
                method: 'get',
                url: `/category/itemlist/${EXISTING_CATEGORY}`,
            });

            expect(data).not.toContain('Oops');
            expect(data).toContain('card');
        }
    );

    test(
        'HTML page contains error for unexisting category',
        async () => {
            const { data } = await axios({
                method: 'get',
                url: `/category/itemlist/${UNEXISTING_CATEGORY}`,
            });

            expect(data).toContain('Oops');
        }
    );
});

describe('Item page tests', () => {
    test(
        'HTML page contains "Buy Now" for valid item',
        async () => {
            const { data } = await axios({
                method: 'get',
                url: `/item/${EXISTING_ITEM_ID}`,
            });

            expect(data).not.toContain('Oops');
            expect(data).toContain('Buy Now');
        }
    );

    test(
        'HTML page contains error for unexisting item',
        async () => {
            const { data } = await axios({
                method: 'get',
                url: `/item/${UNEXISTING_ITEM_ID}`,
            });

            expect(data).toContain('Oops');
        }
    );
});
