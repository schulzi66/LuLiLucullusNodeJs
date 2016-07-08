var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conf = require('./conf.json');
var helmet = require('helmet');

// setup routes
var index = require('./routes/index');
var contact = require('./routes/contact');
var services = require('./routes/services');
var recipes = require('./routes/recipes');
var impressum = require('./routes/impressum');
var rentaCook = require('./routes/rentaCook');
var catering = require('./routes/catering');
var signup = require('./routes/logins/signup');
var login = require('./routes/logins/login');
var logout = require('./routes/logins/logout');
var facebook = require('./routes/logins/facebook');
var google = require('./routes/logins/google');
var twitter = require('./routes/logins/twitter');
var xing = require('./routes/logins/xing');
var profile = require('./routes/profile');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: conf.session.secret,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// security
app.use(helmet());

// use routes
app.use('/', index);
app.use('/contact', contact);
app.use('/services', services);
app.use('/recipes', recipes);
app.use('/impressum', impressum);
app.use('/rent-a-cook', rentaCook);
app.use('/catering', catering);
app.use('/login/profile', profile);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/login/facebook', facebook);
app.use('/login/google', google);
app.use('/login/twitter', twitter);
app.use('/login/xing', xing);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

module.exports = app;
