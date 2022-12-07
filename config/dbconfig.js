const mongoose=require('mongoose');
require('dotenv').config();
// mongoose.connect('mongodb://localhost:27017/userData')
mongoose.connect("mongodb+srv://practice_user:xD2oFC5W1XFjUIYu@cluster0.qqym1zm.mongodb.net/vblog?retryWrites=true&w=majority")
const DB=mongoose.connection;

DB.on('error',err=>logError(err));
DB.once('open',()=>{
    console.log("Connected to MongoDB");
})
