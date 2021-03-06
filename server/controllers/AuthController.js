/**
 * The AuthController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AuthService');
const csrf_tokenGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.csrf_tokenGET);
};

const loginPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.loginPOST);
};

const logoutGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.logoutGET);
};


module.exports = {
  csrf_tokenGET,
  loginPOST,
  logoutGET,
};
