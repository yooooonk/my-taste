const mongoose = require('mongoose')
const bookBasketSchema = new mongoose.Schema({
    email:{ type:String, required:true},
    title:{
        type:String,
        required:true
    },
    isRead:{type:Boolean, default:false},
    isWrite:{type:Boolean, default:false},
    url:String,
    authors:String,
    publisher:String,    
    isbn:String,
    thumbnail:String,
    date:{type:Date, default:Date.now}

})

const bookBasket = mongoose.model('book',bookBasketSchema)

module.exports = bookBasket;