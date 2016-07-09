var express = require('express');
var router = express.Router();
var conf = require('../conf.json');
var nodemailer = require('nodemailer');
/* GET contact page. */
router.get('/', function (req, res, next) {
    res.render('contact', {user: req.session.user});
});

router.post('/', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: conf.mail.service,
        auth: {
            user: conf.auth.mail.user, // Your email id
            pass: conf.auth.mail.password // Your password
        }
    });

    var mailOptions = {
        from: req.body.email, // sender address
        to: 'ulonska.julian@gmail.com', // list of receivers
        subject: 'Kontakt Formular', // Subject line
        text: req.body.contact_message//, // plaintext body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            req.session.message = "Ihre Anfrage wurde erfolgreich &uuml;bermittelt.";
            res.redirect('/contact');
        }
    });
});

module.exports = router;
