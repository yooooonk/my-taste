const express = require('express');
const router = express.Router();
const utillController = require('../controller/utill');
const {isLoggedIn} = require('./middlewares')
const image = require('../model/image')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

try{ 
    fs.accessSync('uploads');
}catch(error){
    console.log('uploads 폴더가 없으므로 생성합니다')
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null, 'uploads'); // uploads라는 폴더에 저장
        },
        filename(req,file,done){
            const ext = path.extname(file.originalname); //확장자 추출  .png
            const basename = path.basename(file.originalname,ext); //제로초
            
            done(null, basename+new Date().getTime()+ext);
        }
    }),
    limits:{ fileSize:20*1024*1024}
})

router.post('/image',isLoggedIn,upload.array('image'),utillController.uploadImage);



module.exports = router;

