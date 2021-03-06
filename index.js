const express = require('express');
const path = require('path')
const bodyparser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const port = process.env.port || 5000;
const app = express();

require('./Auth/Authiencation')(passport)

app.use(express.static(__dirname + '/public'));

const homepage = require('./controllers/routes/homepage'),
    signup = require('./controllers/routes/signup.js'),
    signin = require('./controllers/routes/signin'),
    user = require('./controllers/routes/private/user_home'),
    userNews = require('./controllers/routes/private/userNews'),
    profile = require('./controllers/routes/private/profile');

app.use(session({
    resave: true,
    secret: 'mysecreat',
    saveUninitialized: true
}))

app.use('/static', express.static(path.join(__dirname, '/public')))

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
app.use(profile)

app.get('*', (req, res) => {
    res.send("<h1>404 Not Found")
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

