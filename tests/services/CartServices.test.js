'use strict';

const AuthServices = require('../../services/AuthServices.js');
const CartServices = require('../../services/CartServices.js');
const {
    REGISTERED_EMAIL,
    REGISTERED_PASSWORD,
    EXISTING_ITEM_ID,
    EXISTING_ITEM_VARIANT_ID,
} = require('../testconfig.js');

describe('fetchCart testing', () => {
    test('it returns error for wrong token', async () => {
        const token = 'I love writing nonsense inside tests)';
        const response = await CartServices.fetchCart(token);

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns error for empty cart', async () => {
        const { token } = await AuthServices.signIn({
            email: REGISTERED_EMAIL,
            password: REGISTERED_PASSWORD,
        });
        const response = await CartServices.fetchCart(token);

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it throws if the argument has wrong type', async () => {
        const irregularArgumentList = [69, false, null, undefined, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                CartServices.fetchCart(argument)
            ).rejects.toBeDefined();
        }
    });
});

describe('addItemToCart testing', () => {
    test('it returns error for wrong token', async () => {
        const token = 'I love writing nonsense inside tests)';
        const response = await CartServices.addItemToCart(
            token,
            EXISTING_ITEM_ID,
            EXISTING_ITEM_VARIANT_ID
        );

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns object for correct action', async () => {
        const { token } = await AuthServices.signIn({
            email: REGISTERED_EMAIL,
            password: REGISTERED_PASSWORD,
        });
        const response = await CartServices.addItemToCart(
            token,
            EXISTING_ITEM_ID,
            EXISTING_ITEM_VARIANT_ID
        );

        const expected = expect.not.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it throws if the argument has wrong type', async () => {
        const irregularArgumentList = [69, false, null, undefined, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                CartServices.addItemToCart(
                    argument,
                    argument,
                    argument,
                    argument
                )
            ).rejects.toBeDefined();
        }
    });
});

// changeCartItemQuantity(token, productId, variantId, quantity)

describe('changeCartItemQuantity testing', () => {
    test('it returns error for wrong token', async () => {
        const token = 'I love writing nonsense inside tests)';
        const response = await CartServices.changeCartItemQuantity(
            token,
            EXISTING_ITEM_ID,
            EXISTING_ITEM_VARIANT_ID,
            '4'
        );

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns object for correct action', async () => {
        const { token } = await AuthServices.signIn({
            email: REGISTERED_EMAIL,
            password: REGISTERED_PASSWORD,
        });
        const response = await CartServices.changeCartItemQuantity(
            token,
            EXISTING_ITEM_ID,
            EXISTING_ITEM_VARIANT_ID,
            '4'
        );

        const expected = expect.not.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it throws if the argument has wrong type', async () => {
        const irregularArgumentList = [69, false, null, undefined, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                CartServices.changeCartItemQuantity(
                    argument,
                    argument,
                    argument,
                    argument
                )
            ).rejects.toBeDefined();
        }
    });
});

// removeItemFromCart(token, productId, variantId)

describe('removeItemFromCart testing', () => {
    test('it returns error for wrong token', async () => {
        const token = 'I love writing nonsense inside tests)';
        const response = await CartServices.removeItemFromCart(
            token,
            EXISTING_ITEM_ID,
            EXISTING_ITEM_VARIANT_ID
        );

        const expected = expect.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it returns object for correct action', async () => {
        const { token } = await AuthServices.signIn({
            email: REGISTERED_EMAIL,
            password: REGISTERED_PASSWORD,
        });
        const response = await CartServices.removeItemFromCart(
            token,
            EXISTING_ITEM_ID,
            EXISTING_ITEM_VARIANT_ID
        );

        const expected = expect.not.objectContaining({
            error: expect.any(String),
        });

        expect(response).toEqual(expected);
    });

    test('it throws if the argument has wrong type', async () => {
        const irregularArgumentList = [69, false, null, undefined, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                CartServices.removeItemFromCart(
                    argument,
                    argument,
                    argument
                )
            ).rejects.toBeDefined();
        }
    });
});