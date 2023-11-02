const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const value=new Schema({
    username:String,
    password:String
})

const User=mongoose.model('users',value);
module.exports=User;