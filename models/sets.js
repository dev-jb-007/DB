const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const setSchema=new Schema({
    addiction:{
        type:String
    },
    strength:{
        type:Number
    },
    time:{
        type:Number
    },
    activities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'activity'
        }
    ]
})

module.exports=mongoose.model('set',setSchema);