const passport = require('passport');
const local = require('./local');
const userModel = require('../model/user')

module.exports = ()=>{
    passport.serializeUser((user,done)=>{ 
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done)=>{
        try {
            const user = await userModel.findOne({'email':{$eq:id}})
            console.log('deserialize',user)
            done(null,user)
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
}