const mongoose = require('mongoose')

const Blogchema = new mongoose.Schema({
title:{
    type:String,
    require:true
},
body:{
    type:String,
    require:true
},
converImageIUrl:{
   type:String,
   require:true

},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},

},{timestamps:true})

const Blogs = mongoose.model("blog",Blogchema)

module.exports  = Blogs