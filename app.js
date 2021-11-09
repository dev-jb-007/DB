const express=require('express');
const path=require('path');
const http=require('http');
const ejs=require('ejs');
const app=express();
const server=http.createServer(app);
require('./config/mongoose');

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
})

server.listen(proces.env.PORT,'https://dbcentre.herokuapp.com/',(err)=>{
    if(err)
    {
        console.log('There is an error');
    }
    else{
        console.log('Server Started on port 3000');
    }
})