var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var XingStrategy = require('passport-xing').Strategy;
var DatabaseController = require('../../controllers/DatabaseController');

passport.use(new XingStrategy({
        consumerKey: conf.xing.clientID,
        consumerSecret: conf.xing.clientSecret,
        callbackURL: conf.xing.callbackURL,
        profileFields: ['id', 'first_name', 'last_name', 'active_email']
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

router.get('/', passport.authenticate('xing'));

router.get('/return',
    passport.authenticate('xing', {failureRedirect: '/login'}),
    function (req, res) {
        //save user across the routes
        req.session.user = req.user;
        var _dbController = new DatabaseController();
        _dbController.signupExternalUser(req, res, "placeholderPW", false);
        res.redirect('/');
    });

module.exports = router;
