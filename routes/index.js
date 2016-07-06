/**
 * @author
 * Marius Schulze
 */

var express = require('express');
var router = express.Router();
var dbController = require('./../controllers/DatabaseController');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {user: req.session.user});
});

module.exports = router;
