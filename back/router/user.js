const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

router.post('/signup',userController.signUp)
router.post('/checkIdMultiple',userController.checkIdMultiple)


module.exports = router;