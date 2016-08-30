var express = require('express');
var router = express.Router();
var conf = require('../../conf.json');
var nodemailer = require('nodemailer');

var DbController = require('../../controllers/DatabaseController');
var _dbController = new DbController();
var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();


/* GET new Employee page. */
router.get('/', function(req, res) {
    if (req.session.user !== undefined && req.session.user.isAdmin !== undefined) {
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
          to: req.body.employeeID, //TODO CHEck mail // list of receivers
          subject: 'Ihr Account bei Lulilucullus', // Subject line
          text: "Sehr geehrte/geehrter " + req.body.name + " " + req.body.familyName + ", " +
          "es wurde ein neuer Account für Sie erstellt. Ihr Code für die Aktivierung lautet: " + authenticationCode +
          " Für die Aktivierung besuchen Sie: localhost:3000/administration/changeEmployeePassword und geben Sie Ihr neues Passwort ein." // plaintext body
      };

      logger.log("mailOptions", mailOptions);

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              req.session.message = "Dem Benutzer wurde eine Aktivierungs-Email gesendet.";
              res.redirect('/administration/newEmployee');
          }
      });
      //employee should not be admin
      console.log("req.body.isAdmin:" + req.body.isAdmin);
      if (req.body.isAdmin === undefined) {
        req.body.isAdmin = false;
      }
      _dbController.insertNewEmployee(req, res);
      _dbController.insertPasswordRequest(createRequestDate(), authenticationCode, req.body.employeeID);
  }
  //employee has alread an account
  else {
      req.session.message = 'Scheinbar existiert bereits einen Account mit der Emailadresse ' + req.body.employeeID;
      res.redirect('/administration/newEmployee');
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
    var possible = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


module.exports = router;
