'use strict';

const AuthServices = require('../../services/AuthServices.js');
const OrderServices = require('../../services/OrderServices.js');
const { REGISTERED_EMAIL, REGISTERED_PASSWORD } = require('../testconfig.js');

describe('fetchOrders testing', () => {
  test('it returns an error if no orders are made', async () => {
    const { token } = await AuthServices.signIn({
      email: REGISTERED_EMAIL,
      password: REGISTERED_PASSWORD,
    });
    const response = await OrderServices.fetchOrders(token);

    const expected = expect.objectContaining({
      error: expect.any(String),
    });

    expect(response).toEqual(expected);
  });

  test('it returns an error if the token is wrong', async () => {
    const token = '"RJD2 - Ghostwriter" is the best song ever';
    const response = await OrderServices.fetchOrders(token);

    const expected = expect.objectContaining({
      error: expect.any(String),
    });

    expect(response).toEqual(expected);
  });

  test('it throws if the argument has wrong type', async () => {
    const irregularArgumentList = [69, false, null, undefined, {}, []];
    for (const argument of irregularArgumentList) {
      // The async version of "expect.toThrow"
      await expect(OrderServices.fetchOrders(argument)).rejects.toBeDefined();
    }
  });
});

describe('createOrder testing', () => {
  test('it returns an error if the token is wrong', async () => {
    const token = '"RJD2 - Ghostwriter" is the best song ever';
    const address = 'I live somewhere there';
    const paymentId = '420-69-666';
    const items = [
      {
        id: 'lol',
        name: 'kek',
      },
    ];

    const response = await OrderServices.createOrder(
      token,
      address,
      paymentId,
      items
    );

    const expected = expect.objectContaining({
      error: expect.any(String),
    });

    expect(response).toEqual(expected);
  });

  test('it returns an error if no items are passed', async () => {
    const { token } = await AuthServices.signIn({
      email: REGISTERED_EMAIL,
      password: REGISTERED_PASSWORD,
    });
    const address = 'I live somewhere there';
    const paymentId = '420-69-666';
    const items = [];

    await expect(
      OrderServices.createOrder(token, address, paymentId, items)
    ).rejects.toBeDefined();
  });

  test('it throws if arguments have wrong type', async () => {
    const irregularArgumentList = [69, false, null, undefined, {}, []];
    for (const argument of irregularArgumentList) {
      // The async version of "expect.toThrow"
      await expect(
        OrderServices.createOrder(argument, argument, argument, argument)
      ).rejects.toBeDefined();
    }
  });
});
