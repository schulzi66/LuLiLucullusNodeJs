/**
 * @author
 * Marius Schulze
 */
var conf = require('../conf.json');
var express = require('express');
var router = express.Router();

// Facebook Login
//https://github.com/passport/express-4.x-facebook-example/blob/master/server.js
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: conf.login.clientID,
    clientSecret: conf.login.clientSecret,
    callbackURL: conf.login.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
router.use(require('morgan')('combined'));
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    //save user accoun across the routes
    req.session.user = req.user;
    res.redirect('/');
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.session.user });
});

module.exports = router;
