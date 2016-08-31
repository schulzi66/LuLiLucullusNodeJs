var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/', function(req, res) {
    res.render('gutscheine', { user: req.session.user} );
});

module.exports = router;
