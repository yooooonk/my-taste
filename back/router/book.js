const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')

router.post('/like',bookController.likeBook);
router.delete('/unlike/:isbn',bookController.unlikeBook);
router.get('/basket',isLoggedIn, bookController.getBookBasket);
router.post('/update',isLoggedIn, bookController.updateBookState);
router.post('/diary',isLoggedIn, bookController.writeBookDiary);



module.exports = router;