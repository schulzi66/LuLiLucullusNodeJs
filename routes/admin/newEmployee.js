var express = require('express');
var router = express.Router();

var DbController = require('../../controllers/DatabaseController');
var _dbController = new DbController();

/* GET new Employee page. */
router.get('/', function(req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        res.render('newEmployee', {user: req.session.user});
    } else {
        res.render('administration-login');
    }
});

router.post('/', function (req, res) {

  console.log("newEmployee post command");
});



module.exports = router;
