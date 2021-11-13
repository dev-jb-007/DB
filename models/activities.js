const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const activitySchema=new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    docter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});
module.exports=mongoose.model('activity',activitySchema);