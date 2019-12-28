const mongoose = require('mongoose');
const schema = mongoose.Schema

const newsSchema = schema({
    user: {
        type: Schema.types.ObjectId,
        ref: "userData"
    },
    userNews: [
        {
            urlToImage: {
                type: String,
                required
            },
            url: {
                type: String,
                required
            },
            author: {
                type: String,
            },
            title: {
                type: String,
                required
            },
            description: {
                type: String,
                required
            }
        }
    ]
})

const news = mongoose.model('userNews', newsSchema)

module.exports = news