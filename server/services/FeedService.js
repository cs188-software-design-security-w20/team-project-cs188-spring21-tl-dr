/* eslint-disable no-unused-vars */
const Service = require("./Service");
const { Summary, User, _Sequelize } = require("../db/psql.js");
/**
 * Returns list of all publicly viewable summaries.
 *
 * returns List
 * */
const feedGET = () =>
  new Promise(async (resolve, reject) => {
    try {
      let publicSummaries = await Summary.findAll({
        where: {
          isPublic: {
            [_Sequelize.Op.is]: true,
          },
        },
      });
      // get relavent user info based on summaries
      let users = await Promise.all(
        publicSummaries.map(
          async (summary) =>
            await User.findAll({ where: { id: summary.userId } })
        )
      );
      let res = publicSummaries.map((summary, ind) => {
        return { summary, user: users[ind] };
      });
      resolve(Service.successResponse(res, 200));
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

module.exports = {
  feedGET,
};
