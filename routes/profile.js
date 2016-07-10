var express = require('express');
var router = express.Router();

var DbController = require('../controllers/DatabaseController');

/* GET signup page. */
router.get('/', function (req, res, next) {
    var _dbController = new DbController();
    _dbController.getUserByEmail(req, res, req.session.user.email ,renderProfile)
});

/* Post changes from userdata */
router.post('/', function(req, res){
    var _dbController = new DbController();
    _dbController.updateUser(req, res);
});

function renderProfile(req, res, userModel) {
  if (userModel === undefined) {
      req.session.message = 'Scheinbar haben Sie keine Account bei uns.';
      res.redirect('/signup');
  }
  else {
      res.render('profile', {user: userModel});
  }
}

module.exports = router;
