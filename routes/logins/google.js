//https://scotch.io/tutorials/easy-node-authentication-google
var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
var DatabaseController = require('../../controllers/DatabaseController');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: conf.google.clientID,
    clientSecret: conf.google.clientSecret,
    callbackURL: conf.google.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  })
);

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

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/return',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //save user across the routes
    req.session.user = req.user;
    console.log("Google Json Return");
    console.log(req.session.user);
    var _dbController = new DatabaseController();
    _dbController.signupExternalUser(req, res, "placeholderPW", false);
    res.redirect('/');

  });

module.exports = router;
