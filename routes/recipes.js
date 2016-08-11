var express = require('express');
var router = express.Router();

/* GET recipes page. */
router.get('/', function(req, res) {
  
    res.render('recipes', { user: req.session.user} );
});

module.exports = router;
