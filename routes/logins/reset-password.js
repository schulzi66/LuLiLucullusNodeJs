var express = require('express');
var router = express.Router();
var conf = require('../../conf.json');
var nodemailer = require('nodemailer');

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();
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
    _dbController.getUserByEmail(req, res, req.body.email, sendMailToUser); //TODO: check req.body.email
});

function sendMailToUser(req, res, user) {
console.log("user:  " + user);
  if (user !== undefined) {
      //send email with authentication code to user
      var authenticationCode = createAuthenticationcode();

      var transporter = nodemailer.createTransport({
          service: conf.mail.service,
          auth: {
              user: conf.mail.auth.user, // Your email id
              pass: conf.mail.auth.password // Your password
          }
      });

      var mailOptions = {
          from: conf.mail.auth.user, // sender address
          to: req.body.email, //TODO CHEck mail // list of receivers
          subject: 'Passwort zurücksetzen Lulilucullus', // Subject line
          text: "Sehr geehrte/geehrter " + user.name + " " + user.familyName + ", " +
          "ihr Passwort wurde zurückgesetzt. Ihr Code für die Zurücksetzung lautet: " + authenticationCode +
          "Für das Zurücksetzten besuchen Sie: localhost:3000/login/change-password" // plaintext body
      };

      logger.log("mailOptions", mailOptions);

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              req.session.message = "Ihre Anfrage wurde erfolgreich &uuml;bermittelt. Überprüfen Sie Ihr Email Postfach";
              res.redirect('/login/change-Password');
          }
      });

      _dbController.insertPasswordRequest(createRequestDate(), authenticationCode, req.body.email);
  }
  //user has no account
  else {
    req.session.message = 'Scheinbar haben Sie keine Account bei uns.';
    res.redirect('/signup');
  }
}

function createRequestDate() {
  var date = new Date();
  console.log("DATE: " + date);
  return date;
}

function createAuthenticationcode()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = router;
