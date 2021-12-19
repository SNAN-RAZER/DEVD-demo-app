const express = require('express');
const app =express()
const mongoose = require('mongoose');


require('dotenv').config()

//db URl
const MongooseURl=process.env.MongooseURl;
//connect to db
mongoose.connect(MongooseURl,(err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log('Db connected')
    }
})


//middlewares
app.use(express.json());


//import routes

const authRoutes = require('./routes/Auth');
const postRoute=require('./routes/Post')

//Route MiddleWares
app.use('/api/user',authRoutes);
app.use('/api/posts',postRoute)


app.listen(3000,()=>console.log("Server Up and running"))