/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { db, Summary, User, _Sequelize } = require('../db/psql.js');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
/**
* Returns information and stored summaries for current user.
*
* returns User
* */
const userGET = ({ cookies }) => new Promise(
  async (resolve, reject) => {
    try {
      let token = jwt.verify(cookies.token, process.env.JWT_SECRET);
      let user = await (await User.findByPk(token.userId)).get();
      let summaries = await Summary.findAll({
        where: {
          userId: {
            [_Sequelize.Op.eq]: user.id
          }
        }
      });
      resolve(Service.successResponse(
        {
          user,
          summaries
        },
        200
      ));
    } catch (e) {
      console.log('/user', e);
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
const userSummariesGET = ({ cookies }) => new Promise(
  async (resolve, reject) => {
    let token = jwt.verify(cookies.token, process.env.JWT_SECRET);
    let summaries = await Summary.findAll({
      where: {
        userId: {
          [_Sequelize.Op.eq]: token.userId
        }
      }
    });
    try {
      resolve(Service.successResponse(
        {
          summaries,
        },
        200
      ));
    } catch (e) {
      console.log('/user/summaries/', e);
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
* id UUID for saved Summary
* returns Summary
* */
const userSummariesIdGET = ({ cookies, id }) => new Promise(
  async (resolve, reject) => {
    try {
      let token = jwt.verify(cookies.token, process.env.JWT_SECRET);
      let summary = await(await Summary.findByPk(id)).get();
      if (summary.userId === token.userId) {
        throw createError(401, "User is not authorized to view this summary.");
      }
      resolve(Service.successResponse(
        summary,
        200
      ));
    } catch (e) {
      console.log('/user/summaries/:id', e);
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
