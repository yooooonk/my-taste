const passport = require('passport');
const {Strategy:LocalStrategy} = require('passport-local')
const userModel = require('../model/user')
const bcrypt = require('bcrypt')

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField:'id',
        passwordField:'pw'
    },async(id,pw,done)=>{
        try {
            const user = await userModel.findOne({'email':{$eq:id}})
            
        
            if(!user){
                return done(null,false,{reason:'존재하지 않는 사용자입니다'})
            }
            
            const result = await bcrypt.compare(pw,user.pw);
            if(result){
                return done(null,user);
            }

            return done(null,false,{reason:'비밀번호를 확인해주세요'})      
        
        } catch (error) {
            console.error(error);
            return done(error);
        }

      
      
    }));
}