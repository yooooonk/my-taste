userModel = require('../model/user')
const bcrypt = require('bcrypt')

exports.signUp = async(req,res,next)=>{
    try{


        const hashedPassword = await bcrypt.hash(req.body.pw,13);
        const createdUser = await userModel.create({
            id:req.body.id,
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
        
        const result = await userModel.find({'id':{$eq:req.body.id}})
        
        if(result.length > 0){
            return res.status(403).send({'errorMsg':'이미 사용중인 아이디입니다'})
        }
        
        return res.status(201).send({msg:'사용가능한 아이디입니다'})
        
    }catch(err){        
        next(err)
    }
}