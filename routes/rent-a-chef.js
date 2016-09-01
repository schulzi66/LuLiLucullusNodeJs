var express = require('express');
var router = express.Router();
var conf = require('../conf.json');

var DatabaseController = require('../controllers/DatabaseController');
var _dbController = new DatabaseController();

var MailController = require('../controllers/MailController');
var _mailController = new MailController();


/* GET recipes page. */
router.get('/', function(req, res) {
    res.render('rent-a-chef', { user: req.session.user} );
});

router.post('/', function (req, res){
    _dbController.insertOrderInformation(req, res);

    var mailOptions = {
        from: req.body.email,
        to: conf.mail.auth.user,
        subject: 'Bestelleingangsbestätigung Ihrer Bestellung # bei Lulilucullus',
        text: req.body.contact_message
    };

    var message = "Ihre Anfrage wurde erfolgreich &uuml;bermittelt.";
    var redirect = '/rent-a-chef';

    _mailController.sendEmail(req, res, mailOptions, message, redirect);
});

module.exports = router;
