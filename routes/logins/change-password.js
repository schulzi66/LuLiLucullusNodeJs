var express = require('express');
var router = express.Router();
var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('change-password', {user: req.session.user});
});

/* Change Password Command */
router.post('/', function (req, res) {
  console.log("req.body.userid: "+  req.body.userID);
  console.log("req.body.authenticationCode: "+  req.body.authenticationCode);
    _dbController.getPasswordRequest(req.body.userID, req.body.authenticationCode, function (passwordRequest) {
      //passwordRequest exists
      if (passwordRequest !== undefined) {
        _dbController.closePasswordRequest(passwordRequest, function (userId, oldPassword, newPassword) {
          _dbController.changePassword(userId, oldPassword, newPassword);
        });
      }
    })
});
module.exports = router;
