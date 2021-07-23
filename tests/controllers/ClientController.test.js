'use strict';

const ClientController = require('../../controllers/ClientController.js');
const { mockRequest, mockResponse } = require('./interceptors.js');
const { JEST_EXTENDED_TIMEOUT } = require('../config.js');

describe('MainPage testing', () => {
    test('it calls render and passes object containing header', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await ClientController.MainPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.not.objectContaining({
                error: expect.any(String),
            })
        );
    });
});

describe('CategoryPage testing', () => {
    test(
        'it renders using object without error for category "mens"',
        async () => {
            const req = mockRequest();
            const res = mockResponse();
            req.params.id = 'mens';

            await ClientController.CategoryPage(req, res);
            const { render } = res;

            expect(render).toHaveBeenCalledTimes(1);
            expect(render).toBeCalledWith(
                expect.any(String),
                expect.not.objectContaining({
                    error: expect.any(String),
                })
            );
        }
    );

    test('it redirects for category with no children', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = 'this-category-not-exists';

        await ClientController.CategoryPage(req, res);
        const { render, redirect } = res;

        expect(render).toHaveBeenCalledTimes(0);
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.any(String));
    });
});

describe('ItemListPage testing', () => {
    test(
        'it renders using object without error for existing category',
        async () => {
            const req = mockRequest();
            const res = mockResponse();
            req.params.id = 'mens-clothing-jackets';

            await ClientController.ItemListPage(req, res);
            const { render } = res;

            expect(render).toHaveBeenCalledTimes(1);
            expect(render).toBeCalledWith(
                expect.any(String),
                expect.not.objectContaining({
                    error: expect.any(String),
                })
            );
        }
    );

    test(
        'it renders using object with error for unexisting category',
        async () => {
            const req = mockRequest();
            const res = mockResponse();
            req.params.id = 'this-category-not-exists';

            await ClientController.ItemListPage(req, res);
            const { render } = res;

            expect(render).toHaveBeenCalledTimes(1);
            expect(render).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    error: expect.any(String),
                    reasons: expect.any(Array),
                })
            );
        }
    );
});

describe('ItemPage testing', () => {
    test(
        'it renders using object without error for existing item',
        async () => {
            const req = mockRequest();
            const res = mockResponse();
            req.params.id = '25565189';

            await ClientController.ItemPage(req, res);
            const { render } = res;

            expect(render).toHaveBeenCalledTimes(1);
            expect(render).toBeCalledWith(
                expect.any(String),
                expect.not.objectContaining({
                    error: expect.any(String),
                })
            );
        }
    );

    test(
        'it renders using object with error for unexisting item',
        async () => {
            const req = mockRequest();
            const res = mockResponse();
            req.params.id = 'this-item-not-exists';

            await ClientController.ItemPage(req, res);
            const { render } = res;

            expect(render).toHaveBeenCalledTimes(1);
            expect(render).toBeCalledWith(
                expect.any(String),
                expect.objectContaining({
                    error: expect.any(String),
                    reasons: expect.any(Array),
                })
            );
        }
    );
});
