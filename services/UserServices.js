'use strict';

const axios = require('axios');

function helloWorld() {
    return 'Hello World';
}

async function serviceThatCallsApi(postId, email) {
    const searchUrl =
        'https://jsonplaceholder.typicode.com/comments?postId=' +
        postId +
        '&email=' +
        email;
    const response = await axios.get(searchUrl);

    console.log(response.data);

    return response.data;
}

module.exports = {
    helloWorld,
    serviceThatCallsApi,
};
