/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Summarize webpage given URL.
* Calls external summarizer API to
*
* body URI URL of website to be scraped.
* returns Summary
* */
const summarizeByURLPOST = ({ body }) => new Promise(
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
* Summarize webpage given text.
* Calls external summarizer API to summarize given text. Summary is saved under user's profile.
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

module.exports = {
  summarizeByURLPOST,
  summarizePOST,
};
