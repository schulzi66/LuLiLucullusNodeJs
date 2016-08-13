var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/', function(req, res) {
    if(req.session.user) {
    res.render('recipes', { user: req.session.user} );
    } else {
        res.render('login', { user: req.session.user} );
    }
});

module.exports = router;
