const jwt = require('jsonwebtoken')

module.exports =  { 
    authenticate (req,res,next){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(401).send('Access Denied')
        try {      
            const verified = jwt.verify(token, process.env.JWT_SECRET_ACCESS)
            //to check: req.user = verified
            req.user = verified
            next()
        } catch(error){
            res.status(401).send('Invalid Token')
        }
    }
}