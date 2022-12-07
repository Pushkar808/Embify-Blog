const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const User = require('../models/userSchema');

//auth using passport
passport.use(new LocalStratergy({
    usernameField: 'email',
    passReqToCallback: true//so that we can use request in the below func
},
    function (req,email, password, done) {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                // console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

//serilize user
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//deserilize user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    })
})


passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in
    return res.redirect('back');
}


passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.userinfo = req.user;
        res.locals.login = true;
        res.locals.is_admin = req.user.is_admin;//setting is admin locals
        return next()
    }
    else
        res.locals.login = false;

    next();
}



module.exports = passport;