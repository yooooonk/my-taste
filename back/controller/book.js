const bookBasket = require('../model/bookBasket')
const bookDiary = require('../model/bookDiary')

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

exports.updateBookState = async(req,res,next)=>{
    try {
        let result = null;
            
        const bookInfo = await bookBasket.findById(req.body.id); 
        
        if(req.body.state === 'isRead'){
            const isRead = bookInfo.isRead;
            result = await bookBasket.findByIdAndUpdate(req.body.id,{isRead:!isRead},{new:true});             
            
        }/* else{
            const isWrite = bookInfo.isWrite;
            result = await bookBasket.findByIdAndUpdate(req.body.id,{isWrite:!isWrite},{new:true}); 
        } */
        
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

exports.writeBookDiary = async(req,res,next)=>{
    try {
        let result = null;
        const payload = req.body;
        //insert
        const createDiary = await bookDiary.create({
            email:req.user.email,
            title:payload.title, //책제목
            authros:payload.authors, // 작가
            phrases: payload.phrases,//문장들
            comment:payload.comment, // 서평
            isbn:payload.isbn,
            src:payload.src
        })  

        await bookBasket.findOneAndUpdate({'isbn':payload.isbn},{isWrite:true},{returnOriginal: false})
        
        res.status(201).json({createDiary,result});
    } catch (error) {
        next(error)
    }
}

exports.getBookDiary = async(req,res,next)=>{
    try {
        const result = await bookDiary.find({'email':{$eq:req.user.email}})
        res.status(201).json(result)
    } catch (error) {
        next(error);
        
    }
}