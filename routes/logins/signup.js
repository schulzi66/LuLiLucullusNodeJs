var express = require('express');
var router = express.Router();

var DbController = require('../../controllers/DatabaseController');

/* GET signup page. */
router.get('/', function (req, res, next) {
    res.render('signup', {user: req.session.user, message: req.session.message});
    req.session.message = undefined;
});

router.post('/', function (req, res) {
  var _dbController = new DbController();
    _dbController.getUserByEmail(req, res, req.body.email, function (existing_user) {
      if (existing_user === undefined) {
          _dbController.signup(req, res, true);
      } else {
          req.session.message = 'Scheinbar haben Sie bereits einen Account mit der Emailadresse ' + req.body.email + ' bei uns.';
          res.redirect('/login');
      }
    });
});

module.exports = router;
