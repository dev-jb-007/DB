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
    },
    isDocter:{
        type:Boolean
    },
    set:{
        
            type:mongoose.Types.ObjectId,
            ref:'set'
        
    },
    activities:[
        {
            activity:{
                type:mongoose.Types.ObjectId,
                ref:'activity'
            },
            progress:{
                type:Number
            },
            remainder:{
                type:Date
            }
        } 
    ],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
userSchema.methods.createAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens=user.tokens.concat({token:token});//.concat combines two or more array
    // console.log(user);
    await user.save();
    return token;
}
module.exports=mongoose.model('user',userSchema);
