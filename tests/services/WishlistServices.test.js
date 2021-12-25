'use strict';

const AuthServices = require('../../services/AuthServices.js');
const WishlistServices = require('../../services/WishlistServices.js');
const {
  REGISTERED_EMAIL,
  REGISTERED_PASSWORD,
  EXISTING_ITEM_ID,
  EXISTING_ITEM_VARIANT_ID,
} = require('../testconfig.js');

describe('fetchWishlist testing', () => {
  test('it returns error for wrong token', async () => {
    const token = 'I love writing nonsense inside tests)';
    const response = await WishlistServices.fetchWishlist(token);

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
    const response = await WishlistServices.fetchWishlist(token);

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
        WishlistServices.fetchWishlist(argument)
      ).rejects.toBeDefined();
    }
  });
});

describe('addItemToWishlist testing', () => {
  test('it returns error for wrong token', async () => {
    const token = 'I love writing nonsense inside tests)';
    const response = await WishlistServices.addItemToWishlist(
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
    const response = await WishlistServices.addItemToWishlist(
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
        WishlistServices.addItemToWishlist(
          argument,
          argument,
          argument,
          argument
        )
      ).rejects.toBeDefined();
    }
  });
});

// changeWishlistItemQuantity(token, productId, variantId, quantity)

describe('changeWishlistItemQuantity testing', () => {
  test('it returns error for wrong token', async () => {
    const token = 'I love writing nonsense inside tests)';
    const response = await WishlistServices.changeWishlistItemQuantity(
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
    const response = await WishlistServices.changeWishlistItemQuantity(
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
        WishlistServices.changeWishlistItemQuantity(
          argument,
          argument,
          argument,
          argument
        )
      ).rejects.toBeDefined();
    }
  });
});

// removeItemFromWishlist(token, productId, variantId)

describe('removeItemFromWishlist testing', () => {
  test('it returns error for wrong token', async () => {
    const token = 'I love writing nonsense inside tests)';
    const response = await WishlistServices.removeItemFromWishlist(
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
    const response = await WishlistServices.removeItemFromWishlist(
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
        WishlistServices.removeItemFromWishlist(argument, argument, argument)
      ).rejects.toBeDefined();
    }
  });
});
