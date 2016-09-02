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
    _dbController.insertOrderInformation(req.body, function () {
        _dbController.getRecipeIDByRecipeName(req.body, function (recipeID) {
            var recipeIDForNextQuery = recipeID[0].recipeID;
            _dbController.insertBookingRecipes(req.body, recipeIDForNextQuery, function () {
                _dbController.insertOrderInformation(req.body, function () {
                    var mailOptions = {
                        from: conf.mail.auth.user, // send receivers
                        to: req.body.email, // receiver address
                        //TODO: AuftragsID
                        subject: 'Bestelleingangsbestätigung Ihrer Bestellung # bei Lulilucullus', // Subject line
                        html: 'Danke für Ihre Bestellung des Rezepts "' + req.body.recipeName + '". ' +
                        'Diese wird Ihnen am ' + req.body.start + ' zugestellt'
                    };
                    var message = "Ihre Anfrage wurde erfolgreich übermittelt.";
                    var redirect = '/kochboxen';

                    _mailController.sendEmail(req, res, mailOptions, message, redirect);
                });
            });
        });
    });
});

module.exports = router;
