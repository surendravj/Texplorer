const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const port = process.env.port || 5000;
const app = express();

require('./Auth/Authiencation')(passport)

app.use(express.static(__dirname + '/publeic'));

const homepage = require('./controllers/routes/homepage'),
    signup = require('./controllers/routes/signup.js'),
    signin = require('./controllers/routes/signin'),
    user = require('./controllers/routes/private/user_home'),
    userNews = require('./controllers/routes/private/userNews'),

app.use(session({
    resave: true,
    secret: 'mysecreat',
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyparser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(homepage);
app.use(signup);
app.use(signin);
app.use(user);
app.use(userNews);

app.get('*', (req, res) => {
    res.send("<h1>404 Not Found")
})

app.listen(port, () => {
    console.log(`Server is conncted at port ${port}`);
});


