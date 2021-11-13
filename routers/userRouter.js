const express=require('express');
const router=express.Router();
const User=require('../models/users');
const schedule=require('node-schedule');
const Set=require('../models/sets');
const cookieParser=require('cookie-parser');
const isAuth=require('../config/isAuth');
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({extended:true}));
let update;
router.route('/signup')
    .post(async (req,res,next)=>{
        try{
            let user=new User(req.body);
            let token= await user.createAuthToken();
            res.cookie('jwt',token,{
                expires:new Date(Date.now()+5000000000),
                httpOnly:true,
            });
            res.redirect('/user/dashboard');
        }
        catch(err)
        {
            next(err);
        }
    })

router.route('/dashboard')
    .get(isAuth,async (req,res,next)=>{
        try{
            let user=req.user;
            // console.log(user);
            res.render('dashboard',user);
        }
        catch(err)
        {
            next(err);
        }
    })

router.route('/dashboard/profile')
    .get(isAuth,async (req,res,next)=>{
        try{
            res.render('profile',{user:req.user});
        }
        catch(err)
        {

        }
    })
router.route('/update')
    .post(isAuth,async (req,res,next)=>{
        try{
            const user=await User.findById(req.user._id);
            let newUser=await User.findOneAndUpdate(user,req.body,{new:true});
            console.log(newUser);
            res.send({status:'Done'});

        }
        catch(err)
        {
            next(err);
        }
    })
router.route('/dashboard/form')
    .get(isAuth,async (req,res,next)=>{
        try{
            let arr=new Array;
            arr=await Set.find({},'name');
            // console.log(arr);
            res.render('form',{array:arr,name:req.user.name});
        }
        catch(err)
        {
            next(err);
        }
    })
    .post(isAuth,async(req,res,next)=>{
        try{
            let set=await Set.findOne(req.body);
            let user=await User.findById(req.user._id);
            user.set=set._id;
            let arr=new Array;
            set.activity.forEach(item=>{
                arr.push({
                    activity:item._id,
                    progress:0,
                    remainder:0
                });
            })
            user.activities=arr;
            await user.save();
            res.send({status:'Done'});
        }
        catch(err)
        {
            next(err);
        }
    })
router.route('/login')
    .post(async (req,res,next)=>{
        try{
            const user=req.body;
            // console.log(user);
            const found=await User.findOne({email:user.email,password:user.password});
            // console.log(found);
            if(found)
            {
                // console.log('Hello');
                let x=1;
                update=schedule.scheduleJob('job-1','*/10000000 * * * * *',async ()=>{
                    found.name='Bhavik'+x++;
                    await found.save();
                    console.log('Run');
                });
                let token= await found.createAuthToken();
                res.cookie('jwt',token,{
                    expires:new Date(Date.now()+5000000000),
                    httpOnly:true,
                });
                res.send({status:'done'});
            }
            else{
                let error=new Error('Enter Valid Credantials');
            }
        }
        catch(err)
        {
            err.status=403;
            next(err);
        }
    })
router.route('/signout')
    .post(isAuth,async (req,res,next)=>{
        try{
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            let z=schedule.scheduledJobs['job-1'];
            if(z)
            {
                z.cancel();
            }
            await req.user.save();
            res.send({status:"done"});
        }
        catch(err)
        {
            next(err);
        }
    })
module.exports=router;