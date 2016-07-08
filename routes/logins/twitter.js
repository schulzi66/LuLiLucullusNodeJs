//https://scotch.io/tutorials/easy-node-authentication-twitter
var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var DatabaseController = require('../../controllers/DatabaseController');

passport.use(new TwitterStrategy({
        consumerKey: conf.twitter.clientID,
        consumerSecret: conf.twitter.clientSecret,
        callbackURL: conf.twitter.callbackURL
    },
    function (token, tokenSecret, profile, cb) {
        return cb(null, profile);
    }
));

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

router.get('/', passport.authenticate('twitter'));

router.get('/return',
    passport.authenticate('twitter', {failureRedirect: '/login'}),
    function (req, res) {
        //save user across the routes
        req.session.user = req.user;
        var _dbController = new DatabaseController();
        _dbController.signupExternalUser(req, res, "placeholderPW", false, "twitter");
        res.redirect('/');
    });

module.exports = router;
