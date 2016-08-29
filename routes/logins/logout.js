var express = require('express');
var router = express.Router();

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();


/* Logout user */
router.get('/', function(req, res) {
    req.session.destroy(function () {
      // console.log("req.client: "+  req.client);
      // logger.log("logout", req.client);
      // console.log("req.session.user: " + req.session.user);
      // console.log("locals.user: " + locals.user);
        // _dbController.setAdminOnlineStatus(re, true);
        req.logout();
        res.redirect("/");
    });
});

module.exports = router;
