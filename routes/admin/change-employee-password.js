var express = require('express');
var router = express.Router();
var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('change-employee-password', {user: req.session.user});
});

/* Change Password Command */
router.post('/', function (req, res) {
    _dbController.getOpenEmployeesPasswordRequest(req, res, function (req, res, passwordRequest) {
      //passwordRequest exists
      if (passwordRequest !== undefined) {
        _dbController.closeEmployeesPasswordRequest(req, res, passwordRequest, function (res, employeeID, newPassword) {
          _dbController.changeEmployeePassword(res, employeeID, newPassword, function () {
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
