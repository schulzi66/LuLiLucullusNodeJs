var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('reset-password', {user: req.session.user});
});


/* Reset Password Command */
router.post('/', function (req, res) {
console.log("--------------------------------yesheaydfaisodfnawdf");
    });
module.exports = router;
