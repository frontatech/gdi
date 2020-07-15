let express = require('express')
let authRouter = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth =  require('./authVerify')
const {isEmpty,validateEmail} = require('./appFunctions')
let db = require('./db')
let {logError} =  require("./appFunctions")

authRouter.post('/register', async (req, res)=>{
    let isError = false
    let data = JSON.parse(JSON.stringify(req.body))
    if(isEmpty(data) || data === null || !data){
        return res.status(400).json({access:false,message:"You can not submit empty data"})
    }
    if(!data.username || data.username === "")isError = true
    if(!data.role || data.adminRole === "") isError =  true
    if(!data.password || data.adminPassword === "")isError = true
    if(data.password.length < 8) return res.status(403).json({error:"Password can not be less than 8 characters"})
    if(isError)return res.status(403).json({error:"Please verify your login credentials"})
    console.log(data)
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(data.password, salt)
    // check if user already exist
    let sql = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(sql,[data.username,data.username],(err, result) =>{
        if(err) {
            return res.status(500).json({access:false,error:"Registration not Successful, check your credentials"})
        }
        if(result.length === 0){
            // then hash the password
            const user = {username:data.username,email: '',password:hashPassword,status:1,role:data.role,total_posts:0, full_name:"",photo_url:'',fb_link:"", instalink:"",twitter_link:"",linkedin:""}
            const sql = "INSERT INTO users SET ?"
            db.query(sql,user,(err,result) =>{
                if(err) {
                    //  logError(db,{tableType: "users",message:err.message})
                     return res.status(500).json({access:false,error:"Registration not Successful, An Error Occured"})
                }
                return res.json({access:true,message:"Registration Successful",admin:{username:data.username,role:data.role,status: 1}})
            })
        }
        else{
            res.status(403).json({access:false,error:"User already exist"})
        }
    })
    
    
    
})
authRouter.post('/login',(req, res)=>{
    console.log('auth Request has arrived')
    let correct = true
    let data = JSON.parse(JSON.stringify(req.body))
    if(isEmpty(data) || data === null || !data)return res.json({access:false, error:"Invalid request"})
    if(!data.username || data.username === "")correct = false
    if(!data.password || data.password === "")correct = false
    if(!correct)return res.status(400).json({access:false,error:"All fields are required"})
    let sql = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(sql,[data.username,data.username],async (err, result) =>{
        console.log(err)
        if(err) {
            res.status(500).json({access:false,error:"Sorry an error occurred, please contact the admin for support!"})
            // return logError(db,{tableType: "users",message:err.message})
        }
        if(result.length === 1 && !isEmpty(result)){
            result = result[0]
            let verifyPassword = await bcryptjs.compare(data.password, result.password)
            if(verifyPassword){
                // console.log(process.env.GDI_SECRET_TOKEN)
                if(result.status === 0){
                   return res.status(403).json({access:false,error:"You are blocked, please contact the admin"})
                }
                const user = { _id: result.id, fullName: result.full_name, username: result.username, fbLink: result.fb_link, instalink: result.instalink, twitterLink: result.twitter_link, linkedin: result.linkedin, email: result.email, status: result.status, role: result.role, total_posts: result.total_posts } 
                let secret_token = jwt.sign(user, process.env.GDI_SECRET_TOKEN,{expiresIn: 60*60})
                let refreshToken = jwt.sign(user,process.env.GDI_SECRET_REFRESH_TOKEN,{expiresIn: 60*60})
                auth.refreshTokenArray({token:secret_token,refreshToken,username:user.username,type:'active',action:'add'})
                // store the token for 15 minutes, 15*60*1000
                res.cookie('idgLocalToken', secret_token, {expires: new Date(Date.now() + 900000 ), secure: false });
                res.cookie('idgAToken', secret_token, { httpOnly: true, expires: new Date(Date.now() + 900000 ), secure: true });
                res.cookie('idgRefreshToken', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 604800000 ), secure:true });
                return res.json({message:"Login Successful",token:secret_token,refreshToken,access:true,user})
            }
            return res.status(401).json({access:false,error:"Wrong login credentials provided"})
        }
        return res.status(403).json({access:false,error:"User does not exist"}) 
        
    })
    
})

authRouter.post('/refreshToken',auth.checkExpiredToken,auth.verifyRefreshAuth,(req,res) =>{
    const user = req.user
    delete user.iat;
    delete user.exp
    let secret_token = jwt.sign(req.user, process.env.GDI_SECRET_TOKEN,{expiresIn: 60*60})
    let refreshToken = jwt.sign(req.user,process.env.GDI_SECRET_REFRESH_TOKEN,{expiresIn: 60*60})
    auth.refreshTokenArray({token:secret_token,refreshToken,username:user.username,type:'active',action:'add'})
    // store the token for 30 minutes
    res.cookie('idgLocalToken', secret_token, {expires: new Date(Date.now() + 900000 ), secure: false });
    res.cookie('idgAToken', secret_token, { httpOnly: true, expires: new Date(Date.now() + 900000 ), secure: false });
    res.cookie('idgRefreshToken', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 604800000 ), secure:false });
    return res.json({message:"Token refreshed",token:secret_token,refreshToken,access:true})
})
// admin reset password
authRouter.post('/admin/reset-password', async (req, res) =>{
    let data = req.body
    let isError = false
    if(isEmpty(data)){
        return res.status(403).json({error:"Wrong data sent, ensure you have filled the form before submitting."})
    }
    if(data.password === "") isError = true
    if(data.confPwd === "") isError = true
    if(data.password !== data.confPwd){
        return res.status(403).json({error:"Two passwords do not match"})
    }
    if(isError){
        return res.status(403).json({error:"Wrong data sent, ensure you have filled the form before submitting."})
    }
    if(isNaN(parseInt(data.admin))){
        return res.status(403).json({error:"Sorry, you're not permitted to perform this operation."})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(data.password, salt)
    let sql = "SELECT * FROM users WHERE id = ?"
    db.query(sql,[parseInt(data.admin)],(err, result) =>{
        console.log(err)
        if(err) {
            res.status(500).json({access:false,error:"Sorry an error occurred, please contact the admin for support!"})
            // return logError(db,{tableType: "users",message:err.message})
        }
        if(result.length === 1){
            let update = "UPDATE users SET password = ? WHERE id = ?"
            db.query(update,[hashPassword,parseInt(data.admin)], (e, r) =>{
                if(e){
                    return res.status(500).json({access:false,error:"Sorry an error occurred, please logout and login again!"})
                }
                console.log("successfully changed password")
                return res.json({message:"Password changed successfully."})
            })
        }
        else{
            res.status(403).json({error:"Sorry an error occurred, Such user does not exist"}) 
        }
    })
        
})

authRouter.post('/logout',(req,res)=>{
    console.log('loginout')
    const token = req.cookies['idgLocalToken']
    console.log(token)
    if(!token) {
        return res.status(403).json({access:false,message:"Access denied"})
    }
    auth.refreshTokenArray({action:'logout',token})
    return res.status(200).json({access:true,message:'Logout successfully'})
})


module.exports = authRouter