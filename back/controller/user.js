const userModel = require('../model/user')
const bookBasketModel = require('../model/bookBasket')
const bookDiaryModel = require('../model/bookDiary')
const bcrypt = require('bcrypt')
const passport = require('passport');


exports.getUser = async(req,res,next)=>{
    try {
        if(req.user){
            const user = await userModel.findById(req.user._id)
            res.status(201).json(user);
        }else{
            res.status(200).json(null);
        }
        
        
    } catch (error) {
        console.error(error)
        next(error)
    }
}

exports.signUp = async(req,res,next)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.pw,13);
        const createdUser = await userModel.create({
            email:req.body.id,
            pw:hashedPassword,
            nickname:req.body.nickname
        })                            
        
        res.status(201).json({'msg':'회원가입완료','data':createdUser})
    }catch(err){
        next(err);
    }    
}

exports.checkIdMultiple = async(req,res,next)=>{
    try{       
        
        const result = await userModel.find({'email':{$eq:req.body.id}})
        
        if(result.length > 0){
            return res.status(403).send({'errorMsg':'이미 사용중인 아이디입니다'})
        }
        
        return res.status(201).send({msg:'사용가능한 아이디입니다'})
        
    }catch(err){        
        next(err)
    }
}

exports.login = async(req,res,next)=>{   
                
        passport.authenticate('local',(err,user,info)=>{
            if(err){
                console.error(err);
                return next(err);
            }
            if(info){
                return res.status(403).send(info.reason)
            }

            return req.login(user, async(loginErr)=>{ //패스포트 로그인, serialize user로 감
                if(loginErr){ //패스포트 로그인 에러
                    console.error(loginErr)
                    return next(loginErr)
                }
                
                const userWithoutPW = await userModel.findById(user.id).select('_id email nickname');
                
                return res.status(200).json(userWithoutPW);
            })
        })(req,res,next);
}

exports.logout = async(req,res,next)=>{
    try {        
        console.log('로그아웃',req.user)
        req.logout();
        req.session.destroy();
        res.status(200).send('ok')
    } catch (error) {
        next(error)
    }
}

exports.getDashBoardData = async(req,res,next)=>{
    try {
        const email = req.user.email
        const basketCount = await bookBasketModel.find({'email':{$eq:email}}).count()
        const isReadCount = await bookBasketModel.find({'email':{$eq:email},'isRead':{$eq:true}}).count()
        const diaryCount = await bookDiaryModel.find({'email':{$eq:email}}).count()
        const randomPhrase = await bookDiaryModel.aggregate([{$sample:{size:1}},{$project: {'phrases': true}}])
        console.log(basketCount,isReadCount,diaryCount)
        res.status(200).json({basketCount, isReadCount, diaryCount,randomPhrase})
    } catch (error) {
        next(error)
        
    }
}