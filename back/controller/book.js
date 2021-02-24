const bookBasket = require('../model/bookBasket')

exports.likeBook = async(req,res,next)=>{
    try {
        const book = req.body.detailBook
        const addedBook = await bookBasket.create({
            email:req.body.email,
            title:book.title,
            url:book.url,
            authors:book.authors[0],
            publisher:book.publisher,            
            isbn:book.isbn,
            thumbnail:book.thumbnail
        })

        res.status(201).json(addedBook)
    } catch (error) {
        console.error(error)
        next(error);
    }
}

exports.unlikeBook = async(req,res,next)=>{
    try {
        console.log('unlike',req.body)
    } catch (error) {
        console.error(error)
        next(error);
        
    }
}

exports.getBookBasket = async(req,res,next)=>{
    try {
        
        const result = await bookBasket.find({'email':{$eq:req.user.email}})
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
}