const {Schema,model} = require('mongoose')

const { createHmac,randomBytes } = require('node:crypto');

const { createToken} = require('../service/auth')

const userSchema = new Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    salt:{
        type:String,
      

    },
    password:{
        type:String,
        require:true
    },
    profileImageUrl:{
     type:String,
     default:"/userImage.avif/"
   },
   role:{
    type:String,
    enum:["USER","ADMIN"],
    default:"USER"
   }


},{timestamps:true})

userSchema.pre('save',function(next){
    const User = this;
    if (!User.isModified("password")) return next();
    const salt = randomBytes(16).toString()
    const hashedpassword = createHmac('sha256',salt)
    .update(User.password)
    .digest('hex')
    console.log(hashedpassword)
    this.salt = salt
    this.password = hashedpassword
    next()
})
userSchema.static("matchPasswordAndGenratedToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User is not found!");
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== userProvidedHash) 
        throw new Error("Incorrect Password");
       const token = createToken(user)
       return token

});
const User = model("user",userSchema)

module.exports = User