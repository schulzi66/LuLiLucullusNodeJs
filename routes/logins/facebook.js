//https://scotch.io/tutorials/easy-node-authentication-facebook
var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
var DatabaseController = require('../../controllers/DatabaseController');
// var UserModelController = require('../../controllers/UserModelController');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: conf.facebook.clientID,
        clientSecret: conf.facebook.clientSecret,
        callbackURL: conf.facebook.callbackURL,
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
router.use(require('morgan')('combined'));
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({extended: true}));
router.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

router.get('/', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/return',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        req.user.displayName = req.user.name.givenName + " " + req.user.name.familyName;
        //save user across the routes
        req.session.user = req.user;
        var _dbController = new DatabaseController();
        _dbController.signupExternalUser(req, res, "placeholderPW", false);
        res.redirect('/');
    });

module.exports = router;
