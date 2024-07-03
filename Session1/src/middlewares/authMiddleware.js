const jwt = require('jsonwebtoken')

const authenticatedToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(!token){
        return res.status(401).json({
            message: "Access denied"
        })
    }
    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({message: " Invalid Token"})
        }
        req.user = user;
        console.log("Body response ",res.body);
        next()
    })
}

module.exports = authenticatedToken