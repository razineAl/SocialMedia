const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    postText:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

});
module.exports = mongoose.model('Post',postSchema);