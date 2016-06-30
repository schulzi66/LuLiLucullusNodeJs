/**
 * @author
 * Marius Schulze
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Facebook Login
//https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
// var passport = require('passport');
// var Strategy = require('passport-facebook').Strategy;
//
// passport.use(new Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/login/facebook/return'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     return cb(null, profile);
// }));
//
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// setup routes
var index = require('./routes/index');
var contact = require('./routes/contact');
var services = require('./routes/services');
var login = require('./routes/login');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Use application-level middleware for common functionality, including
// // logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
//
// // Initialize Passport and restore authentication state, if any, from the
// // session.
// app.use(passport.initialize());
// app.use(passport.session());


// use routes
app.use('/', index);
app.use('/contact', contact);
app.use('/services', services);
app.use('/login', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**
 *


passport.use(new LocalStrategy(function(username, password,done){
    Users.findOne({ username : username},function(err,user){
        if(err) { return done(err); }
        if(!user){
            return done(null, false, { message: 'Incorrect username.' });
        }

        hash( password, user.salt, function (err, hash) {
            if (err) { return done(err); }
            if (hash == user.hash) return done(null, user);
            done(null, false, { message: 'Incorrect password.' });
        });
    });
}));

passport.use(new FacebookStrategy({
        clientID: "YOUR ID",
        clientSecret: "YOUR CODE",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        FbUsers.findOne({fbId : profile.id}, function(err, oldUser){
            if(oldUser){
                done(null,oldUser);
            }else{
                var newUser = new FbUsers({
                    fbId : profile.id ,
                    email : profile.emails[0].value,
                    name : profile.displayName
                }).save(function(err,newUser){
                    if(err) throw err;
                    done(null, newUser);
                });
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    FbUsers.findById(id,function(err,user){
        if(err) done(err);
        if(user){
            done(null,user);
        }else{
            Users.findById(id, function(err,user){
                if(err) done(err);
                done(null,user);
            });
        }
    });
});
 */
module.exports = app;
