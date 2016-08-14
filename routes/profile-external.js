var express = require('express');
var router = express.Router();

var DbController = require('../controllers/DatabaseController');

/* GET signup page. */
router.get('/', function (req, res, next) {
    var _dbController = new DbController();
    _dbController.getUserByEmail(req, res, req.session.user.emails[0].value, renderProfile)
});

router.post('/', function(req, res){
    var _dbController = new DbController();
    _dbController.updateUser(req, res);
});


function renderProfile(req, res, userModel) {
  if (userModel === undefined) {
    //User has not local account
    res.render('profile-external', {user: req.session.user});
  }
  else {
    //User has local account
    res.render('profile', {user: userModel});
  }
}

module.exports = router;
