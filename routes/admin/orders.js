var express = require('express');
var router = express.Router();

/* GET orders page. */
router.get('/', function(req, res) {
    res.render('orders', { user: req.session.user} );
});

module.exports = router;
