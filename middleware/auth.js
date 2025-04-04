const jwt = require("jsonwebtoken");

function auth(req,res,next){
    const token = req.header("x-auth-token")
    if(!token) return res.status(401).send("Access Denied. No Token Provided")
    try{
        const decoded = jwt.verify(token,process.env.lumi_jwtPrivateKey)
        req.user = decoded
        next()
    }catch(err){
        res.status(400).send("Invalid Token")
    }
}

module.exports = auth