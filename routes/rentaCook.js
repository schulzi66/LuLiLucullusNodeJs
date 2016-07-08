var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/', function(req, res) {
    res.render('rentaCook', { user: req.session.user} );
});

module.exports = router;
