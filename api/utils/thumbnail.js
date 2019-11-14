/* eslint linebreak-style: ["error", "windows"] */

const path = require("path");

const ABSPATH = path.dirname(process.mainModule.filename);
const gm = require("gm");
const fs = require("fs");

const exists = (ipath) => {
  try {
    return fs.statSync(ipath).isFile();
  } catch (e) {
    return false;
  }
};

const getFileExtension = (filename) => filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

class Media {
  constructor(path) {
    this.src = path;
  }

  isValidMedia(src) {
    return /\.(jpe?g|png)$/.test(src);
  }

  isValidBaseDir(src) {
    return /^\/public\/Images/.test(src);
  }

  thumb(request, response) {
    const image = ABSPATH + this.src;

    if (this.isValidBaseDir(this.src) && this.isValidMedia(this.src) && exists(image)) {
      const width = (request.query.w && /^\d+$/.test(request.query.w)) ? request.query.w : "150";
      const height = (request.query.h && /^\d+$/.test(request.query.h)) ? request.query.h : "150";
      const extension = getFileExtension(this.src);
      const mime = (extension === "jpeg" || extension === "jpg") ? "jpeg" : "png";

      response.type(mime);

      gm(image).resize(width, height).stream().pipe(response);
    } else {
      response.sendStatus(404);
    }
  }
}

module.exports = Media;
