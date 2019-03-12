const User = require('../models/UserModel');

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use("facebook-token",new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
