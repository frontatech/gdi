let multer = require('multer')
 
const isEmpty = (obj) =>{
    for(let item in obj) return false
    return true 
}
const validateEmail = (email) =>{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
// throw mysql error
const fileUploadError = (res,courseUrl,object) =>{
    fs.unlink(courseUrl,(err) =>{
        res.status(40).json(object)
    })
}

const logError = (db,data) =>{

    let sql = "INSERT INTO error_logs SET ?"
    db.query(sql, {tableType:data.tableType,message:data.message,date:new Date()},(err,result) =>{})
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
module.exports = {handleImageFileUpload, isEmpty,validateEmail,fileUploadError,logError}

