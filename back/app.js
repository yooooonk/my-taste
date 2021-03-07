const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passportConfig =  require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path')
const app = express();

var uri = 'mongodb://localhost/my-taste' ;
var db = mongoose.connect(uri, { useFindAndModify: false });

dotenv.config();
app.use(express.json())
app.use('/',express.static(path.join(__dirname,'uploads')))
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true // 쿠키전달
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        secure:false
    }
}));
app.use(passport.initialize())
app.use(passport.session())
passportConfig();

//router
const userRoutes = require('./router/user')
app.use('/user',userRoutes)  

const bookRoutes = require('./router/book')
app.use('/book',bookRoutes)  

const utillRoutes = require('./router/utill')
app.use('/utill',utillRoutes)  

app.get('/',(req,res)=>{
    res.send('hello express')
})


app.listen(3065,()=>{
    console.log('서버실행중중')
})
