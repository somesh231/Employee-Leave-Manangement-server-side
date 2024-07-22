const jwt = require('jsonwebtoken');
const User =require('../models/user-model');

const authMiddleware = async(req,res,next)=>{

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message:"Unauthorized HTTP,Token not provided"});
    }
    


    const jwtToken = token.replace("Bearer",' ').trim();

    try{

        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET);
        

        const userData = await User.findOne({email:isVerified.email}).select({password:0,});
        

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        req.userCount = userData.CountLeave

        next();

    }catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized.Invalid Token."});
    }

}

module.exports = authMiddleware;