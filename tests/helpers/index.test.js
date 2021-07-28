'use strict';

const helpers = require('../../helpers');
const pictureDataset = require('./pictureDataset.json');

describe('getSymbolFromCurrency testing', () => {
    test('it returns the symbol for "USD"', () => {
        const currency = 'USD';
        const result = helpers.getSymbolFromCurrency(currency);

        expect(result).toBe('$');
    });

    test('it returns the symbol for "EUR"', () => {
        const currency = 'EUR';
        const result = helpers.getSymbolFromCurrency(currency);

        expect(result).toBe('€');
    });

    // The developer is from Ukraine
    test('it returns the symbol for "UAH"', () => {
        const currency = 'UAH';
        const result = helpers.getSymbolFromCurrency(currency);

        expect(result).toBe('₴');
    });

    test('it returns undefined for "foo"', () => {
        const currency = 'foo';
        const result = helpers.getSymbolFromCurrency(currency);

        expect(result).toBeUndefined();
    });
});

describe('findPicture testing', () => {
    test('it returns picture object from proper image dataset', () => {
        const sizeList = ['large', 'medium', 'small'];

        for (const size of sizeList) {
            const picObject = helpers.findPicture(pictureDataset, size);
            expect(picObject).toHaveProperty('title');
        }
    });

    test('it returns undefined for existing size with variation', () => {
        const size = 'swatch';
        const picObject = helpers.findPicture(pictureDataset, size);
        expect(picObject).toBeUndefined();
    });

    test('it returns undefined for size that does not exist', () => {
        const size = 'extremally_large';
        const picObject = helpers.findPicture(pictureDataset, size);
        expect(picObject).toBeUndefined();
    });
});

describe('findAllPictures testing', () => {
    test('it returns picture object list from proper image dataset', () => {
        const sizeList = ['large', 'medium', 'small'];

        for (const size of sizeList) {
            const picObject = helpers.findAllPictures(pictureDataset, size);

            const expectedElement = [
                expect.objectContaining({
                    title: expect.any(String),
                }),
            ];
            const expected = expect.arrayContaining(expectedElement);

            expect(picObject).toEqual(expected);
        }
    });

    test('it returns array for existing size with variation', () => {
        const size = 'swatch';
        const picObject = helpers.findAllPictures(pictureDataset, size);

        const expectedElement = [
            expect.objectContaining({
                title: expect.any(String),
            }),
        ];
        const expected = expect.arrayContaining(expectedElement);

        expect(picObject).toEqual(expected);
    });

    test('it returns empty array for size that does not exist', () => {
        const size = 'extremally_large';
        const picObject = helpers.findAllPictures(pictureDataset, size);
        expect(picObject).toEqual([]);
    });
});

describe('eq testing', () => {
    test('it bevahes like JavaScript operator of strict equality', () => {
        expect(helpers.eq('foo', 'foo')).toBe(true);
        expect(helpers.eq('foo', 'bar')).toBe(false);
        expect(helpers.eq('69', 69)).toBe(false);
        expect(helpers.eq(0, false)).toBe(false);
    });
});
