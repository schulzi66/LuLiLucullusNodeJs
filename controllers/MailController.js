var conf = require('../conf.json');
var nodemailer = require('nodemailer');

var DevLoggingController = require('./DevLoggingController');
var logger = new DevLoggingController();

var MailController = function () {
}

MailController.prototype.sendEmail = function (req, res, mailOptions, message, redirect) {

  var transporter = nodemailer.createTransport({
      service: conf.mail.service,
      auth: {
          user: conf.mail.auth.user, // Your email id
          pass: conf.mail.auth.password // Your password
      }
  });

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          req.session.message = message;
          res.redirect(redirect);
      }
  });
}

MailController.prototype.createRequestDate = function () {
  var date = new Date();
  return date;
}

MailController.prototype.createAuthenticationcode = function () {
  var text = "";
  var possible = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

MailController.prototype.receiveEmailTemplate = function () {
    var template = Util.getTemplate();
    return template;
}

module.exports = MailController;
