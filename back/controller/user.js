const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const passport = require('passport');


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

                return res.status(200).json(user);
            })
        })(req,res,next);
}

exports.logout = async(req,res,next)=>{
    try {        
        req.logout();
        req.session.destroy();
        res.status(200).send('ok')
    } catch (error) {
        next(err)
    }
}