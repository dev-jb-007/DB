const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const jwt=require('jsonwebtoken');
const userSchema=new Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isVerify:{
        type:Boolean
    }
})

module.exports=mongoose.model('user',userSchema);
