var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET Administration page. */
router.get('/', function(req, res) {
    res.render('administration-login', { user: req.session.user , message: req.session.message} ); //reg.session.user is also used as administration user
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
});

/* Post local login Command */
router.post('/', passport.authenticate('local-login', {failureRedirect: '/administration-login'}),
    function (req, res) {
        _dbController.getAdminByEmail(req, res, req.user, loginAdmin);
    });

//Callback function after the login result returns from the database
function loginAdmin(req, res, user) {
  if (user === undefined) {
    req.session.message = 'Sie besitzen nicht die nötigen Berechtigungen';
    res.redirect('/administration-login');
  }
  else if (bcrypt.compareSync(req.body.password, user.password)) {
    req.session.user = user;
    req.session.user.displayName = user.name + " " + user.familyName;
    _dbController.setAdminOnlineStatus(user, true);
    res.redirect('/administration');
  } else {
    req.session.message = 'Falsches Passwort';
    res.redirect('/administration-login');
  }
}

module.exports = router;
