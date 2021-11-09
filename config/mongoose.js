const mongoose=require('mongoose');
require('dotenv').config();
const url='mongodb+srv://DB:DevBhavik@cluster0.vrzx4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Succesfully Connected to Database");
}).catch(err=>{
    console.log(err);
});