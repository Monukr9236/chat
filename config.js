const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://theofficialmonusharma:MLsarS6azp5eN46O@cluster0.h1clpeh.mongodb.net/chat?retryWrites=true&w=majority').then(()=>{
    console.log('Database connected');
});
