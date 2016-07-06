var express = require('express');
var router = express.Router();

var DbController = require('../../controllers/DatabaseController');

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup', {user: req.session.user});
});

router.post('/', function(req, res){
    var _dbController = new DbController();
    _dbController.signup(req, res, req.body.name, req.body.email, req.body.vorname, req.body.password, req.body.street, req.body.plz, req.body.ort);
});

module.exports = router;