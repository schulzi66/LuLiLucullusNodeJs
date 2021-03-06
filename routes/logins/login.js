var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET login page. */
router.get('/', function (req, res) {
    res.render('login', {
        message: req.session.message,
        req: req,
        res: res
    });
    req.session.message = undefined;
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

/*Local login */
passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, cb) {
        return cb(null, email);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user, cb) {
    cb(null, user);
    // User.findById(id, function(err, user) {
    // });
});

/* Post local login Command */
router.post('/', passport.authenticate('local-login', {failureRedirect: '/login'}),
    function (req, res) {
        _dbController.getUserByEmail(req, res, req.user, loginUser);
    });

/* GET Profil page */
router.get('/profile', isLoggedIn,
    function (req, res) {
        res.render('profile', {user: req.session.user});
    });

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//Callback function after the login result returns from the database
function loginUser(req, res, user) {
    //user has no account or wrong email is provided
    if (user === undefined) {
        req.session.message = 'Scheinbar haben Sie keine Account bei uns.';
        res.redirect('/signup');
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
        //user has entered correct password
        req.session.user = user;
        req.session.user.displayName = user.name + " " + user.familyName;
        res.redirect('/');
        // console.log(req.session.redirectTo);
        // res.redirect(req.session.redirectTo || '/');
    }
    else {
        req.session.message = 'Falsches Passwort';
        res.redirect('/login');
    }
}

module.exports = router;
