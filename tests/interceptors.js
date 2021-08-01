'use strict';

// The idea was taken from
// https://stackoverflow.com/questions/55463886/
// unit-testing-controllers-use-jest-nodejs/57081471

const createMock = (mockedProperties) => (additionalProps) => {
    const result = {};
    for (const prop of mockedProperties) {
        result[prop] = jest.fn().mockReturnThis();
    }
    if (additionalProps) {
        for (const prop in additionalProps) {
            result[prop] = additionalProps[prop];
        }
    }
    return result;
};

const mockApp = createMock(['use']);

const mockRequest = createMock(['body', 'params', 'query']);

const mockResponse = createMock(
    ['render', 'redirect', 'status', 'json', 'cookie', 'clearCookie']
);

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

module.exports = {
    mockApp,
    mockRequest,
    mockResponse,
    randomString,
};
