const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const userModel = require('../model/user')

module.exports = (passport)=>{
    passport.use(new kakaoStrategy({
        clientID:process.env.KAKAO_CLIENT_ID,
        callbackURL: '/auth/kakao/callback'
    },async(accessToken, refreshToken,profile,done)=>{
        try {
            
        } catch (error) {
            
        }
    }))
}