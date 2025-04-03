const express= require("express")

const Blog = require('../model/blog')

const comt = require('../model/comment')

const routers = express.Router()

const multer = require('multer')

const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

routers.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user:req.user
    })
})
routers.get('/blog/:id', async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comment = await comt.find({blogId:req.params.id}).populate('createdBy')
    console.log(blog)
    res.render('blogs',{
        user:req.user,
        blog,
        comment
    })
})

routers.post('/post',upload.single("converImageIUrl") ,async(req,res)=>{
 const body = req.body
  const post = await Blog.create({
    title:body.title,
    body:body.body,
    createdBy:req.user._id,
    converImageIUrl:`/uploads/${req.file.filename}`
  })
  console.log(post)
  res.redirect('/')
})

routers.post('/blog/comment/:blogId',async(req,res)=>{
  
    const comment = await comt.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = routers
