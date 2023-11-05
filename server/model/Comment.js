const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentBody:{
        type:String,
        required:true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    username:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('Comment',commentSchema);