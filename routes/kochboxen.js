var express = require('express');
var router = express.Router();
var conf = require('../conf.json');

var DatabaseController = require('../controllers/DatabaseController');
var _dbController = new DatabaseController();

var MailController = require('../controllers/MailController');
var _mailController = new MailController();


/* GET contact page. */
router.get('/', function (req, res, next) {
    if(req.session.user === undefined) {
        var message = "Zum Bestellen bitte anmelden oder einen Account erstellen."
    }
    res.render('kochboxen', {user: req.session.user, message: message});
});

router.post('/', function (req, res) {
    _dbController.insertOrderInformation(req.body, function (bookingID) {
        var bookingIDForMailSubject = bookingID;
        _dbController.getRecipeIDByRecipeName(req.body, function (recipeID) {
            var recipeIDForNextQuery = recipeID[0].recipeID;
            _dbController.insertBookingRecipes(req.body, recipeIDForNextQuery, function () {
                var mailOptions = {
                    from: conf.mail.auth.user, // send receivers
                    to: req.body.email, // receiver address
                    subject: 'Bestelleingangsbestätigung Ihrer Bestellung "#' + bookingIDForMailSubject + '" bei Lulilucullus', // Subject line
                    html: 'Danke für Ihre Bestellung der Kochbox "' + req.body.recipeName + '". ' +
                    'Die Bestellung ist am ' + req.body.start + ' bei uns eingegangen und wird schnellstmöglich bearbeitet.'
                };
                var message = "Ihre Anfrage wurde erfolgreich übermittelt.";
                var redirect = '/kochboxen';

                _mailController.sendEmail(req, res, mailOptions, message, redirect);
            });
        });
    });
});

module.exports = router;
