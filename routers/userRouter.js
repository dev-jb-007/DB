const express=require('express');
const router=express.Router();
const User=require('../models/users');
const cookieParser=require('cookie-parser');
const isAuth=require('../config/isAuth');
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({extended:true}));

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
            res.render('dashboard');
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
            await req.user.save();
            res.send({status:"done"});
        }
        catch(err)
        {
            next(err);
        }
    })
    module.exports=router;