const mongoose = require('mongoose')
const bookBasketSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:String,
    url:String,
    authors:String,
    publisher:String,
    price:String,
    isbn:String,
    date:{type:Date, default:Date.now}

})

const bookBasket = mongoose.model('book',bookBasketSchema)

module.exports = bookBasket;