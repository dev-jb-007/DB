const express=require('express');
const router=express.Router();
const Activity=require('../models/activities');
const isAuth=require('../config/isAuth');
const isDocter=require('../config/isDocter');
const Set=require('../models/sets');
const cookieParser=require('cookie-parser');
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.route('/set')
    .post(isAuth,async (req,res,next)=>{
        try{
            // let obj=new Object();
            req.body.admin=req.user._id;
            // console.log(req.body);
            let newSet=new Set(req.body);
            // console.log(newSet);
            await newSet.save();
            let obj=await Set.findById(newSet._id).populate('activity');
            console.log(obj);
            res.send(obj);
        }
        catch(err)
        {
            next(err);
        }
    })
router.route('/activities')
    .get(isAuth,async (req,res,next)=>{
        try{
            let ac=new Array;
            ac=await Activity.find().populate('docter','name');
            res.send(ac);
        }
        catch(err)
        {
            next(err);
        }
    })
    .post(isAuth,async (req,res,next)=>{
        try{
            console.log('hello');
            req.body.docter=req.user._id;
            let ac=new Activity(req.body);
            await ac.save();
            let obj=await Activity.findById(ac._id).populate('docter','name');
            console.log(obj+'check this log');
            res.send(obj);
        }
        catch(err)
        {
            next(err);
        }
    })
router.route('/deleteAc')
    .post(isAuth,async (req,res,next)=>{
        try{
            let ac=await Activity.findByIdAndDelete(req.body.id);
            res.send({status:'Success'});
        }
        catch(err)
        {
            next(err);
        }
    })
module.exports=router;