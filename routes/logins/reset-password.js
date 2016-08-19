var express = require('express');
var router = express.Router();
var conf = require('../../conf.json');
var nodemailer = require('nodemailer');

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('reset-password', {user: req.session.user});
});


/* Reset Password Command */
router.post('/', function (req, res) {
    //Get user object from database
    _dbController.getUserByEmail(req, res, req.body.email, sendMailToUser); //TODO: check req.body.email
});

function sendMailToUser(req, res, user) {
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
      to: user.userId, //TODO CHEck mail // list of receivers
      subject: 'Passwort zurücksetzen Lulilucullus', // Subject line
      text: "Sehr geehrte/geehrter " + user.name + " " + user.familyName + "," +
      "ihr Passwort wurde zurückgesetzt. Ihr Code für die Zurücksetzung lautet: " + authenticationCode +
      "Für das Zurücksetzten besuchen Sie: localhost:3000/login/change-password" // plaintext body
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          req.session.message = "Ihre Anfrage wurde erfolgreich &uuml;bermittelt. Überprüfen Sie Ihr Email Postfach";
          res.redirect('/login/changePasswort');
      }
  });

  _dbController.insertPasswordRequest(createRequestDate(), authenticationCode, user.USERID);

}

function createRequestDate() {
  var date = new Date();
  date = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
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
