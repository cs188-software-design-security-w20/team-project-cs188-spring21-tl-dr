/**
 * The SummaryController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/SummaryService');
const summarizeGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.summarizeGET);
};

const summarizePOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.summarizePOST);
};

const userSummariesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.userSummariesGET);
};

const userSummariesIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.userSummariesIdGET);
};


module.exports = {
  summarizeGET,
  summarizePOST,
  userSummariesGET,
  userSummariesIdGET,
};
