/*  eslint linebreak-style: ["error", "windows"]  */

/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */
const express = require("express");
const authService = require("../utils/auth");

const router = express.Router();

router
  .route("/")

  // Login
  .post((req, res) => {
    let errorMessage = "";
    if (typeof req !== "undefined") {
      if (req.body.username === null || req.body.password === "") {
        errorMessage = " username ,password is null or empty.";
        return res.send({ result: false, errorDesc: errorMessage });
      }
      authService
        .authenticate(req.body)
        .then((user) => (user ? res.send({ result: true, user }) : res.status(400).json({ message: "Username or password is incorrect" })))
        .catch((err) => res.send({ result: false, errorDesc: err }));
    } else {
      errorMessage = "Request is null or empty.";
      return res.send({ result: false, errorDesc: errorMessage });
    }
  });

module.exports = router;
