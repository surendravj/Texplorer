const express = require('express'),
    router = express.Router(),
    request = require('request'),
    newsUrl = require('../../util/API').newsAPi;

// @type=get 
// @desc=Route to get into landing page
// @auth=public
// @route=/
router.get('/', (req, res) => {
    request(newsUrl, (error, response, body) => {
        let data = JSON.parse(body);
        let renderData = {
            dataclip: data
        };
        res.render('index', renderData);
    })
});


module.exports = router;

