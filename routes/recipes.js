var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/', function(req, res) {
  if(req.session.user !== undefined) {
    res.render('recipes', { user: req.session.user} );
  } else {
    res.render('login' );
  }
});

module.exports = router;
