var express = require('express');
var router = express.Router();
var conf = require('../conf.json');

var DatabaseController = require('../controllers/DatabaseController');
var _dbController = new DatabaseController();

var MailController = require('../controllers/MailController');
var _mailController = new MailController();


/* GET contact page. */
router.get('/', function (req, res, next) {
    res.render('kochboxen', {user: req.session.user});
});

router.post('/', function (req, res) {
    _dbController.insertOrderInformation(req, res);

    var mailOptions = {
        from: req.body.email, // sender address
        to: conf.mail.auth.user, // list of receivers
        //TODO: AuftragsID
        subject: 'Bestelleingangsbestätigung Ihrer Bestellung # bei Lulilucullus', // Subject line
        text: req.body.contact_message//, // plaintext body
    };
    var message = "Ihre Anfrage wurde erfolgreich &uuml;bermittelt.";
    var redirect = '/contact';

    _mailController.sendEmail(req, res, mailOptions, message, redirect);
});

module.exports = router;
