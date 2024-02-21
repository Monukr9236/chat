const mongoose=require('mongoose');
const schema=mongoose.Schema;
const newSchema=new schema({
    name:String,
    message:String,
    time:String
})

const message=mongoose.model('messages',newSchema);

module.exports=message;