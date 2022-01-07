const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const setSchema=new Schema({
    addiction:[
        {
            type:String
        }
    ],
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
    },
    leaderboard:[
        {
            userid:{
                type:String
            },
            rank:{
                type:Number
            }
        }
    ]
})

module.exports=mongoose.model('set',setSchema);