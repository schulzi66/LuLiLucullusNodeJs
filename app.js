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
var login = require('./routes/logins/login');
var recipes = require('./routes/recipes');
var impressum = require('./routes/impressum');
var facebook = require('./routes/logins/facebook');
var google = require('./routes/logins/google');
var twitter = require('./routes/logins/twitter');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: conf.session.secret
}));

app.use(express.static(path.join(__dirname, 'public')));

// security
app.use(helmet());

// use routes
app.use('/', index);
app.use('/contact', contact);
app.use('/services', services);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/impressum', impressum);
app.use('/login/facebook', facebook);
app.use('/login/google', google);
app.use('/login/twitter', twitter);

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
module.exports = app;
