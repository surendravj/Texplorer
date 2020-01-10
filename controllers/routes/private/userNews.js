const express = require('express')
const router = express.Router()
const news = require('../../../models/userNews')
const { ensureAuthenticated } = require('../../../Auth/is_Authenticated')

// @type=get 
// @desc=Route to get the user to the news Group
// @auth=private
// @route=/user/save
router.get('/user/save', ensureAuthenticated, (req, res) => {
    news.findOne({ user: req.user._id })
        .then(profile => {
            if (profile) {
                if (profile.userNews.length == 0) {
                    renderedData = {
                        isNewsThere: true,
                        name: (req.user.fname + " " + req.user.lname),
                        userId: req.user._id
                    }
                    return res.render('userNews', renderedData)
                }
                else {
                    renderedData = {
                        isNewsThere: false,
                        name: (req.user.fname + " " + req.user.lname),
                        newsData: profile,
                        userId: req.user._id
                    }
                    return res.render('userNews', renderedData)
                }
            }
            else {
                renderedData = {
                    isNewsThere: true,
                    name: (req.user.fname + " " + req.user.lname),
                    userId: req.user._id
                }
                return res.render('userNews', renderedData)
            }
        })
        .catch(() => { console.log(err) })
})

// @type=post 
// @desc=Route to save the news for the user 
// @auth=private
// @route=/user/save
router.post('/user/save', (req, res) => {
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
                newNews.save()
            }
            else {
                news.findOneAndUpdate({ user: req.user._id },
                    { $push: { userNews: data.userNews[0] } })
                    .then(() => { return res.redirect('/user/save') })
                    .catch(err => { console.log(err) })
            }
        })
        .catch(err => { console.log('Error in fetching') })
})

// @type=delete
// @desc=Route to delete the news of the news 
// @auth=private
// @route=/user/save
router.post('/user/news/:id', (req, res) => {
    news.updateOne({
        user: req.user._id
    }, { $pull: { 'userNews': { '_id': req.params.id } } })
        .then(() => { return res.redirect('/user/save') })
})

module.exports = router