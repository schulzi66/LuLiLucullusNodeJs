var express = require('express');
var router = express.Router();
var conf = require('../../conf.json');

var DbController = require('../../controllers/DatabaseController');
var _dbController = new DbController();

var MailController = require('../../controllers/MailController');
var _mailController = new MailController();

var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();


/* GET new Employee page. */
router.get('/', function(req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
        _mailController.openInbox(function (cb) {
            // logger.log("callback", cb);
        });
        res.render('newEmployee', {user: req.session.user});
    } else {
        res.render('administration-login');
    }
});

router.post('/', function (req, res) {
  _dbController.getEmployeeByEmail(req, res, req.body.employeeID, sendMailToEmployee);
});

function sendMailToEmployee(req, res, employee) {
  if (employee === undefined) {
      //send email with authentication code to user
      var authenticationCode = _mailController.createAuthenticationcode();

      var mailOptions = {
          from: conf.mail.auth.user, // sender address
          to: req.body.employeeID, // list of receivers
          subject: 'Ihr Account bei Lulilucullus', // Subject line
          text: "Sehr geehrte/geehrter " + req.body.name + " " + req.body.familyName + ", " +
          "es wurde ein neuer Account für Sie erstellt. Ihr Code für die Aktivierung lautet: " + authenticationCode +
          " Für die Aktivierung besuchen Sie: localhost:3000/administration/changeEmployeePassword und geben Sie Ihr neues Passwort ein." // plaintext body
      };

      var message = "Dem Benutzer wurde eine Aktivierungs-Email gesendet.";
      var redirect = '/administration/newEmployee';
      _mailController.sendEmail(req, res, mailOptions, message, redirect, true);

      if (req.body.isAdmin === undefined) {
        req.body.isAdmin = false;
      }
      _dbController.insertNewEmployee(req, res);
      _dbController.insertEmployeesPasswordRequest(_mailController.createRequestDate(), authenticationCode, req.body.employeeID);
  }
  //employee has alread an account
  else {
      req.session.message = 'Scheinbar existiert bereits einen Account mit der Emailadresse ' + req.body.employeeID;
      res.redirect('/administration/newEmployee');
  }
}
module.exports = router;
