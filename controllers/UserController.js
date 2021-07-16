'use strict';

const UserServices = require('../services/UserServices');

function helloWorld(req, res) {
    try {
        const returnFromService = UserServices.helloWorld();
        return res.status(200).send(returnFromService);
    } catch (error) {
        console.log(error);
    }
}

async function controllerWithParams(req, res) {
    try {
        const { postId, email } = req.query;

        const returnFromService = await UserServices.serviceThatCallsApi(
            postId,
            email
        );
        return res.status(200).send(returnFromService);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    helloWorld,
    controllerWithParams,
};
