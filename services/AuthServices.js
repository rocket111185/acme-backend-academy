'use strict';

const { wrappedAxios, checkProperties } = require('./utils.js');

const signUp = async ({ name, email, password }) => {
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
};

const signIn = async ({ email, password }) => {
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
};

module.exports = {
  signUp,
  signIn,
};
