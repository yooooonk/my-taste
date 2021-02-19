const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    pw:{
        type:String,
        require:true
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user;