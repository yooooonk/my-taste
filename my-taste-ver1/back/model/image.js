const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    date:{type:Date, default:Date.now}
})

const image = mongoose.model('image',imageSchema)

module.exports = image;