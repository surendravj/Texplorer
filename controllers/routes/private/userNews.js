const express = require('express')
const router = express.Router()
const news = require('../../../models/userNews')
const { ensureAuthenticated } = require('../../../Auth/is_Authenticated')



// @type=get 
// @desc=Route to get the user to the news Group
// @auth=private
// @route=/user/save
router.get('/user/save', ensureAuthenticated, (req, res) => {
    var firstSave = true
    news.findOne({ user: req.user._id })
        .then(userNews => {
            if (userNews.userNews) {
               firstSave = false
                var renderdData = {
                    name: (req.user.fname + " " + req.user.lname),
                    newsData: userNews,
                    isNewsThere: firstSave
                }
                console.log(firstSave)
                res.render('userNews', renderdData)
            } else {
                req.flash('Error', 'Nothing to show')
                var renderdData = {
                    name: (req.user.fname + " " + req.user.lname),
                    error: req.flash('Error'),
                    isNewsThere:firstSave
                }
                console.log(firstSave)
                res.render('userNews', renderdData)
            }
        }).catch(err => { console.log(err) })
})

// @type=post 
// @desc=Route to save the news for the user 
// @auth=private
// @route=/user/save
router.post('/user/save', ensureAuthenticated, (req, res) => {
    var data = {
        user: req.user._id,
        userNews: [{
            urlToImage: req.body.urlToImage,
            url: req.body.url,
            author: req.body.author,
            title: req.body.title,
            description: req.body.description
        }]
    }
    news.findOne({ user: req.user._id })
        .then(userNews => {
            if (!userNews) {
                var newNews = new news(data)
                newNews.save().then(() => console.log('Saved successfully'))
            }
            else {
                news.findOneAndUpdate({ user: req.user._id },
                    { $push: { userNews: data.userNews[0] } })
            }
            res.redirect('/user/save')
        })
        .catch(err => { console.log('Error in fetching') })
})

// @type=delete
// @desc=Route to delete the news of the news 
// @auth=private
// @route=/user/save
router.post('/user/news/:id', ensureAuthenticated, (req, res) => {
    news.updateOne({
        user: req.user._id
    }, { $pull: { 'userNews': { '_id': req.params.id } } })
        .then(() => { res.redirect('/user/save') })
})

module.exports = router