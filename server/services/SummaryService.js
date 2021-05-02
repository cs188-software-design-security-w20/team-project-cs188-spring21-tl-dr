/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Summarize webpage given URL.
*
* url String URL of webpage to be summarized
* returns Summary
* */
const summarizeGET = ({ url }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        url,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Summarize webpage given text.
*
* body String Input text for summarization
* returns Summary
* */
const summarizePOST = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        body,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Returns list of summaries for current user.
*
* returns List
* */
const userSummariesGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Return summary with given id.
*
* id Integer Summary ID for current user
* returns Summary
* */
const userSummariesIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  summarizeGET,
  summarizePOST,
  userSummariesGET,
  userSummariesIdGET,
};
