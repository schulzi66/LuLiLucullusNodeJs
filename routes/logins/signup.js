var express = require('express');
var router = express.Router();

var DbController = require('../../controllers/DatabaseController');

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup', {user: req.session.user, message: req.session.message});
    req.session.message = undefined;
});

var existing_user;
router.post('/', function (req, res) {
  var _dbController = new DbController();
    console.log(Object.keys(req.body));
    _dbController.getUserByEmail(req, res, req, function (data) {
        //existing_user = data;
        console.log("ExistingUser: " + data);
    });
    if (!existing_user) {
        _dbController.signup(req, res, true);
    } else {
        req.session.message = 'Scheinbar haben Sie bereits einen Account mit der Emailadresse' + existing_user + 'bei uns.';
        res.redirect('/login');
    }
});

module.exports = router;
