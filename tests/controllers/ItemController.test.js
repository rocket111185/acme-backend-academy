'use strict';

const ItemController = require('../../controllers/ItemController.js');
const { mockRequest, mockResponse } = require('../interceptors.js');
const {
    EXISTING_CATEGORY,
    UNEXISTING_CATEGORY,
    EXISTING_ITEM_ID,
    UNEXISTING_ITEM_ID,
} = require('../testconfig.js');

describe('ItemListPage testing', () => {
    test('it renders using object without error for existing category', async () => {
        const req = mockRequest({
            cookies: {
                token: 'THE-TOKEN',
                name: 'The Tester',
            },
            originalUrl: '/some/route',
            params: {
                id: EXISTING_CATEGORY,
            },
        });
        const res = mockResponse();

        await ItemController.ItemListPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.not.objectContaining({
                error: expect.any(String),
            })
        );
    });

    test('it renders using object with error for unexisting category', async () => {
        const req = mockRequest({
            cookies: {
                token: 'THE-TOKEN',
                name: 'The Tester',
            },
            originalUrl: '/some/route',
            params: {
                id: UNEXISTING_CATEGORY,
            },
        });
        const res = mockResponse();

        await ItemController.ItemListPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                error: expect.any(String),
                reasons: expect.any(Array),
            })
        );
    });
});

describe('ItemPage testing', () => {
    test('it renders using object without error for existing item', async () => {
        const req = mockRequest({
            cookies: {
                token: 'THE-TOKEN',
                name: 'The Tester',
            },
            originalUrl: '/some/route',
            params: {
                id: EXISTING_ITEM_ID,
            },
        });
        const res = mockResponse();

        await ItemController.ItemPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.not.objectContaining({
                error: expect.any(String),
            })
        );
    });

    test('it renders using object with error for unexisting item', async () => {
        const req = mockRequest({
            cookies: {
                token: 'THE-TOKEN',
                name: 'The Tester',
            },
            originalUrl: '/some/route',
            params: {
                id: UNEXISTING_ITEM_ID,
            },
        });
        const res = mockResponse();

        await ItemController.ItemPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                error: expect.any(String),
                reasons: expect.any(Array),
            })
        );
    });
});
