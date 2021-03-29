const passport = require('passport');
const local = require('./local');
const userModel = require('../model/user')

local();

module.exports = ()=>{
    passport.serializeUser(async(user,done)=>{ 
        const id = user._id        
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done)=>{
        
        try {
            const user = await userModel.findById(id)
            
            done(null,user)
        } catch (error) {
            console.error(error);
            done(error);
        }
    });
    
}