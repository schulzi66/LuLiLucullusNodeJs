var express = require('express');
var router = express.Router();

/* GET administration page. */
router.get('/', function(req, res) {
  //A user is not able to enter administration if he is not logged in and is not an admin
    if(req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        res.render('administration', { user: req.session.user} );
    } else {
        res.render('administration-login');
    }
});

module.exports = router;
