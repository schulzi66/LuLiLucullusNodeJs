/**
 * @author
 * Marius Schulze
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var entries = [
    { name: 'Home'},
    { name: 'Contact'}
  ];
  res.render('index', {
    entries : entries
  });
});

module.exports = router;
