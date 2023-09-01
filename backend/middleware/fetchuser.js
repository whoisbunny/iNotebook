var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Bunny$Secret';

const fetchusers =(req,res,next)=>{ 
    // getting data from jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'Invalid token'});

    }
    try {
    
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
    
        next();    
    } catch (error) {
        res.status(401).send({error: 'Invalid token' , token: token});

    }
    
}

module.exports = fetchusers