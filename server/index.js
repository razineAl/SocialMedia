require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


const connectDB = require('./config/dnConn');
const postRouter = require('./routes/Posts');
const commentRouter = require('./routes/Comments');
const userRouter = require('./routes/Users');
const likeRouter = require('./routes/Likes');

connectDB();


app.use(express.json());
app.use(cors());


app.use('/posts',postRouter);
app.use('/comments',commentRouter);
app.use('/auth',userRouter);
app.use('/likes',likeRouter);


mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    app.listen(3001,()=>{
        console.log('server is running on port 3001');
    })
})