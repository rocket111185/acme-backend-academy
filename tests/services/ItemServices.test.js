'use strict';

const ItemServices = require('../../services/ItemServices.js');
const {
    EXISTING_CATEGORY,
    UNEXISTING_CATEGORY,
    EXISTING_ITEM_ID,
    UNEXISTING_ITEM_ID,
} = require('../testconfig.js');

describe('fetchItem testing', () => {
    test('it returns object if item id exists', async () => {
        const item = EXISTING_ITEM_ID;
        const productList = await ItemServices.fetchItem(item);

        // arrayContaining accepts subarray of elements
        // which should be in array
        const expected = expect.objectContaining({
            id: expect.any(String),
        });
        expect(productList).toEqual(expected);
    });

    test('it returns nothing if category does not exist', async () => {
        const category = UNEXISTING_CATEGORY;
        const productList = await ItemServices.fetchItemList(category);

        const expected = expect.objectContaining({
            error: expect.any(String),
        });
        expect(productList).toEqual(expected);
    });
});

describe('fetchItemList testing', () => {
    test('it returns array of objects if category exists', async () => {
        const category = EXISTING_CATEGORY;
        const productList = await ItemServices.fetchItemList(category);

        // arrayContaining accepts subarray of elements
        // which should be in array
        const expectedElement = [
            expect.objectContaining({
                id: expect.any(String),
            }),
        ];
        const expected = expect.arrayContaining(expectedElement);
        expect(productList).toEqual(expected);
    });

    test('it returns nothing if category does not exist', async () => {
        const category = UNEXISTING_CATEGORY;
        const productList = await ItemServices.fetchItemList(category);

        const expected = expect.objectContaining({
            error: expect.any(String),
        });
        expect(productList).toEqual(expected);
    });
});

describe('fetchItem and fetchItemList testing', () => {
    test('mixed testcase', async () => {
        const category = EXISTING_CATEGORY;
        const productList = await ItemServices.fetchItemList(category);

        for (const product of productList) {
            const fetchedItem = await ItemServices.fetchItem(product.id);
            expect(fetchedItem).toEqual(product);
        }
    });

    test('they throw if the argument type is not correct', async () => {
        const irregularArgumentList = [69, false, null, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                ItemServices.fetchItem(argument)
            ).rejects.toBeDefined();
            await expect(
                ItemServices.fetchItemList(argument, argument)
            ).rejects.toBeDefined();
        }
    });
});
