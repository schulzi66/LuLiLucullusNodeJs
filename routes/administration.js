var express = require('express');
var router = express.Router();

/* GET administration page. */
router.get('/', function(req, res) {
    res.render('administration', { user: req.session.user} );
});

module.exports = router;
