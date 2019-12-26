const mongoose = require('mongoose');
const schema = mongoose.Schema

const newsSchema = schema({
    user: {
        type: Object
    },
    userNews: [
        {
           urlToImage:{
               type:String,
               required
           }          
        }
    ]
})

const news = mongoose.model('usernews', newsSchema)

module.exports = news