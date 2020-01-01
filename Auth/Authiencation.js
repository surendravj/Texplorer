const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcryptjs');

const user = require('../models/userModel');


// passport strategy for user authentication
module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
        }, (email, password, done) => {
            user.findOne({ email: email })
                .then(data => {
                    if (!data) {
                        return done(null, false, { message: 'Email not exist' })
                    } else {
                        bcrypt.compare(password, data.password, (err, isMatch) => {
                            if (err) { console.log(err) };
                            if (isMatch) {
                                return done(null, data)
                            }
                            else {
                                return done(null, false, { message: 'Invalid Email or Password' })
                            }
                        });
                    }

                })
                .catch(err => console.log(err))
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
}