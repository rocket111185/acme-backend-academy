'use strict';

// The idea was taken from
// https://stackoverflow.com/questions/55463886/
// unit-testing-controllers-use-jest-nodejs/57081471

const createMock = (mockedProperties) => () => {
    const result = {};
    for (const prop of mockedProperties) {
        result[prop] = jest.fn().mockReturnThis();
    }
    return result;
};

const mockRequest = createMock(['body', 'params', 'query']);
const mockResponse = createMock(['render', 'redirect', 'status', 'json']);

module.exports = {
    mockRequest,
    mockResponse,
};
