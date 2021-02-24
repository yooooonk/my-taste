const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')

router.post('/like',bookController.likeBook);
router.delete('/unlike',bookController.unlikeBook);
router.get('/basket',isLoggedIn, bookController.getBookBasket);



module.exports = router;