// config/passport.js

// load all the things we need
var express = require('express');
var router = express.Router();
var passport = require('passport');
var conf = require('../../conf.json');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: conf.database.host,
    user: conf.database.user,
    password: conf.database.password,
    connectionLimit: conf.database.connectionLimit,
    database: conf.database.dbo,
    charset: conf.database.charset
});

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup', {user: req.session.user});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.get('/', function (req, res) {
    res.render('signup');
});

module.exports = router;