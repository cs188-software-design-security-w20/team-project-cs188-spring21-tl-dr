/* eslint-disable no-unused-vars */
const Service = require('./Service');
const fetch = require('node-fetch');
const deepai = require('deepai');
const { htmlToText } = require('html-to-text');
const { db, Summary, User } = require('../db/psql.js');

deepai.setApiKey(process.env.DEEPAI_KEY);

/**
* Call DeepAI to summarize raw text or a webpage. Summary is saved under user's profile.
*
* summarizeRequest SummarizeRequest Input text or the URL of webpage to be summarized.
* NOTE: openAPI Validator will reject all requests with 1. no plaintext or url property 2. both plaintext and url properties
*
* returns Summary:
*           id:
*             type: integer
*           userID:
*             # username (i.e. alphanumeric) or IDs (i.e. numeric)?
*             type: string
*           # if /summarize is called
*           plaintext:
*             description: Original text that was summarized.
*             type: string
*           # if /summarizeByURL is called
*           url:
*             description: URL of webpage that was summarized.
*             type: string
*           summarizedText:
*             type: string
*           createdAt:
*             description: Time summary was first requested.
*             type: string
*             format: date-time
* */
const summarizePOST = ({ summarizeRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      // placeholder user to satisfy foreign key constraint of Summaries
      await User.findOrCreate({ where: { id: "e2b7df6e-df62-4d7d-9cdf-80c3f6058748", firstName: "Testy", lastName: "McTestFace", email: "tester@test.com" }}); 
      let row = {};
      let response = {};
      // console.log(summarizeRequest);
      let text = '';
      if (summarizeRequest.hasOwnProperty('url')) {
        // Extract text from HTML
        let raw = await (await fetch(summarizeRequest.url)).text();
        text = htmlToText(raw, 
                { tags: 
                  {
                    'a': {options: {ignoreHref: true}},
                    'img': {options: {ignoreHref: true}}
                  }
                }).replace(/ *\[[^\]]*\] */g, '');
      } else if (summarizeRequest.hasOwnProperty('plaintext')) {
        text = summarizeRequest.plaintext;
      } else {
        // This should already be caught by the OpenAPI Validator middleware in server\expressServer.js
        throw new Error("Request should specify either url or plaintext.");
      }

      let apiResponse = await deepai.callStandardApi('summarization', { text });
      row.id = apiResponse.id; // Reuse UUID generated by DeepAI
      row.url = summarizeRequest.url;
      row.summarizedText = apiResponse.output;
      row.userId = "e2b7df6e-df62-4d7d-9cdf-80c3f6058748"; // TODO: This is a placeholder. Link user id
      response = apiResponse;
      const created = await Summary.create(row);
      // console.log(created);
      // TODO: redirect client to summary page with returned summary open
      resolve(Service.successResponse(created));
    } catch (e) {
      console.log(e);
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
