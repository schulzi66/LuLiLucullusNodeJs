// config/passport.js

// load all the things we need
var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res) {
    res.render('signup');
});

module.exports = router;