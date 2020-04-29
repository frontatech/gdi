let multer = require('multer')

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
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, new Date().getTime() + '-' + fileName)
        }
    })
    
    const uploadFile = multer({
        storage: storage,
        fileFilter: (req, file, cb) =>{
            if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
               return cb(null, true)
            }
            else{
                cb(null, false)
                return cb({error: "Only .png, .jpg or .jpeg format is allowed"})
            }
        }
    }).array(FILENAME,SIZE)
    return {uploadFile}
}
module.exports = {handleImageFileUpload, isEmpty}

