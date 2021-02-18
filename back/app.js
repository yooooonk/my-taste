const express = require('express');
const mongoose = require('mongoose')

const app = express();

var uri = 'mongodb://localhost/my-taste' ;
var db = require('mongoose').connect(uri);

const userRoutes = require('./router/user')

app.use('/user',userRoutes) 

app.get('/',(req,res)=>{
    res.send('hello express')
})

app.listen(3065,()=>{
    console.log('서버실행중중')
})
