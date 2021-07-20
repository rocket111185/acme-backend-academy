'use strict';

const RenderServices = require('../../services/RenderServices.js');
const pictureDataset = require('./pictureDataset.json');

describe('getSymbolFromCurrency testing', () => {
    test('it returns the symbol for "USD"', () => {
        const currency = 'USD';
        const result = RenderServices.getSymbolFromCurrency(currency);

        expect(result).toBe('$');
    });

    test('it returns the symbol for "EUR"', () => {
        const currency = 'EUR';
        const result = RenderServices.getSymbolFromCurrency(currency);

        expect(result).toBe('€');
    });

    // The developer is from Ukraine
    test('it returns the symbol for "UAH"', () => {
        const currency = 'UAH';
        const result = RenderServices.getSymbolFromCurrency(currency);

        expect(result).toBe('₴');
    });

    test('it returns undefined for "foo"', () => {
        const currency = 'foo';
        const result = RenderServices.getSymbolFromCurrency(currency);

        expect(result).toBeUndefined();
    });
});

describe('findPicture testing', () => {
    test('it returns picture object from proper image dataset', () => {
        const sizeList = ['large', 'medium', 'small'];

        for (const size of sizeList) {
            const picObject = RenderServices.findPicture(pictureDataset, size);

            expect(picObject).toEqual({
                title: `${size}-no-var1`,
            });
        }
    });

    test('it returns undefined for existing size with variation', () => {
        const size = 'swatch';
        const picObject = RenderServices.findPicture(pictureDataset, size);
        expect(picObject).toBeUndefined();
    });

    test('it returns undefined for size that does not exist', () => {
        const size = 'extremally_large';
        const picObject = RenderServices.findPicture(pictureDataset, size);
        expect(picObject).toBeUndefined();
    });
});

describe('findAllPictures testing', () => {
    test('it returns picture object list from proper image dataset', () => {
        const sizeList = ['large', 'medium', 'small'];

        for (const size of sizeList) {
            const picObject = RenderServices.findAllPictures(
                pictureDataset,
                size
            );

            expect(picObject).toEqual([
                {
                    title: `${size}-no-var1`,
                },
                {
                    title: `${size}-no-var2`,
                },
                {
                    title: `${size}-var1`,
                },
                {
                    title: `${size}-var2`,
                },
            ]);
        }
    });

    test('it returns array for existing size with variation', () => {
        const size = 'swatch';
        const picObject = RenderServices.findAllPictures(pictureDataset, size);
        expect(picObject).toEqual([
            {
                title: `${size}-var1`,
            },
        ]);
    });

    test('it returns empty array for size that does not exist', () => {
        const size = 'extremally_large';
        const picObject = RenderServices.findAllPictures(pictureDataset, size);
        expect(picObject).toEqual([]);
    });
});
