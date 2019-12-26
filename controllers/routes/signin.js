const express = require('express')
const passport = require('passport')
const router = express.Router()


// @type=get 
// @desc=Route to get the user into signin page
// @auth=public
// @route=/login
router.get('/login', (req, res) => {
    rendeRData = {
        error: req.flash('error'),
        success: req.flash('success')
    }
    res.render('signin', rendeRData);
})


// @type=post 
// @desc=Router to make the user to login
// @auth=public
// @route=/login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})

module.exports = router