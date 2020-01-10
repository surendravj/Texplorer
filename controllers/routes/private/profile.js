const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { ensureAuthenticated } = require('../../../Auth/is_Authenticated')
const user = require('../../../models/userModel')

// @type=get 
// @desc=Route to get the user to the profile page
// @auth=private
// @route=/user/save
router.get('/user/:id/profile', ensureAuthenticated, (req, res) => {
    renderData = {
        name: (req.user.fname + " " + req.user.lname),
        userId: req.user._id,
        email: req.user.email,
        fname: req.user.fname,
        lname: req.user.lname,
    }
    res.render('profile', renderData)
})


// function that is used to check the hashed password
isPasswordMatch = (password, hashedPassword) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        return isMatch
    })
}

// @type=put 
// @desc=Route to to update the user details
// @auth=private
// @route=/user/save


module.exports = router