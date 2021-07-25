'use strict';

const CategoryController = require('../../controllers/CategoryController.js');
const { mockRequest, mockResponse } = require('../interceptors.js');
const {
    EXISTING_PARENT_CATEGORY,
    EXISTING_CATEGORY,
    UNEXISTING_CATEGORY,
} = require('../config.js');

describe('CategoryPage testing', () => {
    test('it renders using object without error for existing category', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = EXISTING_PARENT_CATEGORY;

        await CategoryController.CategoryPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.not.objectContaining({
                error: expect.any(String),
            })
        );
    });

    test('it redirects for category with no children', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = EXISTING_CATEGORY;

        await CategoryController.CategoryPage(req, res);
        const { render, redirect } = res;

        expect(render).toHaveBeenCalledTimes(0);
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.any(String));
    });

    test('it renders using object with error for unexisting category', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = UNEXISTING_CATEGORY;

        await CategoryController.CategoryPage(req, res);
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
