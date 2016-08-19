var express = require('express');
var router = express.Router();

/* GET orders page. */
router.get('/', function (req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        res.render('orders', {user: req.session.user});
    } else {
        res.render('administration-login');
    }
});

module.exports = router;
