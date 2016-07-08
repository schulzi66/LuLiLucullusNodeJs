var express = require('express');
var router = express.Router();

var DbController = require('../../controllers/DatabaseController');

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup', {user: req.session.user, message: req.session.message});
    req.session.message = undefined;
    console.log("req.session.message: " + req.session.message);
});

router.post('/', function (req, res) {
    var _dbController = new DbController();
    _dbController.signup(req, res, true);
});

module.exports = router;
