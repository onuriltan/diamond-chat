const passport = require('passport');

exports.loginWithFacebook = passport.authenticate('facebook-token'), async function (req, res, next) {
    if (req.user) {
        console.log(req.user)
    } else {
        res.status(401);
    }
};
