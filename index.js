require('dotenv').config();
const express = require("express")

const path = require('path')

const app = express()

const userroutes = require('./routes/user')

const blogroutes = require('./routes/blog')

const cookiesparser = require("cookie-parser")

const {HandleMongoDB} = require('./connect')

const {check} = require('./middleware/authentication')

const Blog = require('./model/blog')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookiesparser())
app.use(express.static(path.resolve('./public')))
app.use(check("token"))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
process.env.MONGO_URL
const port =  process.env.PORT || 8000
HandleMongoDB(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB is Connnect!")
}).catch((err)=>{
    console.log("ERROR:",err)
})
app.get('/', async (req, res) => {
   try {
    if (res.headersSent) return ;
    const post = await Blog.find({})
    res.render('home', {
         user: req.user,
         blogs:post });
   } catch (error) {
    res.redirect('/signin')
   }
});
app.get('/history',async(req,res)=>{
    const allhist = await Blog.find({createdBy:req.user._id})
   res.render('history',{blogs:allhist,user: req.user})
})
app.get('/', (req, res) => {
    if(!req.user) return
    res.render('home', { user: post });
});

app.use('/',userroutes)
app.use('/',blogroutes)

app.listen(port,(req,res)=>{
    console.log(`server is runing on ${port}`)
})