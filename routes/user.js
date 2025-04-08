const express= require("express")

const routerS = express.Router()

const User = require('../model/user')


routerS.get('/signin',(req,res)=>{
    return res.render('signin')
})
routerS.get('/signup',(req,res)=>{
    return res.render('signup')
})

routerS.post('/sign',async(req,res)=>{
    const body = req.body;
  try {
    const result = await User.create({
        fullName:body.fullName,
        email:body.email,
        password:body.password
       })
       res.redirect('/signin')
  } catch (error) {
    return res.render('signup',{error:"This Email is already in use. Please use a different Email"})
  }
})
routerS.post("/signin",async(req,res)=>{
    const {email,password} = req.body
 try {
    const token =  await User.matchPasswordAndGenratedToken(email, password)

    return res.cookie("token",token).redirect('/')
 } catch (error) {
    return res.render('signin',{error: "Incorrect Email or password"} )
 }
})
routerS.get('/logout',(req,res)=>{
  res.clearCookie('token').redirect('/')
})
module.exports = routerS
