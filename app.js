process.env.NODE_ENV = 'development';
require('events').EventEmitter.prototype._maxListeners = 50;

var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conf = require('./conf.json');
var helmet = require('helmet');

/**
 * Setup routes
 */
var index = require('./routes/index');
var contact = require('./routes/contact');
var services = require('./routes/services');
var recipes = require('./routes/recipes');
var recipe = require('./routes/recipe');
var my_recipes = require('./routes/my-recipes');
var impressum = require('./routes/impressum');
var kochboxen = require('./routes/kochboxen');
var koch_mieten = require('./routes/koch-mieten');
var catering = require('./routes/catering');
var faq = require('./routes/faq');
var about = require('./routes/about');
var events = require('./routes/events');
var kochkurse = require('./routes/kochkurse');
var gutscheine = require('./routes/gutscheine');
var signup = require('./routes/logins/signup');
var login = require('./routes/logins/login');
var logout = require('./routes/logins/logout');
var facebook = require('./routes/logins/facebook');
var google = require('./routes/logins/google');
var twitter = require('./routes/logins/twitter');
var xing = require('./routes/logins/xing');
var profile = require('./routes/profile');
var profile_external = require('./routes/profile-external');

var reset_password = require('./routes/logins/reset-password');
var change_password = require('./routes/logins/change-password');

/**
 * Administration routes
 */
var administration_login = require('./routes/logins/administration-login');
var administration = require('./routes/admin/administration');
var recipe_upload = require('./routes/admin/upload');
var orders = require('./routes/admin/orders');
var newEmployee = require('./routes/admin/newEmployee');
var changeEmployeePassword = require('./routes/admin/change-employee-password');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
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
app.use('/recipes/recipe', recipe);
app.use('my-recipes', my_recipes);
app.use('/impressum', impressum);
app.use('/kochboxen', kochboxen);
app.use('/koch-mieten', koch_mieten);
app.use('/kochboxen', kochboxen);
app.use('/catering', catering);
app.use('/faq', faq);
app.use('/about', about);
app.use('/events', events);
app.use('/kochkurse', kochkurse);
app.use('/gutscheine', gutscheine);
app.use('/login/profile', profile);
app.use('/login/profile-external', profile_external);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/login/facebook', facebook);
app.use('/login/google', google);
app.use('/login/twitter', twitter);
app.use('/login/xing', xing);
app.use('/login/reset-password', reset_password);
app.use('/login/change-password', change_password);

app.use('/administration', administration);
app.use('/administration-login', administration_login);
app.use('/administration/upload', recipe_upload);
app.use('/administration/orders', orders);
app.use('/administration/newEmployee', newEmployee);
app.use('/administration/changeEmployeePassword', changeEmployeePassword);

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
