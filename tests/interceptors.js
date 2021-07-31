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

const mockResponse = createMock(['render', 'redirect', 'status', 'json']);

module.exports = {
    mockApp,
    mockRequest,
    mockResponse,
};
