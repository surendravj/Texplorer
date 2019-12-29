const mongoose = require('mongoose');
const schema = mongoose.Schema

const newsSchema = schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "userData"
    },
    userNews: [
        {
            urlToImage: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            author: {
                type: String,
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
})

const news = mongoose.model('userNews', newsSchema)

module.exports = news