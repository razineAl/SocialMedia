const express = require('express');
const router = express.Router();
const Like = require('../model/Like');
const { validateToken } = require('../middlewares/AuthMiddleware');


router.post('/', validateToken , async (req,res)=>{
    const {post} = req.body;
    const id = req.user.id;
    const found = await Like.findOne({post:post,userID:id});
    if (!found) {
        await Like.create({post:post,userID:id});
        res.json({liked:true});
    } else{
        await Like.deleteOne({post:post,userID:id}); 
        res.json({liked:false});
    }
    
})


module.exports = router;


