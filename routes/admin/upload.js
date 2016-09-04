var express = require('express');
var router = express.Router();
var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

/* GET upload page. */
router.get('/', function (req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        res.render('upload', {user: req.session.user});
    } else {
        res.render('administration-login');
    }
});

router.post('/', function (req, res) {
    console.log(req.body);
    _dbController.uploadRecipe(req.body, function () {
        console.log("I DID IT");
    });
});

module.exports = router;
