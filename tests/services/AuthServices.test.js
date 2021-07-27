'use strict';

const AuthServices = require('../../services/AuthServices.js');
const {
    REGISTERED_NAME,
    REGISTERED_EMAIL,
    REGISTERED_PASSWORD,
    UNEXISTING_EMAIL,
} = require('../testconfig.js');

function randomString(length) {
    const HEXATRIDECIMAL_RADIX = 36;
    const POSISION_AFTER_PERIOD = 2;
    const MAX_LENGTH = 9;

    if (length <= 0) {
        return '';
    }

    const generatedString = Math.random().toString(HEXATRIDECIMAL_RADIX);
    const result = generatedString.slice(
        POSISION_AFTER_PERIOD,
        POSISION_AFTER_PERIOD + length
    );

    // Maybe, it's more preferrable to write ternary operator
    // instead of this, but this is more readable and obvious to me
    if (length > MAX_LENGTH) {
        return result + randomString(length - MAX_LENGTH);
    } else {
        return result;
    }
}

describe('signUp testing', () => {
    test('it does not create a user created before', async () => {
        const response = await AuthServices.signUp(
            REGISTERED_NAME,
            REGISTERED_EMAIL,
            REGISTERED_PASSWORD
        );
        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it creates a new user for generated identificators', async () => {
        const generatedName = randomString(20);
        const generatedEmail = randomString(16) + '@gmail.com';
        const generatedPassword = randomString(10);

        const response = await AuthServices.signUp(
            generatedName,
            generatedEmail,
            generatedPassword
        );
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

        const response = await AuthServices.signIn(
            UNEXISTING_EMAIL,
            generatedPassword
        );

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns error if the password is wrong', async () => {
        const wrongPassword = randomString(14);

        const response = await AuthServices.signIn(
            REGISTERED_EMAIL,
            wrongPassword
        );

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns token for correct credentials', async () => {
        const response = await AuthServices.signIn(
            REGISTERED_EMAIL,
            REGISTERED_PASSWORD
        );
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
