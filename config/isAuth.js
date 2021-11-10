const jwt=require('jsonwebtoken');
const User=require('../models/users');

const auth = async (req, res, next) => {
    try {
        const token =req.cookies.jwt;
        console.log("THis is empty"+token);
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findOne({_id:decode._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.token=token;
        req.user=user;
        next();
    }
    catch (e) {
        res.status(401).send({error:'Please Authanticate'})
    }
}

module.exports = auth;