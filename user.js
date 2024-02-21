const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const value=new Schema({
    name:String,
    username:String,
    password:String,
    lastSeen:String
})

const User=mongoose.model('users',value);
module.exports=User;