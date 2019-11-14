/* eslint linebreak-style: ["error", "windows"] */

const jwt = require("jsonwebtoken");
const config = require("../../config/config");


async function authenticate({ username, password }) {
  if (username && password) {
    // mock login not checkin user in db and all
    const token = jwt.sign({ sub: username }, config.secret);
    return {
      token,
    };
  }
  return "invalid request";
}
async function authCheck(req, res, next) {
  // get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers.authorization;
  // if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send({message:"Access denied. No token provided."});

  try {
    // if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    return next();
  } catch (ex) {
    // if invalid token
    return res.status(400).send("Invalid token.");
  }
}
module.exports = {
  authenticate,
  authCheck,
};
