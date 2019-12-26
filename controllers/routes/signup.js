const express = require('express');
const router = express.Router();
const user = require('../../models/userModel')
const bcrypt = require('bcryptjs')


// @type=get 
// @desc=Route to get the user to the signup page
// @auth=public
// @route=/signup
router.get('/signup', (req, res) => {
    data = {
        error: req.flash('error')
    }
    res.render('signup', data);
})


// @type=post
// @desc=Route to get the user info for signup 
// @auth=public
// @route=/signup
router.post('/signup', (req, res) => {
    var model = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    }
    if (model.password.length < 8) {
        req.flash('error', 'Password length should be 8 charcters long');
        res.redirect('/signup')
        return
    }
    user.findOne({ email: model.email })
        .then(data => {
            if (data) {
                req.flash('error', 'User Email Already Exists!');
                res.redirect('/signup')
                return;
            } bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(model.password, salt, function (err, hash) {
                    model.password = hash;
                    var newUser = new user(model);
                    newUser.save()
                        .then(() => {
                            req.flash('success', 'Please login here to proceed')
                            res.redirect('/login');
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                });
            });
        })
        .catch(err => { console.log(err) })
})
module.exports = router;