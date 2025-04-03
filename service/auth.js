const JWT  = require('jsonwebtoken')

const  secret  = '$uperman@123'

function createToken(user){
    const payload = {
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role
    }

    const token = JWT.sign(payload,secret)
    return token
}

function validateToken(token){
    const payload = JWT.verify(token,secret)
    return payload;
}
module.exports = {
    createToken,
    validateToken
}