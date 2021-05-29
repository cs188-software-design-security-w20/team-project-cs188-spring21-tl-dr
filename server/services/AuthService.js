/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { User } = require('../db/psql.js');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const createError = require('http-errors');

/**
* Get anti-CSRF token. Use on app startup.
*
* no response value expected for this operation
* */
const csrf_tokenGET = () => new Promise(
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
* Log in user. New users will be signed up then logged in.
* Given `id_token` from Google Sign In, verify token and authenticate user. If authentication is successful, set a JWT to establish user session.
*
* loginRequest LoginRequest User ID to retreive information for
* returns Error
* */
const webAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_WEB);
const iosAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_IOS)

const loginPOST = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      let ticket;
      if (loginRequest.clientType === 'web') {
        ticket = await webAuthClient.verifyIdToken({
          idToken: loginRequest.id_token,
          audience: process.env.GOOGLE_CLIENT_ID_WEB
        })
      } else if (loginRequest.clientType === 'ios') {
        ticket = await iosAuthClient.verifyIdToken({
          idToken: loginRequest.id_token,
          audience: process.env.GOOGLE_CLIENT_ID_IOS
        })
      } else {
        throw createError(400, "Invalid client type."); // should be caught by openAPI validator
      }
      const payload = ticket.getPayload();
      const authUser = {
        id: payload['sub'], // reuse unique Google ID for user id.
        firstName: payload['given_name'],
        lastName: payload['family_name'],
        email: payload['email'],
        image: payload['picture']
      }
      await User.findOrCreate({ where: authUser }); 
      // TODO: Add CSRF protection. See https://www.npmjs.com/package/csurf
      let token = jwt.sign({ userId: payload['sub'] }, process.env.JWT_SECRET, { expiresIn: '1h' });
      resolve(Service.successResponse(
        token,
        200,
        cookie = {
          name: "token",
          value: token,
          options: {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          },
        }
      ));
    } catch (e) {
      console.log("/login:", e);
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
 * Log out user by invalidating JWT.
 *
 * no response value expected for this operation
 * */
const logoutGET = () =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(Service.successResponse(
        {},
        204,
        // To clear a cookie, provide its name and value=null
        cookie = {
          name: "token",
          value: null,
        }
      ));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  csrf_tokenGET,
  loginPOST,
  logoutGET,
};
