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
    _dbController.getOpenPasswordRequest(req, res, function (req, res, passwordRequest) {
      //passwordRequest exists
      if (passwordRequest !== undefined) {
        _dbController.closePasswordRequest(req, res, passwordRequest, function (res, userId, newPassword) {
          _dbController.changePassword(res, userId, newPassword, function () {
            req.session.message = undefined;
            res.redirect("/login");
          });
        });
      }
      //no password request with requestcode exists
      else {
        // req.session.message = ;
        res.render('change-password', {message: 'Es liegt kein aktueller Antrag auf eine Änderung des Passworts mit den eingegebenen Daten vor.'});
        // req.session.message = undefined;
      }
    })
});
module.exports = router;
