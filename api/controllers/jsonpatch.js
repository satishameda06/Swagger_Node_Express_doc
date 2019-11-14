/*  eslint linebreak-style: ["error", "windows"]    */

const jsonpatch = require("json-patch");

const express = require("express");

const router = express.Router();

router.route("/").patch((req, res) => {
  let errMessage = "";
  if (!req.body.jsonObj || !req.body.jsonPatch) {
    errMessage = "Invalid input";
    return res.send({ result: false, errorDesc: errMessage });
  }
  const json = req.body.jsonObj;
  const patch = req.body.jsonPatch;
  const resultJson = jsonpatch.apply(json, patch);
  return res.send({ result: true, json: resultJson });
});
module.exports = router;
