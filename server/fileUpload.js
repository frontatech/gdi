let multer = require('multer')
const util = require("util");
const path = require("path");
const isEmpty = (obj) =>{
    for(let item in obj) return false
    return true 
}
// handles files upload
const handleImageFileUpload = (DIR,FILENAME, SIZE) =>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null,DIR)
        },
        filename: (req, file, cb) =>{ 
            const match = ["image/png", "image/jpeg", "image/gif"];
            if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg/gif.`;
            return callback(message, null);
            }
            let fileEx = file.originalname.split('.')[1]
            const fileName = `GDI_IMG_${new Date().getTime()}.${fileEx}`//file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    })
    
    const multerFileUpload = multer({storage: storage,limits: {fieldSize: 5* 1024*1024} }).array(FILENAME,SIZE)
    const uploadFile = util.promisify(multerFileUpload);
    const fileUpload = async (req, res, next) => {
        try {
          await uploadFile(req, res);
          if (req.files.length <= 0) {
            return res.status(403).json({error:`You must select at least 1 file.`});
          }
          next()
        } catch (error) {
            console.log(error)
          if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(403).json({error:"You selected too many files to upload, you can only upload a maximum of 10 files at a time."});
          }
          return res.status(403).json({error:`Error when trying to upload many files: ${error}`});
        }
      };
    return {fileUpload}
}
module.exports = {handleImageFileUpload, isEmpty}
