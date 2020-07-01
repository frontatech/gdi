let fs = require('fs')
const verifyPaystackPayment = async (request,paystack) =>{
    if (!request.reference) {
        return {error:true, message: "No Reference Id Found"};
      }
    try {
        let result = await paystack.transaction.verify(request.reference)
        return {...result,error:false}
    } catch (err) {
        return {error:true, message: err}
    }
}
const logError = (db,data) =>{
    let sql = "INSERT INTO error_logs SET ?"
    db.query(sql, {tableType:data.tableType,message:data.message,date:new Date()},(err,result) =>{})
}
// throw mysql error
const removeUploadedFile = (res,url,type,object) =>{
    console.log(url)
    fs.unlink(url,(err) =>{
        if(type === 'error'){
            res.status(401).json(object)
        }
        else{
            res.json(object)
        }
        
    })
}
const removeFiles = (files, callback) =>{
    files.forEach(filePath =>{
        fs.unlink(filePath,(err) =>{
            if(err) callback(err)
            return callback(null)
        })
    })
}

module.exports ={ verifyPaystackPayment, logError,removeUploadedFile}