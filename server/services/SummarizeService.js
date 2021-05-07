/* eslint-disable no-unused-vars */
const Service = require('./Service');
const fetch = require('node-fetch');
const deepai = require('deepai');
const { htmlToText } = require('html-to-text');
const db = require('../db/psql.js');

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
      response = {};
      console.log(summarizeRequest);
      if (summarizeRequest.hasOwnProperty('url')) {
        // Extract text from HTML
        let raw = await (await fetch(summarizeRequest.url)).text();
        const extractedText = htmlToText(raw, {tags:
            {'a': {options: {ignoreHref: true}}, 
                'img': {options: {ignoreHref: true}},
            }
        }).replace(/ *\[[^\]]*\] */g, '');
        let apiResponse = await deepai.callStandardApi('summarization', { text: extractedText });
        response = apiResponse.output;
      } else if (summarizeRequest.hasOwnProperty('plaintext')) {
        let apiResponse = await deepai.callStandardApi('summarization', { text: summarizeRequest.plaintext });
        response = apiResponse;
      } else {
        // This should already be caught by the OpenAPI Validator middleware in server\expressServer.js
        throw new Error("Request should specify either url or plaintext.");
      }
      resolve(Service.successResponse({
        response,
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
