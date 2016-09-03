var express = require('express');
var router = express.Router();

/* GET upload page. */
router.get('/', function(req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        res.render('upload', {user: req.session.user});
    } else {
        res.render('administration-login');
    }
});

router.post('/', function (req, res) {

});


module.exports = router;
