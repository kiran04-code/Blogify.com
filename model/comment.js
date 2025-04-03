const mongoose = require("mongoose")
const { countDocuments } = require("./blog")

const CommentSchem = new mongoose.Schema({
content:{
    type:String,
    require:true
},
blogId:{
 type:mongoose.Schema.Types.ObjectId,
    ref:"blog"
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
},{timestamps:true})

const comment = mongoose.model('comment',CommentSchem)

module.exports = comment