const express = require('express');
const router = express.Router();
const userController = require('../controller/user')
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')

router.get('/',userController.getUser)
router.post('/signup',isNotLoggedIn,userController.signUp)
router.post('/checkIdMultiple',userController.checkIdMultiple)
router.post('/login',isNotLoggedIn,userController.login)
router.post('/logout',isLoggedIn,userController.logout)


module.exports = router;