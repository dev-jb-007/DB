const express=require('express');
const path=require('path');
const http=require('http');
const ejs=require('ejs');
const app=express();
const server=http.createServer(app);
const userRouter=require('./routers/userRouter');
require('./config/mongoose');
// Dev
//middleswares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Serving static files
app.use(express.static(path.join(__dirname, 'static')));


//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates/views'));

app.get('/',(req,res)=>{
    res.render('homepage');
});
app.get('/signup',(req,res)=>{
    res.render('signup');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.use('/user',userRouter);
app.use(function (err, req, res, next) {
    res.status(err.status).send({status:err.status,error:err.message});
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