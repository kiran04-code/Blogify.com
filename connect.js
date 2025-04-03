const mongoose = require('mongoose')

async function HandleMongoDB(url){
    mongoose.connect(url)
}

module.exports = {
    HandleMongoDB
}