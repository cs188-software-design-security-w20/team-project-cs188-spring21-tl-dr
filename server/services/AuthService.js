/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { db, Summary, User } = require('../db/psql.js');


/**
* Log in user. New users will be signed up then logged in.
* Given `id_token` from Google Sign In, verify token and authenticate user. If authentication is successful, set a JWT to establish user session.
*
* loginRequest LoginRequest User ID to retreive information for
* returns Error
* */

const CLIENT_ID = '944387746626-hvgrqhj7ua1vlqsv6u0scddv0ac2djq0.apps.googleusercontent.com';

const loginPOST = ({ loginRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const id_token = loginRequest.id_token;
      console.log(id_token);
      
      const {OAuth2Client} = require('google-auth-library');
      const client = new OAuth2Client(CLIENT_ID);
      async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
        });
        const payload = ticket.getPayload();
        console.log(payload);
        
        const userid = payload['sub'];
        const firstName = payload['given_name'];
        const lastName = payload['family_name'];
        const email = payload['email'];
        const picture = payload['picture'];
        await User.findOrCreate({ where: { id: userid, firstName: firstName, lastName: lastName, email: email, image: picture }}); 
      
        resolve(Service.successResponse(
          userid
        ));
      }
      var token_error = (e) => reject(Service.rejectResponse(
       e || ' Error Validating Token',
       401
      ));

      verify().catch(token_error)

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
