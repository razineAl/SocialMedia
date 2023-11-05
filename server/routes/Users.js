const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const { validateToken }= require('../middlewares/AuthMiddleware');
const Post = require('../model/Post');

router.post('/',async (req,res)=>{
    const { username , password } = req.body;
    bcrypt.hash(password, 10).then((hashedPwd)=>{
        User.create({
        username:username,
        password:hashedPwd
    })});
    res.json('success');
});

router.post('/login',async (req,res)=>{
    const { username , password } = req.body;
    const user = await User.findOne({username:username});
    if(!user) return res.json({error:'user not found !'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.json({error:'password incorrect'});

    const accessToken = sign({username:user.username,id:user._id},"seecreet");
    res.json({token: accessToken, username:username,id:user._id});
});

router.get('/profile/:id' , async (req,res)=>{
    const id = req.params.id;

    const profileInfo = await User.findOne({_id:id}).select('-password').exec();

    
    res.json(profileInfo);
});

router.get('/profile/posts/:author', async (req,res)=>{
    const author = req.params.author;
    const posts = await Post.find({author:author});
    res.json(posts);
})

router.get('/auth', validateToken,(req,res)=>{
    res.json(req.user);
});




module.exports = router;