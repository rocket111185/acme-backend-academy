'use strict';

const CategoryServices = require('../../services/CategoryServices.js');
const { UNEXISTING_CATEGORY } = require('../testconfig.js');

describe('fetchCategory testing', () => {
    test('it returns all the categories for "all"', async () => {
        const fetchedCategoryList = await CategoryServices.fetchCategory('all');
        const expectedElement = [expect.any(Object)];
        const expected = expect.arrayContaining(expectedElement);
        expect(fetchedCategoryList).toEqual(expected);
    });

    test('it returns the item for a category from list of "all"', async () => {
        const fetchedCategoryList = await CategoryServices.fetchCategory('all');
        const category = fetchedCategoryList.pop();
        const fetchedCategory = await CategoryServices.fetchCategory(
            category.id
        );
        expect(category).toEqual(fetchedCategory);
    });

    test('it returns object with error for unexisting category', async () => {
        const category = UNEXISTING_CATEGORY;
        const fetchedCategory = await CategoryServices.fetchCategory(category);
        expect(fetchedCategory).toHaveProperty('error');
    });

    test('it throws if the argument type is not correct', async () => {
        const irregularArgumentList = [69, false, null, undefined, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                CategoryServices.fetchCategory(argument)
            ).rejects.toBeDefined();
        }
    });
});

describe('fetchChildCategories testing', () => {
    test('it returns main categories if no argument is passed', async () => {
        const rootCategories = await CategoryServices.fetchChildCategories();
        const expectedElement = [expect.any(Object)];
        const expected = expect.arrayContaining(expectedElement);
        expect(rootCategories).toEqual(expected);
    });

    test('it returns subcategories for main categories', async () => {
        const rootCategories = await CategoryServices.fetchChildCategories();
        for (const category of rootCategories) {
            const subcategories = await CategoryServices.fetchChildCategories(
                category.id
            );
            const expectedElement = [expect.any(Object)];
            const expected = expect.arrayContaining(expectedElement);
            expect(subcategories).toEqual(expected);
        }
    });

    test('it returns empty array for unexisting category', async () => {
        const category = UNEXISTING_CATEGORY;
        const fetchedCategories = await CategoryServices.fetchChildCategories(
            category
        );
        expect(fetchedCategories).toEqual([]);
    });

    test('it throws if the argument type is not correct', async () => {
        const irregularArgumentList = [69, false, null, {}, []];
        for (const argument of irregularArgumentList) {
            // The async version of "expect.toThrow"
            await expect(
                CategoryServices.fetchChildCategories(argument)
            ).rejects.toBeDefined();
        }
    });
});
