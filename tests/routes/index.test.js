'use strict';

const routes = require('../../routes');
const { mockApp } = require('../interceptors.js');

describe('routes testing', () => {
    test('it applies route middlewars to the app', async () => {
        const app = mockApp();
        routes(app);

        const { use } = app;
        
        expect(use).not.toHaveBeenCalledTimes(0);
        for (let i = 1; i <= use.mock.calls.length; i++) {
            expect(use).nthCalledWith(
                i,
                expect.stringContaining('/'),
                expect.any(Function)
            );
        }
    });
});
