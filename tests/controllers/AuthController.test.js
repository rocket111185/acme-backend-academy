'use strict';

const AuthController = require('../../controllers/AuthController.js');

const {
    mockRequest,
    mockResponse,
    randomString,
} = require('../interceptors.js');

const {
    REGISTERED_NAME,
    REGISTERED_EMAIL,
    REGISTERED_PASSWORD,
    UNEXISTING_EMAIL,
} = require('../testconfig.js');

describe('LoginPage testing', () => {
    test('it renders page without error if you have no error or cookies', async () => {
        const req = mockRequest({
            cookies: {},
            query: {},
        });
        const res = mockResponse();

        await AuthController.LoginPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.not.objectContaining({
                error: expect.any(String),
            })
        );
    });

    test('it renders page with error if the token is present', async () => {
        const req = mockRequest({
            cookies: {
                token: 'Look at my shiny new brand token, man',
            },
            query: {},
        });
        const res = mockResponse();

        await AuthController.LoginPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                error: expect.any(String),
            })
        );
    });

    test('it renders page with error if an error is present', async () => {
        const req = mockRequest({
            cookies: {},
            query: {
                error: 'You did something stupid',
            },
        });
        const res = mockResponse();

        await AuthController.LoginPage(req, res);
        const { render } = res;

        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith(
            expect.any(String),
            expect.objectContaining({
                error: expect.any(String),
            })
        );
    });
});

describe('SignUp testing', () => {
    test('it redirects with error if the user already exists', async () => {
        const req = mockRequest({
            body: {
                name: REGISTERED_NAME,
                email: REGISTERED_EMAIL,
                password: REGISTERED_PASSWORD,
            },
        });
        const res = mockResponse();

        await AuthController.SignUp(req, res);
        const { redirect } = res;

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('error'));
    });

    test('it redirects with redirect querystring if req.body had it', async () => {
        const req = mockRequest({
            body: {
                name: REGISTERED_NAME,
                email: REGISTERED_EMAIL,
                password: REGISTERED_PASSWORD,
                redirect: '/somewhere/there',
            },
        });
        const res = mockResponse();

        await AuthController.SignUp(req, res);
        const { redirect } = res;

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('error'));
        expect(redirect).toBeCalledWith(expect.stringContaining('redirect'));
    });

    test('it writes cookies and redirects with no error if the user is new', async () => {
        const req = mockRequest({
            body: {
                name: randomString(10),
                email: randomString(15) + '@gmail.com',
                password: randomString(20),
            },
        });
        const res = mockResponse();

        await AuthController.SignUp(req, res);
        const { redirect, cookie } = res;

        expect(cookie).not.toHaveBeenCalledTimes(0);
        expect(cookie).toBeCalledWith(
            expect.any(String),
            expect.any(String),
            expect.any(Object)
        );
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.not.stringContaining('error'));
    });
});

describe('SignIn testing', () => {
    test('it redirects with error if the user already exists', async () => {
        const req = mockRequest({
            body: {
                email: randomString(15) + '@gmail.com',
                password: randomString(20),
            },
        });
        const res = mockResponse();

        await AuthController.SignIn(req, res);
        const { redirect } = res;

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('error'));
    });

    test('it redirects with redirect querystring if req.body had it', async () => {
        const req = mockRequest({
            body: {
                email: randomString(15) + '@gmail.com',
                password: randomString(20),
                redirect: '/somewhere/there',
            },
        });
        const res = mockResponse();

        await AuthController.SignIn(req, res);
        const { redirect } = res;

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.stringContaining('error'));
        expect(redirect).toBeCalledWith(expect.stringContaining('redirect'));
    });

    test('it writes cookies and redirects with no error if the user exists', async () => {
        const req = mockRequest({
            body: {
                email: REGISTERED_EMAIL,
                password: REGISTERED_PASSWORD,
            },
        });
        const res = mockResponse();

        await AuthController.SignIn(req, res);
        const { redirect, cookie } = res;

        expect(cookie).not.toHaveBeenCalledTimes(0);
        expect(cookie).toBeCalledWith(
            expect.any(String),
            expect.any(String),
            expect.any(Object)
        );
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.not.stringContaining('error'));
    });
});

describe('Logout testing', () => {
    test('it calls clearCookie', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await AuthController.Logout(req, res);
        const { redirect, clearCookie } = res;

        expect(clearCookie).toBeCalledWith(
            expect.any(String),
            expect.any(Object)
        );

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(expect.not.stringContaining('error'));
    });

    test('it redirects with proper URL if req.body had it', async () => {
        const req = mockRequest({
            query: {
                redirect: '/somewhere/there',
            },
        });
        const res = mockResponse();

        await AuthController.Logout(req, res);
        const { redirect } = res;

        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toBeCalledWith(req.query.redirect);
    });
});
