var express = require('express');
var router = express.Router();

var DatabaseController = require('../../controllers/DatabaseController');
var _dbController = new DatabaseController();

var DevLoggingController = require('../../controllers/DevLoggingController');
var logger = new DevLoggingController();


/* Logout user */
router.get('/', function(req, res) {
  //only if user is admin
  if (req.session.user.isAdmin !== undefined) {
    _dbController.setAdminOnlineStatus(req.session.user, false);
  }
  req.session.destroy(function () {
      req.logout();
      res.redirect("/");
  });
});

module.exports = router;
