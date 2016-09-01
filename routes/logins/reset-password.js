var express = require('express');
var router = express.Router();
var conf = require('../../conf.json');

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

var MailController = require('../../controllers/MailController');
var _mailController = new MailController();

var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();

/* GET Reset Password page. */
router.get('/', function (req, res) {
    res.render('reset-password', {user: req.session.user});
});


/* Reset Password Command */
router.post('/', function (req, res) {
    //Get user object from database
    console.log("req.body.email: " +  req.body.email);
    _dbController.getUserByEmail(req, res, req.body.email, sendMailToUser);
});

function sendMailToUser(req, res, user) {
console.log("user:  " + user);
  if (user !== undefined) {

    var authenticationCode = _mailController.createAuthenticationcode()

      var mailOptions = {
          from: conf.mail.auth.user, // sender address
          to: req.body.email, //TODO CHEck mail // list of receivers
          subject: 'Passwort zurücksetzen Lulilucullus', // Subject line
          text: "Sehr geehrte/geehrter " + user.name + " " + user.familyName + ", " +
          "ihr Passwort wurde zurückgesetzt. Ihr Code für die Zurücksetzung lautet: " + authenticationCode +
          " Für das Zurücksetzten besuchen Sie: localhost:3000/login/change-password" // plaintext body
      };

      var message = "Ihre Anfrage wurde erfolgreich übermittelt. Überprüfen Sie Ihr Email Postfach";
      var redirect = '/login/change-Password';

      _mailController.sendEmail(req, res, mailOptions, message, redirect);

      _dbController.insertPasswordRequest(_mailController.createRequestDate(), authenticationCode, req.body.email);
  }
  //user has no account
  else {
    req.session.message = 'Scheinbar haben Sie keine Account bei uns.';
    res.redirect('/signup');
  }
}

module.exports = router;
