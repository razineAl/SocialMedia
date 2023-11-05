const express = require('express');
const router = express.Router();
const Comment = require('../model/Comment');
const {validateToken} = require('../middlewares/AuthMiddleware');

router.get('/:id',async (req,res)=>{
    const comments = await Comment.find({post:req.params.id});
    res.json(comments);
})

router.post('/', validateToken , async (req,res)=>{
    const comment = req.body;
    comment.username = req.user.username;
    await Comment.create(comment);
    res.json(comment);

});

router.delete('/:id', validateToken, async(req,res)=>{
    const id = req.params.id;
    await Comment.deleteOne({_id:id});
    res.json('deleted successfully');
})

module.exports = router;