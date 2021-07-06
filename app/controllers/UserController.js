const userServices = require('../services/UserServices');

function helloWorld(req, res, next){
    try {
        const returnFromService = userServices.helloWorld();
        return res.status(200).send(returnFromService);
    } catch (error) {
        console.log(error);
    }
}

async function controllerWithParams(req, res, next){
    try {
        const {postId, email} = req.query;
        
        const returnFromService = await userServices.serviceThatCallsApi(postId, email);
        return res.status(200).send(returnFromService);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    helloWorld: helloWorld,
    controllerWithParams: controllerWithParams
  }
  