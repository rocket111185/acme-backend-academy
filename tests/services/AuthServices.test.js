'use strict';

const AuthServices = require('../../services/AuthServices.js');
const {
    REGISTERED_NAME,
    REGISTERED_EMAIL,
    REGISTERED_PASSWORD,
    UNEXISTING_EMAIL,
} = require('../testconfig.js');

const { randomString } = require('../interceptors.js');

describe('signUp testing', () => {
    test('it does not create a user created before', async () => {
        const response = await AuthServices.signUp({
            name: REGISTERED_NAME,
            email: REGISTERED_EMAIL,
            password: REGISTERED_PASSWORD,
        });
        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it creates a new user for generated identificators', async () => {
        const generatedName = randomString(20);
        const generatedEmail = randomString(16) + '@gmail.com';
        const generatedPassword = randomString(10);

        const response = await AuthServices.signUp({
            name: generatedName,
            email: generatedEmail,
            password: generatedPassword,
        });
        const expected = expect.objectContaining({
            token: expect.any(String),
        });
        const notExpected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
        expect(response).not.toEqual(notExpected);
    });
});

describe('signIn testing', () => {
    test('it returns error for unexisting user', async () => {
        const generatedPassword = randomString(10);

        const response = await AuthServices.signIn({
            email: UNEXISTING_EMAIL,
            password: generatedPassword,
        });

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns error if the password is wrong', async () => {
        const wrongPassword = randomString(14);

        const response = await AuthServices.signIn({
            email: REGISTERED_EMAIL,
            password: wrongPassword,
        });

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns token for correct credentials', async () => {
        const response = await AuthServices.signIn({
            email: REGISTERED_EMAIL,
            password: REGISTERED_PASSWORD,
        });
        const expected = expect.objectContaining({
            token: expect.any(String),
        });
        const notExpected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
        expect(response).not.toEqual(notExpected);
    });
});
