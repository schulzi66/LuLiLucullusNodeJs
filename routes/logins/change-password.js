var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('change-password', {user: req.session.user});
});

/* Change Password Command */
router.post('/', function (req, res) {
    console.log("########### CHANGE PASSWORD");
});
module.exports = router;
