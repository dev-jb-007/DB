const express=require('express');
const path=require('path');
const http=require('http');
const ejs=require('ejs');
const cookieParser=require('cookie-parser');
const app=express();
// const isAuth=require('./config/isAuth');
const setName=require('./models/setNames');
require('./config/mongoose');
const isAuth=require('./config/isAuth');
const server=http.createServer(app);
const userRouter=require('./routers/userRouter');
const adminRouter=require('./routers/adminRouter');

// Dev
//middleswares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Serving static files
app.use(express.static(path.join(__dirname, 'static')));


//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates/views'));

app.get('/',(req,res)=>{
    res.render('homepage');
});
app.post('/',isAuth,async (req,res,next)=>{
    try{
        res.send({status:'Success'});
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/admin',async (req,res)=>{
    let arr=await setName.find({});
    res.render('admin',{arr});
})
app.use('/user',userRouter);
app.use('/docter',adminRouter);
app.use(function (err, req, res, next) {
    res.status(err.status||500).send({status:err.status||500,error:err.message});
  })
app.listen(process.env.PORT || 3000,(err)=>{
    if(err)
    {
        console.log('There is an error');
    }
    else{
        console.log('Server Started on port 3000');
    }
})