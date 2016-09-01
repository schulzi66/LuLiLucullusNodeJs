var express = require('express');
var router = express.Router();
var conf = require('../conf.json');

var DatabaseController = require('../controllers/DatabaseController');
var _dbController = new DatabaseController();

var MailController = require('../controllers/MailController');
var _mailController = new MailController();


/* GET recipes page. */
router.get('/', function (req, res) {
    res.render('koch-mieten', {user: req.session.user});
});

router.post('/', function (req, res) {
    _dbController.insertOrderInformation(req, function () {
        var mailOptions = {
            from: req.body.email,
            to: conf.mail.auth.user,
            subject: 'Bestelleingangsbestätigung Ihrer Bestellung # bei Lulilucullus',
            text: 'Sehr geehrter ' + req.bod.name +',' +
            'vielen Dank für Ihre Bestellung eines Kochs am ' + req.body.start + '.'
        };

        var message = "Ihre Anfrage wurde erfolgreich übermittelt.";
        var redirect = '/rent-a-chef';

        _mailController.sendEmail(req, res, mailOptions, message, redirect);
    });
});

module.exports = router;
