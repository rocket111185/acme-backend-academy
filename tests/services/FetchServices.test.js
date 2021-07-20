'use strict';

const FetchServices = require('../../services/FetchServices.js');
const { JEST_EXTENDED_TIMEOUT } = require('../config.js');

describe('fetchCategory testing', () => {
    test('it returns all the categories for "all"', async () => {
        const fetchedCategoryList = await FetchServices.fetchCategory('all');
        expect(fetchedCategoryList).not.toHaveLength(0);
    });

    test(
        'it returns the item for a category from list of "all"',
        async () => {
            const fetchedCategoryList = await FetchServices.fetchCategory(
                'all'
            );
            for (const category of fetchedCategoryList) {
                const fetchedCategory = await FetchServices.fetchCategory(
                    category.id
                );
                expect(category).toEqual(fetchedCategory);
            }
        },
        JEST_EXTENDED_TIMEOUT
    );

    test('it returns object with error for unexisting category', async () => {
        const category = 'i-do-not-exist-really';
        const fetchedCategory = await FetchServices.fetchCategory(category);
        expect(fetchedCategory).toHaveProperty('error');
    });

    test('it throws if the argument type is not correct', async () => {
        const irregularArgumentList = [69, false, null, undefined, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(FetchServices.fetchCategory(argument))
                .rejects.toBeDefined();
        }
    });
});

describe('fetchChildCategories testing', () => {
    test('it returns main categories if no argument is passed', async () => {
        const rootCategories = await FetchServices.fetchChildCategories();
        expect(rootCategories).not.toHaveLength(0);
    });

    test('it returns subcategories for main categories', async () => {
        const rootCategories = await FetchServices.fetchChildCategories();
        for (const category of rootCategories) {
            const subcategories = await FetchServices.fetchChildCategories(
                category.id
            );
            expect(subcategories).not.toHaveLength(0);
        }
    });

    test('it returns empty array for unexisting category', async () => {
        const category = 'i-do-not-exist-really';
        const fetchedCategories = await FetchServices.fetchChildCategories(
            category
        );
        expect(fetchedCategories).toEqual([]);
    });

    test('it throws if the argument type is not correct', async () => {
        const irregularArgumentList = [69, false, null, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(FetchServices.fetchChildCategories(argument))
                .rejects.toBeDefined();
        }
    });
});

describe('fetchProduct and fetchProductList testing', () => {
    test(
        'mixed testcase',
        async () => {
            let category = await FetchServices.fetchChildCategories();
            let productList;

            do {
                const { id } = category[0];
                expect(id).toBeDefined();
                productList = await FetchServices.fetchProductList(id);
                category = await FetchServices.fetchChildCategories(id);
            } while (productList.error);
            expect(productList).not.toHaveLength(0);

            for (const product of productList) {
                const fetchedProduct = await FetchServices.fetchProduct(
                    product.id
                );
                expect(fetchedProduct).toEqual(product);
            }
        },
        JEST_EXTENDED_TIMEOUT
    );

    test('they throw if the argument type is not correct', async () => {
        const irregularArgumentList = [69, false, null, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(FetchServices.fetchProduct(argument))
                .rejects.toBeDefined();
            await expect(FetchServices.fetchProductList(argument, argument))
                .rejects.toBeDefined();
        }
    });
});
