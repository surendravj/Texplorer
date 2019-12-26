const express = require('express')
const request = require('request')
const router = express.Router()
const { ensureAuthenticated } = require('../../../Auth/is_Authenticated');
const news = require('../../../util/API').newsAPi


// @type=get 
// @desc=Route to get into user-home 
// @auth=private
// @route=/user
router.get('/user', ensureAuthenticated, (req, res) => {
    request(news, (error, response, body) => {
        var data = JSON.parse(body)
        renderData = {
            name: (req.user.fname + " " + req.user.lname),
            newsData: data
        }
        res.render('user_home', renderData);
    })
})

// @type=get 
// @desc=Route to logout from user-home
// @auth=private
// @route=/user/logout
router.get('/user/logout', (req, res) => {
    req.logOut()
    req.flash('success', 'Bye have a nice day :)')
    res.redirect('/login')
})

// @type=get 
// @desc=Route to get the categorical the news for tthe user 
// @auth=private
// @route=/user/categeroy/userOption {selectable}
router.get('/user/categeroy/:userOption', ensureAuthenticated, (req, res) => {
    var categeory = req.params
    var url = 'https://newsapi.org/v2/top-headlines?country=in&pageSize=100&category=' + categeory.userOption + '&apiKey=7d9961d53894489fa386c4a9e3576a89'
    request(url, (error, response, body) => {
        var data = JSON.parse(body)
        renderData = {
            name: (req.user.fname + " " + req.user.lname),
            newsData: data
        }
        res.render('user_home', renderData);
    })
})

module.exports = router