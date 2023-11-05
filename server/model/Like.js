const mongoose = require('mongoose');
const schema = mongoose.Schema;
const likeSchema = new schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId
    }
});




module.exports = mongoose.model('Like',likeSchema);