/* eslint-disable no-unused-vars */
const Service = require("./Service");
const { db, Summary, User } = require("../db/psql.js");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
/**
 * Log in user. New users will be signed up then logged in.
 * Given `id_token` from Google Sign In, verify token and authenticate user. If authentication is successful, set a JWT to establish user session.
 *
 * loginRequest LoginRequest User ID to retreive information for
 * returns Error
 * */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginPOST = ({ loginRequest }) =>
  new Promise(async (resolve, reject) => {
    try {
      let audience;
      if (loginRequest.clientType === "web") {
        audience = process.env.GOOGLE_CLIENT_ID_WEB;
      } else if (loginRequest.clientType === "ios") {
        audience = process.env.GOOGLE_CLIENT_ID_IOS;
      } else {
        throw new Error("Invalid client type."); // should be caught by openAPI validator
      }
      const ticket = await client.verifyIdToken({
        idToken: loginRequest.id_token,
        audience,
      });
      const payload = ticket.getPayload();
      const authUser = {
        id: payload["sub"], // reuse unique Google ID for user id.
        firstName: payload["given_name"],
        lastName: payload["family_name"],
        email: payload["email"],
        image: payload["picture"],
      };
      await User.findOrCreate({ where: authUser });
      // TODO: Add CSRF protection. See https://www.npmjs.com/package/csurf
      let token = jwt.sign({ userId: payload["sub"] }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      resolve(
        Service.successResponse(
          token,
          200,
          (cookie = {
            name: "token",
            value: token,
            options: {
              httpOnly: true,
            },
          })
        )
      );
    } catch (e) {
      console.log("/login:", e);
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });
/**
 * Log out user by invalidating JWT.
 *
 * no response value expected for this operation
 * */
const logoutGET = () =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(Service.successResponse({}));
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || "Invalid input", e.status || 405)
      );
    }
  });

module.exports = {
  loginPOST,
  logoutGET,
};
