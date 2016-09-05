var express = require('express');
var router = express.Router();
var conf = require('../conf.json');

var MailController = require('../controllers/MailController');
var _mailController = new MailController();

/* GET contact page. */
router.get('/', function (req, res, next) {
    res.render('contact', {user: req.session.user});
});

router.post('/', function (req, res) {
    var mailOptions = {
        from: req.body.email, // sender address
        to: conf.mail.auth.user, // list of receivers
        subject: 'Kontakt Anfrage Lulilucullus', // Subject line
        text: req.body.contact_message//, // plaintext body
    };
    if (req.body.recipeSuggestion !== undefined) {
        var message = "Ihr Rezeptvorschlag wurde erfolgreich übermittelt."
    } else {
        var message = "Ihre Anfrage wurde erfolgreich übermittelt.";
    }
    var redirect = '/contact';
    _mailController.sendEmail(req, res, mailOptions, message, redirect);
});

module.exports = router;
