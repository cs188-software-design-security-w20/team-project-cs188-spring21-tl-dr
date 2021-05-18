/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { Summary, User, _Sequelize } = require('../db/psql.js');
/**
* Returns list of all publicly viewable summaries.
*
* returns List
* */
const feedGET = () => new Promise(
  async (resolve, reject) => {
    try {
      let publicSummaries = await Summary.findAll({
        where: {
          isPublic: {
            [_Sequelize.Op.is]: true
          }
        }
      });
      resolve(Service.successResponse(publicSummaries, 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  feedGET,
};
