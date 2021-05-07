/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Log in user. New users will be signed up then logged in.
* Given `id_token` from Google Sign In, verify token and authenticate user. If authentication is successful, set a JWT to establish user session.
*
* loginRequest LoginRequest User ID to retreive information for
* returns Error
* */
const loginPOST = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const id_token = loginRequest.id_token;
      console.log(id_token);
      // TODO: verify id_token. See https://developers.google.com/identity/sign-in/web/backend-auth#create-an-account-or-session
      // TODO: establish JWT session.
      resolve(Service.successResponse({
        loginRequest,
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
* Log out user by invalidating JWT.
*
* no response value expected for this operation
* */
const logoutGET = () => new Promise(
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
* Sign up new user given credentials.
*
* returns Error
* */
const signupPOST = () => new Promise(
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

module.exports = {
  loginPOST,
  logoutGET,
  signupPOST,
};
