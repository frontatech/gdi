const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/public/gallery_images`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/gif"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-gdi-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage, limits: {fieldSize: 125* 1024*1024} }).array("galleryFiles", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;