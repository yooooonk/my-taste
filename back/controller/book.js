const bookBasket = require('../model/bookBasket')

exports.likeBook = async(req,res,next)=>{
    try {
        const book = req.body
        const addedBook = await bookBasket.create({
            email:req.user.email,
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
        await bookBasket.deleteOne({isbn:req.params.isbn}) 

        res.status(200).send(req.params.isbn)
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