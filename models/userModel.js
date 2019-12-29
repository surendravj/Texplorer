const mongoose = require('mongoose');
const mongoUrl = require('../util/API').mongoUrl


mongoose.connect(mongoUrl, { useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:true})
            .then(console.log('Mongodb is connected'))
            .catch(err=>{console.log(err)});

const schema = mongoose.Schema;

const newSchema =schema({
    fname: {
        type: String,
        require: true
    }, lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
    }
})

const newmodel = mongoose.model('userData', newSchema);

module.exports = newmodel;