require('./config');
const express=require('express');
const cors=require('cors');
const app=express();

const User=require('./user');
const Message=require('./messages');

app.use(express.json());
app.use(cors());

app.post('/message',async(req,resp)=>{
    const {name,message}=req.body.data;
    const deleteMsg=await Message.deleteMany({name:name});
    const perfect={name,message};
    const newMesssage=new Message(perfect);
    const saveMessage=await newMesssage.save();
    if(saveMessage){
        resp.json({message:'Message Send',status:200});
    }else{
        resp.json({message:"Server issue try later",status:500});
    }
});

app.post('/getMsg',async(req,resp)=>{
    if(req.body.name=="monu" || req.body.name=="niti"){
        const checkMonu=await Message.find({name:'monu'});
        const checkNiti=await Message.find({name:'niti'});
        if(checkMonu && checkNiti){
            resp.json({checkMsg:{monuMsg:checkMonu[0].message,nitiMsg:checkNiti[0].message},status:200});
        }else{
            resp.json({message:"Server issue try later",status:500});
        }
    }else{
        resp.json({message:"You are not authorised person",status:500});
    }
})


app.post('/login',async(req,resp)=>{
    const {username,password}=req.body;
    if(username=="nitiqueen001"){
        if(password=="nitiqueen@001"){
            resp.json({message:'ok',name:'niti',status:200});
        }else{
            resp.json({message:'Wrong password',status:500});
        }
    }else if(username=="Monukr9236"){
        if(password=="Monukr@1a"){
            resp.json({message:'ok',name:'monu',status:200});
        }else{
            resp.json({message:'Wrong password',status:500});
        }

    }else{
        resp.json({message:'Tumhe main nhi jaanta gett off'});
    }

})



app.listen();