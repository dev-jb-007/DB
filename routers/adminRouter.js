const express=require('express');
const router=express.Router();
const Activity=require('../models/activities');
const isAuth=require('../config/isAuth');
const isDocter=require('../config/isDocter');
const cookieParser=require('cookie-parser');
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.route('/activities')
    .get(isAuth,async (req,res,next)=>{
        try{
            let ac=new Array;
            ac=await Activity.find();
            res.send(ac);
        }
        catch(err)
        {
            next(err);
        }
    })
    .post(isAuth,async (req,res,next)=>{
        try{
            let ac=new Activity(req.body);
            await ac.save();
            res.send(ac);
        }
        catch(err)
        {
            next(err);
        }
    })
module.exports=router;