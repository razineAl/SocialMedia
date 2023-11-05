const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const Like = require('../model/Like');
const {validateToken} = require('../middlewares/AuthMiddleware');

router.get('/',validateToken, async (req,res)=>{
    const Posts = await Post.aggregate([{
        $lookup:{
            from:'likes',
            localField:'_id',
            foreignField:'post',
            as:'Likes'
        }
    },]);
    const likedPosts = await Like.find({user:req.user._id})
    res.json({Posts:Posts,likedPosts:likedPosts});
});
router.get('/byId/:id',async (req,res)=>{
    const id = req.params.id;
    const post = await Post.findById(id);
    res.json(post);
});


router.post('/', validateToken, async (req,res)=>{
    req.body.username = req.user.username;
    req.body.author = req.user.id;
    const post = await Post.create(req.body);
    res.json(post);
});
router.put('/',(req,res)=>{
    res.send('gojopp');
});
router.delete('/:id',validateToken, async (req,res)=>{
    const id = req.params.id;
    const post = await Post.deleteOne({_id:id});
    res.json(post);
})

module.exports = router;