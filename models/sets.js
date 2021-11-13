const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const setSchema=new Schema({
    name:{
        type:String
    },
    strength:{
        type:Number
    },
    time:{
        type:Number
    },
    activity:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'activity'
        }
    ],
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports=mongoose.model('set',setSchema);