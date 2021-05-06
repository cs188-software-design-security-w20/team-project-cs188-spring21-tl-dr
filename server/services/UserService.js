/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Returns information and stored summaries for current user.
*
* id String User ID to retreive information for.
* returns User
* */
const userGET = ({ id }) => new Promise(
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
  userGET,
  userSummariesGET,
  userSummariesIdGET,
};
