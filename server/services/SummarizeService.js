/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Call DeepAI to summarize raw text or a webpage. Summary is saved under user's profile.
*
* summarizeRequest SummarizeRequest Input text or the URL of webpage to be summarized.
* returns Summary
* */
const summarizePOST = ({ summarizeRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        summarizeRequest,
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
  summarizePOST,
};
