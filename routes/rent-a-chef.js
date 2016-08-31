var express = require('express');
var router = express.Router();
var conf = require('../conf.json');
var nodemailer = require('nodemailer');
var DatabaseController = require('../controllers/DatabaseController');

/* GET recipes page. */
router.get('/', function(req, res) {
    res.render('rent-a-chef', { user: req.session.user} );
});

router.post('/', function (req, res){
    var _dbController = new DatabaseController();

    _dbController.insertOrderInformation(req, res);

    var transporter = nodemailer.createTransport({
        service: conf.mail.service,
        auth: {
            user: conf.mail.auth.user,
            pass: conf.mail.auth.password
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: conf.mail.auth.user,
        subject: 'Bestelleingangsbestätigung Ihrer Bestellung # bei Lulilucullus',
        text: req.body.contact_message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            req.session.message = "Ihre Anfrage wurde erfolgreich &uuml;bermittelt.";
            res.redirect('/rent-a-chef');
        }
    });
});

module.exports = router;
