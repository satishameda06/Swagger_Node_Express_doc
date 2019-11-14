/**
 * Created by Satish Ameda on "".
 */
/*  eslint linebreak-style: ["error", "windows"]  */

const express = require("express");
const ThumbnailService = require("../utils/thumbnail");

const router = express.Router();

router
  .route("/")

  // thumbnail
  .get((req, res) => {
    if (req.query.src) {
      const image = new ThumbnailService(req.query.src);
      return image.thumb(req, res);
    }
    return res.sendStatus(403);
  });

module.exports = router;
