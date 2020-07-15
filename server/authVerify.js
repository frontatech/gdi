const jwt = require('jsonwebtoken')
let refreshTokens = []
module.exports.refreshTokenArray = (user)=>{
    if(user.action === "logout"){
        refreshTokens = refreshTokens.filter(tokenUser => tokenUser.token !==  user.token)
        return refreshTokens
    }
    refreshTokens = refreshTokens.filter(token => token.type !== "active" && token.username !== user.username)
    return refreshTokens.push(user)
}
module.exports.protectedRoute = (req,res,next)=>{
    const token = req.cookies['auth-token']
    if(!token) {
        return res.status(400).json({access:false,message:"Access denied"})
    }
    try {
        const verified = jwt.verify(token,process.env.GDI_SECRET_TOKEN)
        req.token = token
        req.user = verified
        next()
    } catch (error) {
        if(error.message === "jwt expired"){
            return res.status(401).send({access:false,message:"Access denied, Error jwt expired"})
        }
        return res.status(403).json({access:false,message:"Access denied,redirect"})
    }
}
module.exports.verifyRefreshAuth = async (req,res,next) =>{
    const auth_token =  req.cookies['auth-token']
    const refreshToken = req.cookies['auth-refresh-token']
    const username = req.body.username
    if(!refreshToken || !auth_token || !username) return res.status(400).send({access:false,message:"Access denied"})
    let checkUser = refreshTokens.filter(auth => auth.refreshToken === refreshToken && auth.token === auth_token && auth.username === username )
    if(checkUser.length === 1){
        try {
            const verified = jwt.verify(refreshToken, process.env.GDI_SECRET_REFRESH_TOKEN)
            req.refreshToken = refreshToken
            req.user = verified
            return next()
        }
        catch (error) {
            return res.status(403).json({access:false,message:"Access denied, Error"})
        }
    } 
    return res.status(406).send({access:false,message:"Wrong refresh token"})
}
module.exports.checkExpiredToken = async (req,res,next)=>{
    if('auth-token' in req.cookies) {
        const auth_token = req.cookies['idgAToken'];
        try{
            let verified = await jwt.verify(auth_token, process.env.GDI_SECRET_TOKEN)
            return res.status(201).json({message:'Your token is still active'})
        }
        catch(err){
            if(err.message === "jwt expired")return next()
            return res.status(401).json({message:'Sorry an error occurred!'})
        }
        
    }
    return res.status(400).json({message:'Bad request, token is required'})
}
