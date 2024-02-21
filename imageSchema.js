const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const value=new Schema({
    url:String,
    name:String
})

const Image=mongoose.model('images',value);
module.exports=Image;