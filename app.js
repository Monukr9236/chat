require('./config');
const express=require('express');
const cors=require('cors');
const app=express();
const multer=require('multer');
const path=require('path');

const User=require('./user');
const Message=require('./messages');
const Image=require('./imageSchema');

app.use(express.json());
app.use(cors());

app.post('/message',async(req,resp)=>{
    const {name,message}=req.body.data;
    const deleteMsg=await Message.deleteMany({name:name});
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date=new Date();
    const time=date.toLocaleString('en-US',options);
    const perfect={name,message,time};
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
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const date=new Date();
        const time=date.toLocaleString('en-US',options);
        const lastSeenUpdate=await User.updateOne({name:req.body.name},{$set:{lastSeen:time}});
        const checkMonu=await Message.find({name:'monu'});
        const checkNiti=await Message.find({name:'niti'});
        const lastSeenMonu=await User.findOne({name:'monu'});
        const lastSeenNiti=await User.findOne({name:'niti'});
        const lastSeenM=lastSeenMonu.lastSeen;
        const lastSeenN=lastSeenNiti.lastSeen;
        if(checkMonu && checkNiti){
            resp.json({checkMsg:{monuMsg:checkMonu[0].message,monuTime:checkMonu[0].time,lastSeenMonu:lastSeenM,nitiMsg:checkNiti[0].message,nitiTime:checkNiti[0].time,lastSeenNiti:lastSeenN},status:200});
        }else{
            resp.json({message:"Server issue try later",status:500});
        }
    }else{
        resp.json({message:"You are not authorised person",status:505});
    }
})


app.post('/login',async(req,resp)=>{
    const {username,password}=req.body;
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date=new Date();
    const time=date.toLocaleString('en-US',options);

    if(username=="nitiqueen001"){
        if(password=="nitiqueen@001"){
            const updateLastSeen=await User.updateOne({name:'niti'},{$set:{lastSeen:time}});
            const lastSeenM=await User.findOne({name:'monu'});
            const lastSeenMonu=lastSeenM.lastSeen;
            resp.json({message:'ok',name:'niti',lastSeenNiti:time,lastSeenMonu:lastSeenMonu,status:200});
        }else{
            resp.json({message:'Wrong password',status:500});
        }
    }else if(username=="Monukr9236"){
        if(password=="Monukr@1a"){
            const updateLastSeen=await User.updateOne({name:'monu'},{$set:{lastSeen:time}});
            const lastSeenN=await User.findOne({name:'niti'});
            const lastSeenNiti=lastSeenN.lastSeen;
            resp.json({message:'ok',name:'monu',lastSeenMonu:time,lastSeenNiti:lastSeenNiti,status:200});
        }else{
            resp.json({message:'Wrong password',status:500});
        }
        
    }else{
        resp.json({message:'Tumhe main nhi jaanta gett off'});
    }
    
})


const storage=multer.diskStorage({
    destination: './upload/images',
    filename:function(req,file,cd){
        return cd(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
  })


app.use('/photos',express.static('upload/images'));
app.post('/upload',upload.single('file'),async(req,resp)=>{
    const {name}=req.body;
    const url=`https://themks.in/api/photos/${req.file.filename}`;
    const newImage=new Image({url:url,name:name});
    const saveImage=await newImage.save();
    resp.json({message:'Image uploaded successfully',status:200});
})

app.post('/getImages',async(req,resp)=>{
    const {name}=req.body;
    if(name=="monu"){
        const images=await Image.find({name:"niti"});
        resp.json({images,status:200});
    }else{
        const images=await Image.find({name:"monu"});
        resp.json({images,status:200});
    }
});

app.listen(4000);