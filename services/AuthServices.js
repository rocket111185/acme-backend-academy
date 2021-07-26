'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

async function signUp(name, email, password) {
    checkProperties({ name, email, password });

    const response = await wrappedAxios({
        method: 'post',
        url: '/auth/signup',
        data: {
            name,
            email,
            password,
        },
    });

    return response;
}

async function signIn(email, password) {
    checkProperties({ email, password });

    const response = await wrappedAxios({
        method: 'post',
        url: '/auth/signin',
        data: {
            email,
            password,
        },
    });

    return response;
}

module.exports = {
    signUp,
    signIn,
};
