var conf = require('../../conf.json');
var express = require('express');
var router = express.Router();

/* Logout user */
router.get('/', function(req, res) {
    req.session.destroy(function () {
        req.logout();
        res.redirect("/");
    });
});

module.exports = router;
