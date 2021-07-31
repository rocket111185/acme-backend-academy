'use strict';

const MainPageController = require('../../controllers/MainPageController.js');
const { mockRequest, mockResponse } = require('../interceptors.js');

describe('MainPage testing', () => {
    test('it calls render and passes object containing header', async () => {
        const req = mockRequest({
            cookies: {
                token: 'THE-TOKEN',
                name: 'The Tester',
            },
        });
        const res = mockResponse();

        await MainPageController.MainPage(req, res);
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
