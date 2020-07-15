const uploader = require("./uploader");

const multipleUpload = async (req, res, next) => {
  try {
    await uploader(req, res);
    if (req.files.length <= 0) {
      return res.status(403).json({error:`You must select at least 1 file.`});
    }
    next()
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(403).json({error:"Too many files to upload."});
    }
    return res.status(403).json({error:`Error when trying upload many files: ${error}`});
  }
};

module.exports =  multipleUpload