var express = require('express');
var router = express.Router();

/* GET upload page. */
router.get('/', function(req, res) {
    res.render('upload', { user: req.session.user} );
});

module.exports = router;
