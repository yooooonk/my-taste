const mongoose = require('mongoose')
const bookDiarySchema = new mongoose.Schema({
    email:{ type:String, required:true},
    title:{
        type:String,
        required:true
    },
    authors:String,    
    phrases : [{id:Number},{phrase:String}],
    src:String,    
    isbn:String,   
    comment:String, 
    date:{type:Date, default:Date.now}
})

const bookDiary = mongoose.model('book',bookDiarySchema)

module.exports = bookDiary;